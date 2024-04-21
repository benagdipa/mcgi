<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Rules\UniqueAttendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(
            [
                "attendenceRows.*.name" => "required|string",
                "attendenceRows.*.email" => ["required", "email", new UniqueAttendance($request->input('event_id'))],
                "attendenceRows.*.phone" => "required|numeric|min:10",
            ],
            [
                'attendenceRows.*.name.required' => 'Name is Required',
                'attendenceRows.*.email.required' => 'Email is Required',
                'attendenceRows.*.email.email' => 'Email must be valid',
                'attendenceRows.*.phone.required' => 'Phone is Required',
                'attendenceRows.*.phone.numeric' => 'Phone must be valid',
            ]
        );
        // foreach ($request->attendenceRows as $row) {
        //     Attendance::create([
        //         'event_id' => $request->event_id,
        //         'name' => $row['name'],
        //         'email' => $row['email'],
        //         'phone' => $row['phone'],
        //     ]);
        // }
    }
}
