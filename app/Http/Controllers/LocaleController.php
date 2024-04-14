<?php

namespace App\Http\Controllers;

use App\Models\Locale;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocaleController extends Controller
{
    public function admin_index()
    {
        $locale = Locale::all();
        return Inertia::render('Locale/Admin/LocaleAdmin', [
            'locale' => $locale,
        ]);
    }

    public function admin_store(Request $request)
    {
        $request->validate(['title' => 'required|string|max:255',]);
        $locale = Locale::create(['title' => $request->input('title'),]);
        if ($locale) {
            return to_route('admin.locale.index');
        }
    }
    public function admin_update(Request $request, $id)
    {
        $locale = Locale::findOrFail($id);
        if ($locale) {
            $request->validate(['title' => 'required|string|max:255',]);
            $locale->title = $request->input('title');
            $locale->update();
            return to_route('admin.locale.index');
        }
    }
    public function admin_delete($id)
    {
        $locale = Locale::findOrFail($id);
        if ($locale) {
            $locale->delete();
            return to_route('admin.locale.index');
        }
    }

}
