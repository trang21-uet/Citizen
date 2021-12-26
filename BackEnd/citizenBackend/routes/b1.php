<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\B1Controller;

Route::group([
    'middleware' => ['jwt.verify'],
],function($router) {
    
    //Định tuyến cho các tài khoản B1
    Route::get('/quanly',[B1Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[B1Controller::class, 'setQuyen']);
    Route::post('/hoanthanh', [B1Controller::class, 'hoanthanh']);

    Route::match(['get', 'post'], '/{slug}', function (Request $request) {
        return response()->json([
            'message' => 'Không có gì cả T_T',
        ],404);
    });
});