<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use App\Models\a1;
use App\Models\a2;

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
            // TODO: chưa rõ form nhập
            'tenTK' => 'required|string|between:2,100',
            'MK' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = a1::create(array_merge(
                    $validator->validated(),
                    ['MK' => bcrypt($request->MK)]
                ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
            'type' => 'a1',
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
