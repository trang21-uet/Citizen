<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;
use App\Http\Controllers\loginController;
use App\Http\Controllers\A1Controller;
use App\Http\Controllers\A2Controller;
use App\Http\Controllers\A3Controller;
use App\Http\Controllers\B1Controller;
use App\Http\Controllers\B2Controller;
use App\Http\Controllers\thongtinController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::match(['get', 'post'],'/login', [loginController::class, 'login']);
Route::group([
    'middleware' => ['jwt.verify'],
],function($router) {
    
    //Các thao tác với dữ liệu người dùng: đăng nhập, đăng xuất, reset mật khẩu, cấp tài khoản
    Route::get('/logout', [userController::class, 'logout']);
    Route::get('/user', [userController::class, 'userProfile']);
    Route::post('/resetpassword', [userController::class, 'changePassword']);
    Route::post('/register', [userController::class, 'register']);
    
    //Các thao tác với xử lý thông tin người dân
    Route::get('/trangthaiquyen', [thongtinController::class,'trangThaiQuyen']);
    Route::get('/list', [thongtinController::class,'showAll']);
    Route::get('/list/{thongtin}', [thongtinController::class,'showOne']);
    Route::post('/insert', [thongtinController::class, 'insert']);
    Route::put('/update/{thongtin}', [thongtinController::class, 'update']);
    Route::delete('/delete/{thongtin}', [thongtinController::class, 'delete']);

    Route::match(['get', 'post'], '/', function (Request $request) {
        return response()->json([
            'error' => 'Không có gì cả T_T',
        ],404);
    });
});


Route::get('/error', function(Request $request) {
    return response()->json(['error' => '404'],404);
})->name('error');
