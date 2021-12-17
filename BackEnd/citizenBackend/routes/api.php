<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\loginController;
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

Route::match(['get', 'post'],'/login', [loginController::class, 'login']);

Route::get('/error', function(Request $request) {
    return response()->json(['message' => '404'],404);
})->name('error');
