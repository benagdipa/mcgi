<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Locale;
use DateTime;
use DateTimeZone;
use App\Models\User;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class EventsController extends Controller
{
    public function index()
    {
        $currentDate = Carbon::now();
        $events = Events::where('start_date', '>=', $currentDate)->orderBy('start_date', 'asc')->get();
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
        return Inertia::render('Events/Admin/EventsAdmin', [
            'events' => $events
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
}
