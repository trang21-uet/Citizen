<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\B1Controller;

Route::group([
    'middleware' => ['auth:b1'],
],function($router) {
    Route::get('/logout', [B1Controller::class, 'logout']);
    Route::post('/register', [B1Controller::class, 'register']);
    Route::get('/quanly',[B1Controller::class, 'danhSachAcc']);
    Route::post('/quyen',[B1Controller::class, 'setQuyen']);
    
    //Lien quan toi chinh sua database
    Route::get('/list', [B1Controller::class,'showAll']);
    Route::get('/list/{thongtin}', [B1Controller::class,'showOne']);
    Route::post('/insert', [B1Controller::class, 'insert']);
    Route::put('/update/{thongtin}', [B1Controller::class, 'update']);
    Route::delete('/delete/{thongtin}', [B1Controller::class, 'delete']);

    Route::match(['get', 'post'], '/{slug}', function (Request $request) {
        return response()->json([
            'error' => 'Không có gì cả T_T',
        ],404);
    });
});