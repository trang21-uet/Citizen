<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\A3Controller;

Route::group([
    'middleware' => ['auth:a3'],
],function($router) {
    Route::get('/logout', [A3Controller::class, 'logout']);
    Route::get('/user', [A1Controller::class, 'userProfile']);
    Route::post('/resetpassword', [A3Controller::class, 'changePassword']);
    Route::post('/register', [A3Controller::class, 'register']);
    Route::get('/quanly',[A3Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[A3Controller::class, 'setQuyen']);
    Route::get('/list', [A3Controller::class,'showAll']);
    Route::get('/list/{thongtin}', [A3Controller::class,'showOne']);
    Route::get('/trangthai', [A1Controller::class, 'trangthai']);

    Route::match(['get', 'post'], '/{slug}', function (Request $request) {
        return response()->json([
            'error' => 'Không có gì cả T_T',
        ],404);
    });
});