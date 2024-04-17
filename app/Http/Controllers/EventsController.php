<?php

namespace App\Http\Controllers;

use DateTime;
use DateTimeZone;
use Inertia\Inertia;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventsController extends Controller
{
    public function index()
    {
        $events = Events::all();
        return Inertia::render('Events/EventsPage', ['events' => $events]);
    }

    public function admin_events_index()
    {
        $events = Events::all();
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
            'address' => 'required|string'
        ]);
        $start_date = new DateTime($request->input('start_date'), new DateTimeZone('Asia/Kathmandu'));
        $end_date = new DateTime($request->input('end_date'), new DateTimeZone('Asia/Kathmandu'));
        $event = Events::create([
            'title' => $request->title,
            'content' => $request->content,
            'start_date' => $start_date->format('Y-m-d H:i:s'),
            'end_date' => $end_date->format('Y-m-d H:i:s'),
            'address' => $request->address,
            'author' => Auth::id(),
            'status' => $request->status,
        ]);
        if ($event) {
            return to_route('admin.events.index');
        }
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


        $start_date = new DateTime($request->input('start_date'), new DateTimeZone('Asia/Kathmandu'));
        $end_date = new DateTime($request->input('end_date'), new DateTimeZone('Asia/Kathmandu'));
        $event = Events::findOrFail($id);

        if ($event) {
            $event->title = $request->title;
            $event->content = $request->content;
            $event->address = $request->address;
            $event->status = $request->status;
            $event->start_date = $start_date->format('Y-m-d H:i:s');
            $event->end_date = $end_date->format('Y-m-d H:i:s');
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
}
