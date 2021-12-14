<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\A3Controller;

Route::group([
    'middleware' => ['auth:a3'],
],function($router) {
    Route::get('/logout', [A3Controller::class, 'logout']);
    Route::post('/register', [A3Controller::class, 'register']);
    Route::get('/quanly',[A3Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[A3Controller::class, 'setQuyen']);
});