<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\A1Controller;

Route::group([
    'middleware' => ['auth:a1'],
],function($router) {
    Route::get('/logout', [A1Controller::class, 'logout']);
    Route::post('/register', [A1Controller::class, 'register']);
    Route::get('/quanly',[A1Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[A1Controller::class, 'setQuyen']);
    Route::get('/list', [B1Controller::class,'showAll']);
    Route::get('/list/{thongtin}', [B1Controller::class,'showOne']);

    Route::match(['get', 'post'], '/{slug}', function (Request $request) {
        return response()->json([
            'error' => 'Không có gì cả T_T',
        ],404);
    });
});