<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\loginController;
use App\Http\Controllers\registerController;
use App\Http\Controllers\A1Controller;
use App\Http\Controllers\A2Controller;
use App\Http\Controllers\A3Controller;
use App\Http\Controllers\B1Controller;
use App\Http\Controllers\B2Controller;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [loginController::class, 'login']);

// Route::get('/logout', [A1Controller::class, 'logout'])->middleware('auth:a1');

Route::group([
    'middleware' => ['auth:a1'],
    'prefix' => 'a1',
],function($router) {
    Route::get('/logout', [A1Controller::class, 'logout']);
    Route::post('/register', [A1Controller::class, 'register']);
});

Route::group([
    'middleware' => ['auth:a2'],
    'prefix' => 'a2',
],function($router) {
    Route::get('/logout', [A2Controller::class, 'logout']);
    Route::post('/register', [registerController::class, 'register']);
});

Route::group([
    'middleware' => ['auth:a3'],
    'prefix' => 'a3',
],function($router) {
    Route::get('/logout', [A2Controller::class, 'logout']);
    Route::post('/register', [registerController::class, 'register']);
});

Route::group([
    'middleware' => ['auth:b1'],
    'prefix' => 'b1',
],function($router) {
    Route::get('/logout', [A2Controller::class, 'logout']);
    Route::post('/register', [registerController::class, 'register']);
});

Route::group([
    'middleware' => ['auth:b2'],
    'prefix' => 'b2',
],function($router) {
    Route::get('/logout', [A2Controller::class, 'logout']);
});

// Route::group([
//     'middleware' => 'auth:a1'
// ], function ($router) {
//     Route::post('/login', [A1Controller::class, 'login']);
// });
