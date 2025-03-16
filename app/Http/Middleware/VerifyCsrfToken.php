<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];

    /**
     * Add the CSRF token to the response cookies.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\Response  $response
     * @return \Illuminate\Http\Response
     */
    protected function addCookieToResponse($request, $response)
    {
        $response = parent::addCookieToResponse($request, $response);
        
        if (!$request->secure()) {
            $config = config('session');
            $response->headers->setCookie(
                new \Symfony\Component\HttpFoundation\Cookie(
                    'XSRF-TOKEN',
                    $request->session()->token(),
                    time() + 60 * $config['lifetime'],
                    $config['path'],
                    $config['domain'],
                    false,
                    $config['http_only'],
                    false,
                    $config['same_site'] ?? null
                )
            );
        }
        
        return $response;
    }
}
