<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\B2Controller;

Route::group([
    'middleware' => ['jwt.verify'],
],function($router) {

    //Định tuyến cho các tài khoản B2
    Route::match(['get', 'post'], '/{slug}', function (Request $request) {
        return response()->json([
            'message' => 'Không có gì cả T_T',
        ],404);
    });
});