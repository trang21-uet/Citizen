<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\A2Controller;

Route::group([
    'middleware' => ['auth:a2'],
],function($router) {
    Route::get('/logout', [A2Controller::class, 'logout']);
    Route::post('/register', [A2Controller::class, 'register']);
    Route::get('/quanly',[A2Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[A2Controller::class, 'setQuyen']);
    Route::get('/list', [B1Controller::class,'showAll']);
    Route::get('/list/{thongtin}', [B1Controller::class,'showOne']);


    Route::match(['get', 'post'], '/{slug}', function (Request $request) {
        return response()->json([
            'error' => 'Không có gì cả T_T',
        ],404);
    });
});