<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\B1Controller;

Route::group([
    'middleware' => ['auth:b1'],
],function($router) {
    Route::get('/logout', [B1Controller::class, 'logout']);
    Route::post('/register', [B1Controller::class, 'register']);
    Route::get('/quanly',[B1Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[B1Controller::class, 'setQuyen']);
});