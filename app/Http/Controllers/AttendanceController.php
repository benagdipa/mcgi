<?php

namespace App\Http\Controllers;

use App\Models\EmailTemplate;
use App\Models\Events;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Rules\UniqueAttendance;
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
}
