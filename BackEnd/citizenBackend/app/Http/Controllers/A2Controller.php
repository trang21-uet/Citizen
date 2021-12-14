<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;
use App\Models\a2;
use App\Models\a3;

class A2Controller extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:a2');
    }

    public function setQuyen(Request $request) {
        $validator = Validator::make($request->all(), [
            'startPermission' => 'required|date_format:Y-m-d H:i:s',
            'endPermission' => 'required|date_format:Y-m-d H:i:s',
            'A3' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if($validator->validated()['endPermission'] > a2::where('tenTK', $request->user()->tenTK)->first()->endPermission
        ||$validator->validated()['endPermission'] < date('Y-m-d H:i:s')) {
            return response()->json([
                'error' => "Thời gian sai"
            ], 400);
        }

        $user = a3::where('tenTK', $validator->validated()['A3'])->first();
        
        if($user == null) {
            return response()->json([
                'error' => 'A3 không tồn tại'
            ], 404);
        }

        $user->update([
            'startPermission' => $validator->validated()['startPermission'],
            'endPermission' => $validator->validated()['endPermission'],
        ]);
        
        return response()->json([
            'success' => 'Đặt thời gian cho phép chỉnh sửa thành công'
        ], 201);
    }
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'maHuyen' => 'required|string',
            'tenHuyen' => 'required|string',
            'MK' => 'required|string|min:8',
            'A2' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        //check A2 có tồn tại ko
        $userA2 = a2::where('tenTK', $validator->validated()['A2'])->first();

        if($userA2 == null) {
            return response()->json([
                'error' => 'Sai A2',
            ],404);
        }

        $user = a3::where('tenTK', $validator->validated()['maHuyen'])->first();
        
        if(!$user == null) {
            return response()->json([
                'error' => 'Tài khoản đã tồn tại'
            ], 404);
        }
        $user = a3::create([
            'maHuyen' => $validator->validated()['maHuyen'],
            'tenHuyen' => $validator->validated()['tenHuyen'],
            'tenTK' => $validator->validated()['maHuyen'],
            'A2' => $validator->validated()['A2'],
            'MK' => bcrypt($validator->validated()['MK']),
        ]);
        
        $user->save();
        
        return response()->json([
            'message' => 'Cấp tài khoản thành công',
            'user' => $request->maHuyen,
            'password' => $request->MK,
            'type' => 'a3',
        ], 201);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {

        Auth::guard('a2')->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    public function danhSachAcc(Request $request) {
        return a2::where('tenTK', $request->user()->tenTK)->first()->a3;
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

     /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }
}
