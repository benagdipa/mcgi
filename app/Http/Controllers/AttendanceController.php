<?php

namespace App\Http\Controllers;

use App\Models\EmailTemplate;
use App\Models\Events;
use App\Models\Attendance;
use Illuminate\Http\Request;
use App\Rules\UniqueAttendance;
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
}
