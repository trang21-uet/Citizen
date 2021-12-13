<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;
use App\Models\b1;
use App\Models\b2;

class B1Controller extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:b1');
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'maThon' => 'required|string',
            'tenThon' => 'required|string',
            'MK' => 'required|string|min:8',
            'B1' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        //check b1 có tồn tại ko
        $userB1 = b1::where('tenTK', $request->B1)->first();

        if($userB1 == null) {
            return response()->json([
                'error' => 'Sai B1',
            ],404);
        }

        $user = b2::where('tenTK', $request->maThon)->first();
        
        if(!$user == null) {
            return response()->json([
                'error' => 'Tài khoản đã tồn tại'
            ], 404);
        }
        $user = b2::create([
            'maThon' => $request->maThon,
            'tenThon' => $request->tenThon,
            'tenTK' => $request->maThon,
            'B1' => $request->B1,
            'MK' => bcrypt($request->MK),
        ]);
        
        $user->save();
        
        return response()->json([
            'message' => 'Cấp tài khoản thành công',
            'user' => $request->maThon,
            'password' => $request->MK,
            'type' => 'b2',
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
