<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\EventForm;
use App\Models\EventsOption;
use App\Models\Locale;
use DateTime;
use DateTimeZone;
use App\Models\User;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\StreamedResponse;


class EventsController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            if (!Auth::user()->email_verified_at) {
                return redirect()->route('verification.notice');
            }
        }
        $currentDate = Carbon::now();
        $option = EventsOption::where('name', 'attend_duration')->first();
        $events = Events::where('start_date', '>=', $currentDate)->orderBy('start_date', 'asc')->where('status', 'publish')->get()->map(function ($event) use ($currentDate, $option) {
            $timeDiff = $currentDate->diffInMinutes($event->start_date);
            $event->isImminent = $timeDiff <= $option->value;
            return $event;
        });
        $locale = Locale::all();
        return Inertia::render('Events/EventsPage', [
            'events' => $events,
            'locale' => $locale
        ]);
    }

    public function admin_events_index(Request $request)
    {
        $order = $request->input('order');
        $order_by = $request->input('sort');

        $events = Events::orderBy($order_by ? $order_by : 'start_date', $order ? $order : 'asc')->get();
        $option = EventsOption::where('name', 'attend_duration')->first();
        return Inertia::render('Events/Admin/EventsAdmin', [
            'events' => $events,
            'options' => $option
        ]);
    }

    public function admin_events_add()
    {
        return Inertia::render('Events/Admin/EventsAddAdmin');
    }

    public function admin_events_store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'status' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'address' => 'required|string',
            'featureImage' => 'mimes:png,jpg,jpeg',
        ]);
        $file_path = '';
        if ($request->hasFile('featureImage')) {
            $name = now()->timestamp . "_{$request->file('featureImage')->getClientOriginalName()}";
            $path = $request->file('featureImage')->storeAs('event_images', $name, 'public');
            $file_path = "/storage/{$path}";
        }
        $start_date = new DateTime($request->input('start_date'), new DateTimeZone('Australia/Melbourne'));
        $end_date = new DateTime($request->input('end_date'), new DateTimeZone('Australia/Melbourne'));
        $event = Events::create([
            'title' => $request->title,
            'content' => $request->content,
            'start_date' => $start_date->format('Y-m-d H:i:s'),
            'end_date' => $end_date->format('Y-m-d H:i:s'),
            'address' => $request->address,
            'featured_image' => $file_path,
            'author' => Auth::id(),
            'status' => $request->status,
        ]);
        if ($event) {
            return to_route('admin.events.index');
        }
    }
    public function admin_events_view($id)
    {
        $event = Events::findOrFail($id);
        $list = Attendance::where('event_id', $id)->get();
        return Inertia::render('Events/Admin/EventsViewAdmin', [
            'event' => $event,
            'attendance' => $list,
        ]);
    }
    public function admin_events_edit($id)
    {
        $event = Events::findOrFail($id);
        return Inertia::render('Events/Admin/EventsEditAdmin', [
            'event' => $event
        ]);
    }

    public function admin_events_update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'status' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'address' => 'required|string'
        ]);
        $file_path = '';
        if ($request->hasFile('featureImage')) {
            if ($request->file('featureImage') !== null) {
                $request->validate([
                    'featureImage' => 'required|mimes:png,jpg,jpeg'
                ]);
                $name = now()->timestamp . "_{$request->file('featureImage')->getClientOriginalName()}";
                $path = $request->file('featureImage')->storeAs('event_images', $name, 'public');
                $file_path = "/storage/{$path}";
            }
        }
        $start_date = new DateTime($request->input('start_date'), new DateTimeZone('Australia/Melbourne'));
        $end_date = new DateTime($request->input('end_date'), new DateTimeZone('Australia/Melbourne'));
        $event = Events::findOrFail($id);

        if ($event) {
            $event->title = $request->title;
            $event->content = $request->content;
            $event->address = $request->address;
            $event->status = $request->status;
            $event->start_date = $start_date->format('Y-m-d H:i:s');
            $event->end_date = $end_date->format('Y-m-d H:i:s');
            if ($request->hasFile('featureImage')) {
                $event->featured_image = $file_path;
            }
            $event->save();
        }
        return to_route('admin.events.index');
    }
    public function admin_events_delete($id)
    {
        $event = Events::findOrFail($id);
        $event->delete();
        return to_route('admin.events.index');
    }

    public function search_user(Request $request)
    {
        $search = $request->input('query');
        if (!empty($search)) {
            $users = User::where('email', 'like', "%$search%")
                ->orWhere('phone', 'like', "%$search%")
                ->get();
            return $users;
        }
    }

    public function admin_events_settings(Request $request)
    {
        $request->validate([
            'attend_duration' => 'required|numeric',
        ]);
        if ($request->input('attend_duration')) {
            $option = EventsOption::where('name', 'attend_duration')->first();
            if ($option) {
                $option->value = $request->input('attend_duration');
                $option->save();
            } else {
                $option = new EventsOption();
                $option->name = 'attend_duration';
                $option->value = $request->input('attend_duration');
                $option->save();
            }
            return to_route('admin.events.index');
        }
    }

    public function event_form()
    {
        $currentDate = Carbon::now();
        $option = EventsOption::where('name', 'attend_duration')->first();
        $events = Events::where('start_date', '>=', $currentDate)->orderBy('start_date', 'asc')->where('status', 'publish')->get()->map(function ($event) use ($currentDate, $option) {
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
        if (isset($request->step_5)) {
            $request->validate([
                'step_5.need_accomodation_in_melbourne' => "required",
            ], [
                'step_5.*.required' => "This Field is required.",
            ]);
        }
        $form = EventForm::create([
            'step_1' => json_encode($request->step_1),
            'step_2' => json_encode($request->step_2),
            'step_3' => json_encode($request->step_3),
            'step_4' => json_encode($request->step_4),
            'step_5' => json_encode($request->step_5),
        ]);
        if ($form) {
            return to_route('events.form');
        }
    }

    public function admin_event_forms()
    {
        $event_forms = EventForm::all();
        return Inertia::render('Events/Admin/EventForms', [
            'event_forms' => $event_forms
        ]);
    }
    public function admin_event_forms_view($id)
    {
        $event_form = EventForm::findOrFail($id);
        return Inertia::render('Events/Admin/EventFormsView', [
            'event_form' => $event_form
        ]);
    }

    public function export_form()
    {
        $event_forms = EventForm::all();
        $csvFileName = 'data.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $csvFileName . '"',
        ];
        $callback = function () use ($event_forms) {
            $file = fopen('php://output', 'w');
            fputcsv(
                $file,
                array(
                    'Email Address',
                    'I voluntarily give my consent',
                    'I have read and fully understood the guidelines',
                    'Full Name',
                    'Phone Number',
                    'Facebook Messenger Name',
                    'Events',
                    'Total Number of Delegates',
                    'Names of Accompanying Delagates',
                    'Total Number of Adults',
                    'Total Number of Kids',
                    'Do all delegates listed plan go to all selected locations?',
                    'Do you have more than one ARRIVAL dates to Melbourne?',
                    'Date of FIRST Arrival to Melbourne',
                    'Date of LAST Departure from Melbourne',
                    'Mode of transporation',
                    'If you chose "Air", please provide the flight number',
                    'Do you need MCGI Transport?',
                    'Does your travel companion require a car seat/baby booster?',
                    'Additional Date of Arrival',
                    'Additional Date of Departure',
                    'Mode of transporation',
                    'Mode of transporation (If Others is selected)',
                    'Do you need MCGI Transport?',
                    'Will you be flying with the same delegates you have listed above?',
                    'If you have selected "No", please list down the delegates who will be attending.',
                    'Do you need assistance with accomodation?'
                )
            );
            foreach ($event_forms as $row) {
                $step_1 = json_decode($row->step_1);
                $step_2 = json_decode($row->step_2);
                $step_3 = json_decode($row->step_3);
                $step_4 = json_decode($row->step_4);
                $step_5 = json_decode($row->step_5);
                fputcsv(
                    $file,
                    array(
                        $step_1->email ? $step_1->email : '',
                        $step_1->privacy_accept ? $step_1->privacy_accept : '',
                        $step_1->consent_personal_info ? $step_1->consent_personal_info : '',
                        $step_2->full_name ? $step_2->full_name : '',
                        $step_2->phone_number ? $step_2->phone_number : '',
                        $step_2->messenger_name ? $step_2->messenger_name : '',
                        $step_2->events ? implode(", ", $step_2->events) : '',
                        $step_2->total_delegates ? $step_2->total_delegates : '',
                        $step_2->names_delegates ? $this->get_delegates_name($step_2->names_delegates) : '',
                        $step_2->total_adults ? $step_2->total_adults : '',
                        $step_2->total_kids ? $step_2->total_kids : '',
                        $step_2->delegates_plan ? $step_2->delegates_plan : '',
                        $step_3->more_arrival ? $step_3->more_arrival : '',
                        $step_3->first_arrival ? $step_3->first_arrival : '',
                        $step_3->last_departure ? $step_3->last_departure : '',
                        $step_3->mode_of_transportation ? $step_3->mode_of_transportation : '',
                        $step_3->flight_number ? $step_3->flight_number : '',
                        $step_3->need_mcgi_transport ? $step_3->need_mcgi_transport : '',
                        $step_3->seat_baby_booster ? $step_3->seat_baby_booster : '',
                        $step_4->additional_date_of_arrival ? $step_4->additional_date_of_arrival : '',
                        $step_4->additional_date_of_departure ? $step_4->additional_date_of_departure : '',
                        $step_4->additional_mode_of_transportation ? $step_4->additional_mode_of_transportation : '',
                        $step_4->additional_mode_of_transportation_other ? $step_4->additional_mode_of_transportation_other : '',
                        $step_4->additional_need_mcgi_transport ? $step_4->additional_need_mcgi_transport : '',
                        $step_4->fly_same_location_with_delegates ? $step_4->fly_same_location_with_delegates : '',
                        $step_4->delegates_names_fly_not_same ? $step_4->delegates_names_fly_not_same : '',
                        $step_5->need_accomodation_in_melbourne ? $step_5->need_accomodation_in_melbourne : '',
                    )
                );
            }
            fclose($file);
        };
        return new StreamedResponse($callback, 200, $headers);
    }

    public function get_delegates_name($list)
    {
        if (is_array($list)) {
            $name_list = [];
            foreach ($list as $item) {
                $name_list[] = $item->first_name . ' ' . $item->last_name . '-' . $item->is_adult;
            }
            return implode("\n", $name_list);
        }
    }
}
