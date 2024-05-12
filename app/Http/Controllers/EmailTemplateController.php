<?php

namespace App\Http\Controllers;

use App\Models\EmailTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

class EmailTemplateController extends Controller
{
    public function admin_index()
    {
        $templates = EmailTemplate::all();
        return Inertia::render('EmailTemplate/Admin/Index', [
            'templates' => $templates
        ]);
    }

    public function admin_store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        $template = EmailTemplate::create([
            'name' => $request->input('name'),
            'subject' => $request->input('subject'),
            'content' => $request->input('content'),
        ]);
        if ($template) {
            return to_route('admin.email.index');
        }

    }
    public function admin_update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        $template = EmailTemplate::findOrFail($id);
        if ($template) {
            $template->update([
                'name' => $request->input('name'),
                'subject' => $request->input('subject'),
                'content' => $request->input('content'),
            ]);
            if ($template) {
                return to_route('admin.email.index');
            }
        }
    }

    public function admin_delete($id)
    {
        if ($id !== '1') {
            $template = EmailTemplate::findOrFail($id);
            if ($template) {
                $template->delete();
                return to_route('admin.email.index');
            } else {
                return to_route('admin.email.index')->with('message', 'Email template not found.');
            }
        } else {
            return to_route('admin.email.index')->with('message', 'This Email template cannot be deleted. It is used in Attendance email.');
        }
    }
}
