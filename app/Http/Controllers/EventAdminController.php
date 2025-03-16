<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventAttendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Str;

class EventAdminController extends Controller
{
    public function index()
    {
        $events = Event::with(['attendances.user'])
            ->withCount('attendances')
            ->orderBy('start_date', 'desc')
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'description' => $event->description,
                    'location' => $event->location,
                    'category' => $event->category,
                    'category_name' => $event->category_name,
                    'event_type' => $event->event_type,
                    'requires_registration' => $event->requires_registration,
                    'max_attendees' => $event->max_attendees,
                    'featured_image' => $event->featured_image,
                    'start_date' => $event->start_date,
                    'end_date' => $event->end_date,
                    'status' => $this->getEventStatus($event),
                    'attendances_count' => $event->attendances_count,
                    'is_internal' => $event->isInternal(),
                    'is_external' => $event->isExternal(),
                    'created_at' => $event->created_at,
                    'updated_at' => $event->updated_at,
                ];
            });

        // Get member vs guest attendance statistics
        $memberAttendances = EventAttendance::where('attendee_type', EventAttendance::TYPE_MEMBER)->count();
        $guestAttendances = EventAttendance::where('attendee_type', EventAttendance::TYPE_GUEST)->count();
        
        // Get in-person vs online attendance statistics
        $inPersonAttendances = EventAttendance::where('attendance_mode', EventAttendance::MODE_IN_PERSON)->count();
        $onlineAttendances = EventAttendance::where('attendance_mode', EventAttendance::MODE_ONLINE)->count();

        return Inertia::render('Admin/Events/Index', [
            'events' => $events,
            'stats' => [
                'total' => $events->count(),
                'upcoming' => $events->filter(fn($event) => $this->getEventStatus($event) === 'upcoming')->count(),
                'ongoing' => $events->filter(fn($event) => $this->getEventStatus($event) === 'ongoing')->count(),
                'completed' => $events->filter(fn($event) => $this->getEventStatus($event) === 'completed')->count(),
                'internal' => $events->filter(fn($event) => $event['is_internal'])->count(),
                'external' => $events->filter(fn($event) => $event['is_external'])->count(),
                'total_attendances' => $memberAttendances + $guestAttendances,
                'member_attendances' => $memberAttendances,
                'guest_attendances' => $guestAttendances,
                'in_person_attendances' => $inPersonAttendances,
                'online_attendances' => $onlineAttendances,
            ],
            'eventTypes' => [
                'internal' => Event::TYPE_INTERNAL,
                'external' => Event::TYPE_EXTERNAL
            ],
            'internalCategories' => Event::internalCategories(),
            'externalCategories' => Event::externalCategories(),
            'flash' => [
                'message' => session('message')
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Events/Create', [
            'eventTypes' => [
                ['value' => Event::TYPE_INTERNAL, 'label' => 'Internal (Members Only)'],
                ['value' => Event::TYPE_EXTERNAL, 'label' => 'External (Open to Guests)']
            ],
            'internalCategories' => $this->formatCategories(Event::internalCategories()),
            'externalCategories' => $this->formatCategories(Event::externalCategories()),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'event_type' => 'required|string|in:internal,external',
            'requires_registration' => 'boolean',
            'max_attendees' => 'nullable|integer|min:1',
            'featured_image' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            Event::create($validator->validated());
            return redirect()->route('admin.events.index')->with('message', 'Event created successfully!');
        } catch (\Exception $e) {
            report($e);
            return back()->withErrors(['error' => 'Failed to create event. Please try again.']);
        }
    }

    public function edit($id)
    {
        $event = Event::with(['attendances.user'])->findOrFail($id);
        
        return Inertia::render('Admin/Events/Edit', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'location' => $event->location,
                'category' => $event->category,
                'category_name' => $event->category_name,
                'event_type' => $event->event_type,
                'requires_registration' => $event->requires_registration,
                'max_attendees' => $event->max_attendees,
                'featured_image' => $event->featured_image,
                'start_date' => $event->start_date,
                'end_date' => $event->end_date,
                'status' => $this->getEventStatus($event),
                'attendances' => $event->attendances->map(function($attendance) {
                    return [
                        'id' => $attendance->id,
                        'name' => $attendance->name,
                        'email' => $attendance->email,
                        'phone' => $attendance->phone,
                        'locale' => $attendance->locale,
                        'attendee_type' => $attendance->attendee_type,
                        'attendance_mode' => $attendance->attendance_mode,
                        'check_in_time' => $attendance->check_in_time,
                        'notes' => $attendance->notes,
                        'user' => $attendance->user ? [
                            'id' => $attendance->user->id,
                            'name' => $attendance->user->name,
                            'email' => $attendance->user->email,
                        ] : null,
                        'created_at' => $attendance->created_at,
                    ];
                }),
                'created_at' => $event->created_at,
                'updated_at' => $event->updated_at,
            ],
            'eventTypes' => [
                ['value' => Event::TYPE_INTERNAL, 'label' => 'Internal (Members Only)'],
                ['value' => Event::TYPE_EXTERNAL, 'label' => 'External (Open to Guests)']
            ],
            'internalCategories' => $this->formatCategories(Event::internalCategories()),
            'externalCategories' => $this->formatCategories(Event::externalCategories()),
        ]);
    }

    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'location' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'event_type' => 'required|string|in:internal,external',
            'requires_registration' => 'boolean',
            'max_attendees' => 'nullable|integer|min:1',
            'featured_image' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            $event->update($validator->validated());
            return redirect()->route('admin.events.index')->with('message', 'Event updated successfully!');
        } catch (\Exception $e) {
            report($e);
            return back()->withErrors(['error' => 'Failed to update event. Please try again.']);
        }
    }

    public function destroy($id)
    {
        try {
            $event = Event::findOrFail($id);
            $event->delete();
            return back()->with('message', 'Event deleted successfully!');
        } catch (\Exception $e) {
            report($e);
            return back()->withErrors(['error' => 'Failed to delete event. Please try again.']);
        }
    }

    public function attendances($id)
    {
        $event = Event::with(['attendances.user'])->findOrFail($id);
        
        $attendances = $event->attendances->map(function($attendance) {
            return [
                'id' => $attendance->id,
                'name' => $attendance->name,
                'email' => $attendance->email,
                'phone' => $attendance->phone,
                'locale' => $attendance->locale,
                'attendee_type' => $attendance->attendee_type,
                'attendance_mode' => $attendance->attendance_mode,
                'check_in_time' => $attendance->check_in_time,
                'notes' => $attendance->notes,
                'user' => $attendance->user ? [
                    'id' => $attendance->user->id,
                    'name' => $attendance->user->name,
                    'email' => $attendance->user->email,
                ] : null,
                'created_at' => $attendance->created_at,
            ];
        });

        // Get member vs guest attendance statistics for this event
        $memberAttendances = $attendances->where('attendee_type', EventAttendance::TYPE_MEMBER)->count();
        $guestAttendances = $attendances->where('attendee_type', EventAttendance::TYPE_GUEST)->count();
        
        // Get in-person vs online attendance statistics for this event
        $inPersonAttendances = $attendances->where('attendance_mode', EventAttendance::MODE_IN_PERSON)->count();
        $onlineAttendances = $attendances->where('attendance_mode', EventAttendance::MODE_ONLINE)->count();

        return Inertia::render('Admin/Events/Attendances', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'start_date' => $event->start_date,
                'end_date' => $event->end_date,
                'event_type' => $event->event_type,
                'category' => $event->category,
                'category_name' => $event->category_name,
                'status' => $this->getEventStatus($event),
            ],
            'attendances' => $attendances,
            'stats' => [
                'total' => $attendances->count(),
                'members' => $memberAttendances,
                'guests' => $guestAttendances,
                'online' => $onlineAttendances,
                'in_person' => $inPersonAttendances,
            ]
        ]);
    }

    public function exportAttendances($id)
    {
        $event = Event::with(['attendances.user'])->findOrFail($id);
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $event->title . '_attendances.csv"',
        ];

        $callback = function() use ($event) {
            $file = fopen('php://output', 'w');
            
            // Add headers
            fputcsv($file, [
                'Name', 
                'Email', 
                'Phone', 
                'Locale', 
                'Type', 
                'Attendance Mode',
                'Check-in Time',
                'Notes',
                'Registered At'
            ]);
            
            // Add data
            foreach ($event->attendances as $attendance) {
                fputcsv($file, [
                    $attendance->name,
                    $attendance->email,
                    $attendance->phone,
                    $attendance->locale,
                    ucfirst($attendance->attendee_type),
                    ucfirst($attendance->attendance_mode),
                    $attendance->check_in_time ? $attendance->check_in_time->format('Y-m-d H:i:s') : '',
                    $attendance->notes,
                    $attendance->created_at->format('Y-m-d H:i:s'),
                ]);
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function checkIn($eventId, $attendanceId)
    {
        try {
            $attendance = EventAttendance::where('event_id', $eventId)
                ->where('id', $attendanceId)
                ->firstOrFail();
            
            $attendance->update([
                'check_in_time' => now(),
            ]);
            
            return back()->with('message', 'Attendee checked in successfully!');
        } catch (\Exception $e) {
            report($e);
            return back()->withErrors(['error' => 'Failed to check in attendee. Please try again.']);
        }
    }

    public function updateAttendance(Request $request, $eventId, $attendanceId)
    {
        try {
            $attendance = EventAttendance::where('event_id', $eventId)
                ->where('id', $attendanceId)
                ->firstOrFail();
            
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20',
                'locale' => 'required|string|max:255',
                'attendee_type' => 'required|string|in:member,guest',
                'attendance_mode' => 'required|string|in:in-person,online',
                'notes' => 'nullable|string',
            ]);
    
            if ($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            }
            
            $attendance->update($validator->validated());
            
            return back()->with('message', 'Attendance information updated successfully!');
        } catch (\Exception $e) {
            report($e);
            return back()->withErrors(['error' => 'Failed to update attendance information. Please try again.']);
        }
    }

    public function deleteAttendance($eventId, $attendanceId)
    {
        try {
            $attendance = EventAttendance::where('event_id', $eventId)
                ->where('id', $attendanceId)
                ->firstOrFail();
            
            $attendance->delete();
            
            return back()->with('message', 'Attendance deleted successfully!');
        } catch (\Exception $e) {
            report($e);
            return back()->withErrors(['error' => 'Failed to delete attendance. Please try again.']);
        }
    }

    private function getEventStatus($event)
    {
        $now = Carbon::now();
        $startDate = Carbon::parse($event->start_date);
        $endDate = Carbon::parse($event->end_date);

        if ($now->lt($startDate)) {
            return 'upcoming';
        } elseif ($now->gt($endDate)) {
            return 'completed';
        } else {
            return 'ongoing';
        }
    }

    private function formatCategories($categories)
    {
        $formatted = [];
        foreach ($categories as $value => $label) {
            $formatted[] = ['value' => $value, 'label' => $label];
        }
        return $formatted;
    }
} 