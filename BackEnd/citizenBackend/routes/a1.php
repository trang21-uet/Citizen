<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\A1Controller;

Route::group([
    'middleware' => ['jwt.verify:a1'],
],function($router) {
    Route::get('/logout', [A1Controller::class, 'logout']);
    Route::get('/user', [A1Controller::class, 'userProfile']);
    Route::post('/resetpassword', [A1Controller::class, 'changePassword']);
    Route::post('/register', [A1Controller::class, 'register']);
    Route::get('/quanly',[A1Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[A1Controller::class, 'setQuyen']);
    Route::get('/list', [A1Controller::class,'showAll']);
    Route::get('/list/{thongtin}', [A1Controller::class,'showOne']);
    Route::get('/trangthai', [A1Controller::class, 'trangthai']);

    Route::match(['get', 'post'], '/{slug}', function (Request $request) {
        return response()->json([
            'message' => 'Không có gì cả T_T',
        ],404);
    });
});