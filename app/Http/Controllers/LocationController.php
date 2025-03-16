<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Locale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function admin_index()
    {
        $locations = Location::all();
        return Inertia::render('Locations/AdminIndex', [
            'locations' => $locations
        ]);
    }

    public function admin_store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'address' => 'required',
            'map_code' => 'required'
        ]);
        $locations = Location::create([
            'name' => $request->name,
            'address' => $request->address,
            'map_code' => $request->map_code,
        ]);
        if ($locations) {
            return to_route('admin.location.index');
        }
    }

    public function admin_update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'address' => 'required',
            'map_code' => 'required'
        ]);
        $location = Location::findOr($id);
        if ($location) {
            $location->name = $request->name;
            $location->address = $request->address;
            $location->map_code = $request->map_code;
            $location->update();

            return to_route('admin.location.index');
        }
    }

    public function admin_delete($id)
    {
        $location = Location::findOrFail($id);
        if ($location) {
            $location->delete();
            return to_route('admin.location.index');
        }
    }

    public function localChapters()
    {
        $locations = Location::with('locale')->get();
        $locales = Locale::all();
        
        return Inertia::render('LocalChapters', [
            'locations' => $locations,
            'locales' => $locales
        ]);
    }
}
