<?php

namespace App\Http\Controllers;

use App\Models\EmailTemplate;
use App\Models\Event;
use App\Models\Attendance;
use App\Models\Locale;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Rules\UniqueAttendance;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Facades\Mail;

class AttendanceController extends Controller
{
    public function store(Request $request)
    {
        $validationRules = [];
        $errorMessages = [];
        for ($i = 1; $i < count($request->attendenceRows); $i++) {
            $validationRules["attendenceRows.$i.type"] = ["required"];
            $errorMessages["attendenceRows.$i.type.required"] = "Participant type is Required";
        }
        $request->validate($validationRules, $errorMessages);
        $request->validate(
            [
                "attendenceRows.*.name" => "required|string",
                "attendenceRows.0.email" => ["email", new UniqueAttendance($request->input('event_id'))],
                "attendenceRows.0.phone" => "required|numeric|min:10",
                "attendenceRows.0.locale" => "required",
            ],
            [
                'attendenceRows.*.name.required' => 'Name is Required',
                'attendenceRows.0.email.email' => 'Email must be valid',
                'attendenceRows.0.phone.required' => 'Phone is Required',
                'attendenceRows.0.phone.numeric' => 'Phone must be valid',
                'attendenceRows.0.locale.required' => 'Locale is Required',
            ]
        );
        $event = Event::findOrFail($request->event_id);
        $first_item = $request->attendenceRows[0];
        foreach ($request->attendenceRows as $row) {
            Attendance::create([
                'event_id' => $request->event_id,
                'name' => $row['name'],
                'email' => $first_item['email'] ? $first_item['email'] : '',
                'phone' => $first_item['phone'] ? $first_item['phone'] : '',
                'locale' => $first_item['locale'] ? $first_item['locale'] : '',
                'member_type' => $row['type'] ? $row['type'] : '',
            ]);
        }
        $email = $first_item['email'];
        if (!empty($email)) {
            $email_template = EmailTemplate::find('1');
            Mail::send('mails/attendance', array(
                'event_name' => $event->title,
                'additional_content' => $email_template->content,
            ), function ($message) use ($email) {
                $message->to($email)->subject('Your attendance is recorded');
                $message->from('support@mcgi.org.au', 'MCGI');
            });
        }
    }

    public function export_attendee(Request $request)
    {
        $event_id = $request->input('event_id');
        $attendee = Attendance::where('event_id', $event_id)->get();
        $event = Event::findOrFail($event_id);
        $csvFileName = 'data.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $csvFileName . '"',
        ];
        $callback = function () use ($attendee, $event) {
            $file = fopen('php://output', 'w');
            fputcsv($file, array('Event Name', 'Name', 'Email Address', 'Phone', 'Locale', 'Attendance Entry'));
            foreach ($attendee as $row) {
                fputcsv($file, array($event->title, $row['name'], $row['email'], $row['phone'], $row['locale'] ? $this->getLocaleNameForAttendee($row['locale']) : '', $row['created_at']));
            }
            fclose($file);
        };
        return new StreamedResponse($callback, 200, $headers);
    }


    public function admin_index()
    {
        $events = Event::all();
        $locales = Locale::all();

        $attendances = Attendance::with('event')
            ->whereHas('event', function ($query) {
                $query->whereNull('deleted_at');
            })
            ->get()
            ->map(function ($attendee) {
                return [
                    'id' => $attendee->id,
                    'event_id' => $attendee->event_id,
                    'event_name' => $attendee->event->title,
                    'event_date' => $attendee->event->start_date,
                    'name' => $attendee->name,
                    'member_type' => $attendee->member_type,
                    'created_at' => $attendee->created_at,
                    'locale_name' => $attendee->locale ? $this->getLocaleNameForAttendee($attendee->locale) : ''
                ];
            })
            ->all();
        return Inertia::render('Events/Admin/AttendanceAdmin', [
            'attendance' => $attendances,
            'events' => $events,
            'locales' => $locales
        ]);
    }


    public function getLocaleNameForAttendee($id)
    {
        $locale = Locale::find($id);
        if ($locale) {
            return $locale->title;
        }
        return '';
    }

    public function search_attendee(Request $request)
    {
        $attendance = Attendance::query();
        if ($request->filled('event_id')) {
            $attendance->where('event_id', $request->input('event_id'));
        }
        if ($request->filled('searchText')) {
            $attendance->where('name', 'like', '%' . $request->input('searchText') . '%');
        }
        if ($request->filled('locale_id')) {
            $attendance->where('locale', $request->input('locale_id'));
        }
        $filteredAttendance = $attendance->with([
            'event' => function ($query) {
                $query->select('id', 'title', 'start_date');
            }
        ])->get();

        $list = [];
        foreach ($filteredAttendance as $attendee) {
            $list[] = array(
                'id' => $attendee->id,
                'event_name' => $attendee->event->title,
                'event_date' => $attendee->event->start_date,
                'name' => $attendee->name,
                'created_at' => $attendee->created_at,
                'locale_name' => $this->getLocaleNameForAttendee($attendee->locale)
            );
        }
        return $list;
    }
}
