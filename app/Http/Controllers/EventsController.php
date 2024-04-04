<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function index()
    {
        return Inertia::render('Events/EventsPage');
    }
}
