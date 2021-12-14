<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\B2Controller;

Route::group([
    'middleware' => ['auth:b2'],
],function($router) {
    Route::get('/logout', [B2Controller::class, 'logout']);
});