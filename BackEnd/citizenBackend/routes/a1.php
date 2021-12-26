<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\A1Controller;

Route::group([
    'middleware' => ['jwt.verify'],
],function($router) {
    
    //Định tuyến cho các tài khoản A1
    Route::get('/quanly',[A1Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[A1Controller::class, 'setQuyen']);
    Route::get('/trangthai', [A1Controller::class, 'trangthai']);

    Route::match(['get', 'post'], '/', function (Request $request) {
        return response()->json([
            'message' => 'Không có gì cả T_T',
        ],404);
    });
});