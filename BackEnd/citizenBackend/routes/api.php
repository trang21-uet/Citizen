<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\A1Controller;

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

Route::post('/login', [A1Controller::class, 'login']);
Route::post('/register', [A1Controller::class, 'register']);
Route::get('/logout', [A1Controller::class, 'logout'])->middleware('auth:a1');
// Route::group([
//     'middleware' => 'auth:a1'
// ], function ($router) {
//     Route::post('/login', [A1Controller::class, 'login']);
// });
