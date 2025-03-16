<?php

// app/Http/Controllers/ContactController.php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);
        $data = array(
            'name' => $request->name,
            'email' => $request->email,
            'subject' => $request->subject,
            'form_message' => $request->message,
        );
        Contact::create($validatedData);
        Mail::send('mails/contact', $data, function ($message) {
            $message->to('support@mcgi.org.au')->subject
            ('New Contact Form Submission');
            $message->from('support@mcgi.org.au', 'MCGI');
        });
        return to_route('contact');

    }

}

