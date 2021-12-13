<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;
use App\Models\a3;
use App\Models\b1;

class A3Controller extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:a3');
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'maXa' => 'required|string',
            'tenXa' => 'required|string',
            'MK' => 'required|string|min:8',
            'A3' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        //check A3 có tồn tại ko
        $userA3 = a3::where('tenTK', $request->A3)->first();

        if($userA3 == null) {
            return response()->json([
                'error' => 'Sai A3',
            ],404);
        }

        $user = b1::where('tenTK', $request->maXa)->first();
        
        if(!$user == null) {
            return response()->json([
                'error' => 'Tài khoản đã tồn tại'
            ], 404);
        }
        $user = b1::create([
            'maXa' => $request->maXa,
            'tenXa' => $request->tenXa,
            'tenTK' => $request->maXa,
            'A3' => $request->A3,
            'MK' => bcrypt($request->MK),
        ]);
        
        $user->save();
        
        return response()->json([
            'message' => 'Cấp tài khoản thành công',
            'user' => $request->maXa,
            'password' => $request->MK,
            'type' => 'b1',
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
