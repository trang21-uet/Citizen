<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\B2Controller;

Route::group([
    'middleware' => ['auth:b2'],
],function($router) {
    Route::get('/logout', [B2Controller::class, 'logout']);
    Route::get('/user', [A1Controller::class, 'userProfile']);

    //Cac quyen lien quan den database
    Route::get('/list', [B2Controller::class,'showAll']);
    Route::get('/list/{thongtin}', [B2Controller::class,'showOne']);
    Route::post('/insert', [B2Controller::class, 'insert']);
    Route::put('/update/{thongtin}', [B2Controller::class, 'update']);
    Route::delete('/delete/{thongtin}', [B2Controller::class, 'delete']);

    Route::match(['get', 'post'], '/{slug}', function (Request $request) {
        return response()->json([
            'error' => 'Không có gì cả T_T',
        ],404);
    });
});