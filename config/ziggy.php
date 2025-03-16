<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Application base URL
    |--------------------------------------------------------------------------
    |
    | This is the base URL for your application, and is used to generate
    | absolute URLs to your routes.
    |
    */
    'url' => env('APP_URL', 'http://localhost'),

    /*
    |--------------------------------------------------------------------------
    | Exposed routes
    |--------------------------------------------------------------------------
    |
    | This setting determines which routes Ziggy will expose to your frontend.
    | You can either specify an array of route name patterns, or allow all routes
    | by setting this to null.
    |
    */
    'except' => [
        'ignition.*',
        'debugbar.*',
        'horizon.*',
        'telescope.*',
    ],

    /*
    |--------------------------------------------------------------------------
    | Model binding resolution
    |--------------------------------------------------------------------------
    |
    | This setting determines how Ziggy handles model binding resolution.
    | By default, Ziggy follows Laravel's default approach of resolving
    | model IDs only, but by setting this to 'key', Ziggy will resolve
    | model keys instead of IDs.
    |
    */
    'binding_type' => 'id',
]; 