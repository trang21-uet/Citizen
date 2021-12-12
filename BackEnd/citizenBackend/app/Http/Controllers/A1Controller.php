<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use App\Models\a1;
use App\Models\a2;
use Illuminate\Validation\Rule;

class A1Controller extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:a1');
    }

    public function setQuyen(Request $request) {
        $validator = Validator::make($request->all(), [
            'quyen' => 'required|boolean',
            'A2' => 'required|string',
            'timer' => 'integer',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $change = a2::where('tenTK', $request->A2)
                        ->update([
                            'quyen' => $request->quyen,
                        ]);
        a2::where('tenTK', $request->A2)->update([
            'quyen' => $request->quyen,
        ]);
        //TODO
        //hẹn giờ<lưu 2 trường trong database hoặc tạo bộ đếm giờ trên server>
        //tạo trigger trên database
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'maTinh' => 'required|string',
            'tenTinh' => 'required|string',
            'MK' => 'required|string|min:8',
            'A1' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        //check A1 có tồn tại ko
        a1::where('tenTK', $request->A1)->firstOrFail();

        $user = a2::where('tenTK', $request->maTinh)->first();
        
        if(!$user == null) {
            return response()->json([
                'error' => 'Tài khoản đã tồn tại'
            ], 404);
        }
        $user = a2::create([
            'maTinh' => $request->maTinh,
            'tenTinh' => $request->tenTinh,
            'tenTK' => $request->maTinh,
            'A1' => $request->A1,
            'MK' => bcrypt($request->MK),
        ]);
        
        $user->save();
        
        return response()->json([
            'message' => 'Cấp tài khoản thành công',
            'user' => $request->maTinh,
            'password' => $request->MK,
            'type' => 'a2',
        ], 201);
    }

    public function danhSachThongTin(Request $request) {
        a1::all()->a2()->a3()->b1()->thongtin()->get();
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

    // public function changePassWord(Request $request) {
    //     $validator = Validator::make($request->all(), [
    //         'old_password' => 'required|string|min:6',
    //         'new_password' => 'required|string|confirmed|min:6',
    //     ]);

    //     if($validator->fails()){
    //         return response()->json($validator->errors()->toJson(), 400);
    //     }
    //     $userId = auth()->user()->id;

    //     $user = User::where('id', $userId)->update(
    //                 ['password' => bcrypt($request->new_password)]
    //             );

    //     return response()->json([
    //         'message' => 'User successfully changed password',
    //         'user' => $user,
    //     ], 201);
    // }
}
