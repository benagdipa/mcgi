<?php

namespace App\Http\Controllers;

use App\Models\EmailTemplate;
use Illuminate\Http\Request;
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
}
