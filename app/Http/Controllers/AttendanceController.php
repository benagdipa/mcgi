<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Rules\UniqueAttendance;
use Symfony\Component\HttpFoundation\StreamedResponse;

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
        foreach ($request->attendenceRows as $row) {
            Attendance::create([
                'event_id' => $request->event_id,
                'name' => $row['name'],
                'email' => $row['email'],
                'phone' => $row['phone'],
            ]);
        }
    }

    public function export_attendee(Request $request)
    {
        $event_id = $request->input('event_id');
        $attendee = Attendance::where('event_id', $event_id)->get();
        $csvFileName = 'data.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $csvFileName . '"',
        ];

        $callback = function () use ($attendee) {
            $file = fopen('php://output', 'w');
            fputcsv($file, array ('Name', 'Email Address', 'Phone', 'created at'));
            foreach ($attendee as $row) {
                fputcsv($file, array ($row['name'], $row['email'], $row['phone'], $row['created_at']));
            }
            fclose($file);
        };
        return new StreamedResponse($callback, 200, $headers);
    }
}
