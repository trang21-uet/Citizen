<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\A3Controller;

Route::group([
    'middleware' => ['jwt.verify'],
],function($router) {
    
    //Định tuyến cho các tài khoản A3
    Route::get('/quanly',[A3Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[A3Controller::class, 'setQuyen']);
    Route::get('/trangthai', [A3Controller::class, 'trangthai']);

    Route::match(['get', 'post'], '/{slug}', function (Request $request) {
        return response()->json([
            'message' => 'Không có gì cả T_T',
        ],404);
    });
});