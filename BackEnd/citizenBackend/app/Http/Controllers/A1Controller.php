<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;
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
            'startPermission' => 'required|date_format:Y-m-d H:i:s',
            'endPermission' => 'required|date_format:Y-m-d H:i:s',
            'A2' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if($validator->validated()['endPermission'] < date('Y-m-d H:i:s')) {
            return response()->json([
                'error' => "Thời gian sai"
            ], 400);
        }

        $user = a2::where('tenTK', $validator->validated()['A2'])->first();
        
        if($user == null) {
            return response()->json([
                'error' => 'A2 không tồn tại'
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

    
    //Kiểm tra xem có được phép chỉnh sửa hay không
    public function checkQuyen(Request $request) {
        
    }

    //DONE
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
        $userA1 = a1::where('tenTK', $validator->validated()['A1'])->first();

        if($userA1 == null) {
            return response()->json([
                'error' => 'Sai A1',
            ],404);
        }

        $user = a2::where('tenTK', $validator->validated()['maTinh'])->first();
        
        if(!$user == null) {
            return response()->json([
                'error' => 'Tài khoản đã tồn tại'
            ], 404);
        }
        $user = a2::create([
            'maTinh' => $validator->validated()['maTinh'],
            'tenTinh' => $validator->validated()['tenTinh'],
            'tenTK' => $validator->validated()['maTinh'],
            'A1' => $validator->validated()['A1'],
            'MK' => bcrypt($validator->validated()['MK']),
        ]);
        
        $user->save();
        
        return response()->json([
            'message' => 'Cấp tài khoản thành công',
            'user' => $request->maTinh,
            'password' => $request->MK,
            'type' => 'a2',
        ], 201);
    }

    //Trả lại danh sách tài khoản quản lý
    public function danhSachAcc(Request $request) {
        return a1::where('tenTK', $request->user()->tenTK)->first()->a2;
    }

    /*
    Tra lai danh sach thong tin quanly
    */
    public function showAll(Request $request) {
        $list = a2::join('a3', 'a2.tenTK', '=', 'a3.A2')
            ->join('b1', 'a3.tenTK', '=', 'b1.A3')
            ->join('thongtin', 'thongtin.B1', '=', 'b1.tenTK')
            ->where('a2.A1', $request->user()->tenTK)
            ->select('thongtin.*')
            ->get();
        return $list;
    }

    /*
    Tra lai thong tin quanly chi dinh
    */
    public function showOne(Request $request, thongtin $thongtin) {
        $users = a2::join('a3', 'a2.tenTK', '=', 'a3.A2')
                    ->join('b1', 'a3.tenTK', '=', 'b1.A3')
                    ->where('a2.A1', $request->user()->tenTK)
                    ->select('b1.tenTK')
                    ->get();
        
        foreach ($users as $user) {
            if($thongtin->B1 == $user->tenTK) {
                return $thongtin;
            }
        }

        return response()->json(['error'=>'Danh sach khong thuoc don vi cua ban'], 404);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {

        Auth::guard('a1')->logout();

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
