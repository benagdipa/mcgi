<?php

require __DIR__ . '/../../../mcgi/vendor/autoload.php';
$app = require_once __DIR__ . '/../../../mcgi/bootstrap/app.php';

// Set the public path to the current directory
$app->usePublicPath(__DIR__);

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
$response->send();
$kernel->terminate($request, $response); 