<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\A2Controller;

Route::group([
    'middleware' => ['jwt.verify:a2'],
],function($router) {
    Route::get('/logout', [A2Controller::class, 'logout']);
    Route::get('/user', [A2Controller::class, 'userProfile']);
    Route::post('/resetpassword', [A2Controller::class, 'changePassword']);
    Route::post('/register', [A2Controller::class, 'register']);
    Route::get('/quanly',[A2Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[A2Controller::class, 'setQuyen']);
    Route::get('/list', [A2Controller::class,'showAll']);
    Route::get('/list/{thongtin}', [A2Controller::class,'showOne']);
    Route::get('/trangthai', [A2Controller::class, 'trangthai']);

    Route::match(['get', 'post'], '/{slug}', function (Request $request) {
        return response()->json([
            'message' => 'Không có gì cả T_T',
        ],404);
    });
});