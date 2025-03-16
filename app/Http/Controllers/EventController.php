<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventAttendance;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\EventsOption;
use App\Models\EventForm;

class EventController extends Controller
{
    /**
     * Display a listing of the events with proper visibility.
     */
    public function index()
    {
        $user = Auth::user();
        $isAuthenticated = $user !== null;
        
        // Query base - Changed to show all events regardless of authentication
        $query = Event::with(['attendances'])
            ->orderBy('start_date', 'asc');
            
        // Instead of filtering by authentication, show all public events
        // and only add internal status for authenticated users
        
        $events = $query->get()->map(function ($event) use ($user) {
            $hasAttended = false;
            
            if ($user) {
                $hasAttended = $event->attendances()->where('user_id', $user->id)->exists();
            }
            
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
                'attendances_count' => $event->attendances->count(),
                'is_internal' => $event->isInternal(),
                'is_external' => $event->isExternal(),
                'has_attended' => $hasAttended,
            ];
        });

        return Inertia::render('Events/EventsPage', [
            'events' => $events,
            'eventTypes' => [
                'internal' => Event::TYPE_INTERNAL,
                'external' => Event::TYPE_EXTERNAL
            ],
            'internalCategories' => Event::internalCategories(),
            'externalCategories' => Event::externalCategories(),
            'isAuthenticated' => $isAuthenticated,
            'userData' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '',
                'locale' => $user->locale ?? '',
            ] : null,
            'flash' => [
                'message' => session('message')
            ]
        ]);
    }

    /**
     * Get event data for API requests.
     */
    public function getData()
    {
        $user = Auth::user();
        $isAuthenticated = $user !== null;
        
        // Query base - Changed to show all events regardless of authentication
        $query = Event::with(['attendances'])
            ->orderBy('start_date', 'asc');
        
        $events = $query->get()->map(function ($event) {
            return [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'location' => $event->location,
                'category' => $event->category,
                'category_name' => $event->category_name,
                'event_type' => $event->event_type,
                'start_date' => $event->start_date,
                'end_date' => $event->end_date,
                'attendances_count' => $event->attendances->count(),
                'is_internal' => $event->isInternal(),
                'is_external' => $event->isExternal(),
            ];
        });

        return response()->json(['events' => $events]);
    }

    /**
     * Show a specific event when shared.
     */
    public function share($id)
    {
        $event = Event::findOrFail($id);
        
        // Allow access to all events, regardless of event type or authentication status
        // Remove redirect for internal events if not authenticated
        
        // Convert to array format
        $eventData = [
            'id' => $event->id,
            'title' => $event->title,
            'description' => $event->description,
            'location' => $event->location,
            'category' => $event->category,
            'category_name' => $event->category_name,
            'event_type' => $event->event_type,
            'requires_registration' => $event->requires_registration,
            'start_date' => $event->start_date,
            'end_date' => $event->end_date,
            'attendances_count' => $event->attendances->count(),
            'is_internal' => $event->isInternal(),
            'is_external' => $event->isExternal(),
        ];
        
        return Inertia::render('Events/EventsPage', [
            'events' => [$eventData],
            'shareMode' => true,
            'eventTypes' => [
                'internal' => Event::TYPE_INTERNAL,
                'external' => Event::TYPE_EXTERNAL
            ],
            'internalCategories' => Event::internalCategories(),
            'externalCategories' => Event::externalCategories(),
            'isAuthenticated' => Auth::check(),
            'flash' => [
                'message' => 'Event shared successfully!'
            ]
        ]);
    }

    /**
     * Display event details.
     */
    public function show($id)
    {
        $event = Event::with(['attendances'])->findOrFail($id);
        $user = Auth::user();
        $isAuthenticated = $user !== null;
        $hasAttended = false;
        
        // Allow access to all events, regardless of event type or authentication status
        // Remove redirect for internal events if not authenticated
        
        if ($user) {
            $hasAttended = $event->attendances()->where('user_id', $user->id)->exists();
        }
        
        // Convert to array format
        $eventData = [
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
            'attendances_count' => $event->attendances->count(),
            'is_internal' => $event->isInternal(),
            'is_external' => $event->isExternal(),
            'has_attended' => $hasAttended,
            'registration_enabled' => $isAuthenticated, // Only enable registration for authenticated users
        ];
        
        return Inertia::render('Events/EventDetails', [
            'event' => $eventData,
            'eventTypes' => [
                'internal' => Event::TYPE_INTERNAL,
                'external' => Event::TYPE_EXTERNAL
            ],
            'internalCategories' => Event::internalCategories(),
            'externalCategories' => Event::externalCategories(),
            'isAuthenticated' => $isAuthenticated,
            'userData' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '',
                'locale' => $user->locale ?? '',
            ] : null,
        ]);
    }

    /**
     * Quick check-in for members (simplified attendance for regular events)
     */
    public function quickCheckIn(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'event_id' => 'required|exists:events,id',
            'attendance_mode' => 'required|string|in:in-person,online',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Check authentication
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'You must be logged in to check in to this event.'
            ], 401);
        }

        // Get the event
        $event = Event::findOrFail($request->event_id);
        
        // Check if the user has already attended this event
        $existingAttendance = EventAttendance::where('event_id', $event->id)
            ->where('user_id', $user->id)
            ->first();
            
        if ($existingAttendance) {
            return response()->json([
                'success' => false,
                'message' => 'You have already checked in to this event.'
            ], 422);
        }

        try {
            // Create attendance record
            $attendance = EventAttendance::create([
                'event_id' => $request->event_id,
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '',
                'locale' => $user->locale ?? '',
                'attendee_type' => EventAttendance::TYPE_MEMBER,
                'attendance_mode' => $request->attendance_mode,
                'check_in_time' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'You have successfully checked in to this event!',
                'attendance' => $attendance
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                'success' => false,
                'message' => 'Failed to check in. Please try again.'
            ], 500);
        }
    }

    /**
     * Store attendance for an event.
     */
    public function storeAttendance(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'event_id' => 'required|exists:events,id',
            'attendenceRows' => 'required|array|min:1',
            'attendenceRows.*.name' => 'required|string|max:255',
            'attendenceRows.*.email' => 'required|email|max:255',
            'attendenceRows.*.phone' => 'required|string|max:20',
            'attendenceRows.*.locale' => 'required|string|max:255',
            'attendenceRows.*.attendee_type' => 'required|string|in:member,guest',
            'attendenceRows.*.attendance_mode' => 'required|string|in:in-person,online',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Get the event
        $event = Event::findOrFail($request->event_id);
        
        // Check if the event is internal and the user is not authenticated
        if ($event->isInternal() && !Auth::check()) {
            return back()->withErrors(['error' => 'You must be logged in to register for this event.']);
        }
        
        // Check if the event requires registration
        if (!$event->requires_registration) {
            return back()->withErrors(['error' => 'This event does not require registration.']);
        }
        
        // Check if the event has reached its maximum number of attendees
        if ($event->max_attendees !== null) {
            $currentAttendeeCount = $event->attendances()->count();
            $newAttendeeCount = count($request->attendenceRows);
            
            if ($currentAttendeeCount + $newAttendeeCount > $event->max_attendees) {
                return back()->withErrors(['error' => 'This event has reached its maximum number of attendees.']);
            }
        }

        try {
            foreach ($request->attendenceRows as $attendee) {
                // Check if this is a member (user) who already has an attendance record
                $userId = Auth::id();
                if ($userId && $attendee['attendee_type'] === EventAttendance::TYPE_MEMBER) {
                    $existingAttendance = EventAttendance::where('event_id', $request->event_id)
                        ->where('user_id', $userId)
                        ->first();
                        
                    if ($existingAttendance) {
                        continue; // Skip this record, member already registered
                    }
                }
                
                EventAttendance::create([
                    'event_id' => $request->event_id,
                    'user_id' => ($attendee['attendee_type'] === EventAttendance::TYPE_MEMBER) ? $userId : null,
                    'name' => $attendee['name'],
                    'email' => $attendee['email'],
                    'phone' => $attendee['phone'],
                    'locale' => $attendee['locale'],
                    'attendee_type' => $attendee['attendee_type'] ?? EventAttendance::TYPE_MEMBER,
                    'attendance_mode' => $attendee['attendance_mode'] ?? EventAttendance::MODE_IN_PERSON,
                    'check_in_time' => now(),
                ]);
            }

            return back()->with('message', 'Attendance registered successfully!');
        } catch (\Exception $e) {
            report($e);
            return back()->withErrors(['error' => 'Failed to register attendance. Please try again.']);
        }
    }

    public function event_form()
    {
        $currentDate = Carbon::now();
        $option = EventsOption::where('name', 'attend_duration')->first();
        $events = Event::where('start_date', '>=', $currentDate)
            ->orderBy('start_date', 'asc')
            ->where('status', 'publish')
            ->get()
            ->map(function ($event) use ($currentDate, $option) {
                $timeDiff = $currentDate->diffInMinutes($event->start_date);
                $event->isImminent = $timeDiff <= $option->value;
                return $event;
            });
        return Inertia::render('Events/EventsForm', [
            'events' => $events
        ]);
    }

    public function validate_event_form(Request $request)
    {
        if (isset($request->step_1)) {
            $request->validate([
                'step_1.email' => 'required|email',
                'step_1.privacy_accept' => 'required',
                'step_1.consent_personal_info' => 'required',
            ], [
                'step_1.*.required' => "This Field is required.",
                'step_1.email.email' => "Please enter valid email address.",
            ]);
        }
        if (isset($request->step_2)) {
            $request->validate([
                'step_2.full_name' => 'required|string|max:255',
                'step_2.phone_number' => 'required|numeric',
                'step_2.total_delegates' => 'required|numeric',
                'step_2.total_adults' => 'required|numeric',
                'step_2.total_kids' => 'required|numeric',
                'step_2.delegates_plan' => 'required',
            ], [
                'step_2.*.required' => "This Field is required.",
                'step_2.*.numeric' => "Field Must be number.",
            ]);
        }
        if (isset($request->step_3)) {
            $request->validate([
                'step_3.more_arrival' => "required",
                'step_3.first_arrival' => "required_if:step_3.more_arrival,!=",
                'step_3.last_departure' => "required_if:step_3.more_arrival,!=",
                'step_3.mode_of_transportation' => "required",
                'step_3.other_mode_of_transportation' => "required_if:step_3.mode_of_transportation,Other",
                'step_3.flight_number' => "required_if:step_3.mode_of_transportation,Air",
                'step_3.need_mcgi_transport' => "required",
                'step_3.seat_baby_booster' => "required",
            ], [
                'step_3.*.required' => "This Field is required.",
                'step_3.*.required_if' => "This Field is required.",
            ]);
        }
        if (isset($request->step_4)) {
            $request->validate([
                'step_4.additional_date_of_arrival' => "required",
                'step_4.additional_date_of_departure' => "required",
                'step_4.additional_mode_of_transportation' => "required",
                'step_4.additional_mode_of_transportation_other' => "required_if:step_4.additional_mode_of_transportation,Other",
                'step_4.additional_need_mcgi_transport' => "required",
                'step_4.fly_same_location_with_delegates' => "required",
                'step_4.delegates_names_fly_not_same' => "required_if:step_4.fly_same_location_with_delegates,No",
            ], [
                'step_4.*.required' => "This Field is required.",
                'step_4.*.required_if' => "This Field is required.",
            ]);
        }
    }

    public function event_form_store(Request $request)
    {
        $form = EventForm::create([
            'email' => $request->step_1['email'],
            'full_name' => $request->step_2['full_name'],
            'phone_number' => $request->step_2['phone_number'],
            'total_delegates' => $request->step_2['total_delegates'],
            'total_adults' => $request->step_2['total_adults'],
            'total_kids' => $request->step_2['total_kids'],
            'delegates_plan' => $request->step_2['delegates_plan'],
            'more_arrival' => $request->step_3['more_arrival'],
            'first_arrival' => $request->step_3['first_arrival'],
            'last_departure' => $request->step_3['last_departure'],
            'mode_of_transportation' => $request->step_3['mode_of_transportation'],
            'other_mode_of_transportation' => $request->step_3['other_mode_of_transportation'],
            'flight_number' => $request->step_3['flight_number'],
            'need_mcgi_transport' => $request->step_3['need_mcgi_transport'],
            'seat_baby_booster' => $request->step_3['seat_baby_booster'],
            'additional_date_of_arrival' => $request->step_4['additional_date_of_arrival'],
            'additional_date_of_departure' => $request->step_4['additional_date_of_departure'],
            'additional_mode_of_transportation' => $request->step_4['additional_mode_of_transportation'],
            'additional_mode_of_transportation_other' => $request->step_4['additional_mode_of_transportation_other'],
            'additional_need_mcgi_transport' => $request->step_4['additional_need_mcgi_transport'],
            'fly_same_location_with_delegates' => $request->step_4['fly_same_location_with_delegates'],
            'delegates_names_fly_not_same' => $request->step_4['delegates_names_fly_not_same'],
        ]);
        if ($form) {
            return response()->json(['success' => true]);
        }
    }
} 
