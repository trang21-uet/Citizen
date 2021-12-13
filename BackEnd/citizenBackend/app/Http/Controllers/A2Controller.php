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
        $userA2 = a2::where('tenTK', $request->A2)->first();

        if($userA2 == null) {
            return response()->json([
                'error' => 'Sai A2',
            ],404);
        }

        $user = a3::where('tenTK', $request->maHuyen)->first();
        
        if(!$user == null) {
            return response()->json([
                'error' => 'Tài khoản đã tồn tại'
            ], 404);
        }
        $user = a3::create([
            'maHuyen' => $request->maHuyen,
            'tenHuyen' => $request->tenHuyen,
            'tenTK' => $request->maHuyen,
            'A2' => $request->A2,
            'MK' => bcrypt($request->MK),
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

        Auth::logout();

        return response()->json(['message' => 'User successfully signed out']);
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
