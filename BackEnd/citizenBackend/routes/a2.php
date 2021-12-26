<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\A2Controller;

Route::group([
    'middleware' => ['jwt.verify'],
],function($router) {
    
    //Định tuyến cho các tài khoản A2
    Route::get('/quanly',[A2Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[A2Controller::class, 'setQuyen']);
    Route::get('/trangthai', [A2Controller::class, 'trangthai']);

    Route::match(['get', 'post'], '/', function (Request $request) {
        return response()->json([
            'message' => 'Không có gì cả T_T',
        ],404);
    });
});