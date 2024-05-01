<?php

namespace App\Http\Controllers;

use App\Models\EmailTemplate;
use App\Models\Events;
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
        $request->validate(
            [
                "attendenceRows.*.name" => "required|string",
                "attendenceRows.*.email" => ["required", "email", new UniqueAttendance($request->input('event_id'))],
                "attendenceRows.*.phone" => "required|numeric|min:10",
                "attendenceRows.*.locale" => "required",
            ],
            [
                'attendenceRows.*.name.required' => 'Name is Required',
                'attendenceRows.*.email.required' => 'Email is Required',
                'attendenceRows.*.email.email' => 'Email must be valid',
                'attendenceRows.*.phone.required' => 'Phone is Required',
                'attendenceRows.*.phone.numeric' => 'Phone must be valid',
                'attendenceRows.*.locale.required' => 'Locale is Required',
            ]
        );
        $event = Events::findOrFail($request->event_id);
        foreach ($request->attendenceRows as $row) {
            Attendance::create([
                'event_id' => $request->event_id,
                'name' => $row['name'],
                'email' => $row['email'],
                'phone' => $row['phone'],
                'locale' => $row['locale']
            ]);
            $email = $row['email'];
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
        $event = Events::findOrFail($event_id);
        $csvFileName = 'data.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $csvFileName . '"',
        ];

        $callback = function () use ($attendee, $event) {
            $file = fopen('php://output', 'w');
            fputcsv($file, array ('Event Name', 'Name', 'Email Address', 'Phone', 'Attendance Entry'));
            foreach ($attendee as $row) {
                fputcsv($file, array ($event->title, $row['name'], $row['email'], $row['phone'], $row['created_at']));
            }
            fclose($file);
        };
        return new StreamedResponse($callback, 200, $headers);
    }


    public function admin_index()
    {
        $events = Events::all();
        $locales = Locale::all();

        $attendance = Attendance::with([
            'event' => function ($query) {
                $query->select('id', 'title', 'start_date');
            }
        ])->get();

        $list = [];
        foreach ($attendance as $attendee) {
            $list[] = array(
                'id' => $attendee->id,
                'event_name' => $attendee->event->title,
                'event_date' => $attendee->event->start_date,
                'name' => $attendee->name,
                'created_at' => $attendee->created_at,
                'locale_name' => $this->getLocaleNameForAttendee($attendee->locale)
            );
        }
        return Inertia::render('Events/Admin/AttendanceAdmin', [
            'attendance' => $list,
            'events' => $events,
            'locales' => $locales
        ]);
    }


    public function getLocaleNameForAttendee($id)
    {
        $locale = Locale::find($id);
        return $locale->title;
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
