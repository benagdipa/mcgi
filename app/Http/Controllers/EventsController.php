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
        return Inertia::render('Events/EventsPage');
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
            'slug' => 'required|string|max:255|unique:' . Events::class,
            'status' => 'required',
            'featureImage' => 'required|mimes:png,jpg,jpeg',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);
        $file_path = '';
        if ($request->hasFile('featureImage')) {
            $name = now()->timestamp . "_{$request->file('featureImage')->getClientOriginalName()}";
            $path = $request->file('featureImage')->storeAs('event_images', $name, 'public');
            $file_path = "/storage/{$path}";
        }

        $start_date = new DateTime($request->input('start_date'), new DateTimeZone('Asia/Kathmandu'));
        $end_date = new DateTime($request->input('end_date'), new DateTimeZone('Asia/Kathmandu'));

        $event = Events::create([
            'title' => $request->input('title'),
            'slug' => $request->input('slug'),
            'content' => $request->input('content'),
            'start_date' => $start_date->format('Y-m-d H:i:s'),
            'end_date' => $end_date->format('Y-m-d H:i:s'),
            'featured_image' => $file_path,
            'author' => Auth::id(),
            'status' => $request->input('status'),
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
            'slug' => 'required|string|max:255',
            'status' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
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
        $start_date = new DateTime($request->input('start_date'), new DateTimeZone('Asia/Kathmandu'));
        $end_date = new DateTime($request->input('end_date'), new DateTimeZone('Asia/Kathmandu'));
        $event = Events::findOrFail($id);

        if ($event) {
            $event->title = $request->input('title');
            $event->slug = $request->input('slug');
            $event->content = $request->input('content');
            $event->status = $request->input('status');
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
}
