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
        $this->middleware('jwt.verify:a3');
    }

    public function setQuyen(Request $request) {
        $validator = Validator::make($request->all(), [
            'startPermission' => 'required|date_format:Y-m-d H:i:s',
            'endPermission' => 'required|date_format:Y-m-d H:i:s',
            'B1' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if($validator->validated()['endPermission'] > a3::where('tenTK', $request->user()->tenTK)->first()->endPermission
        ||$validator->validated()['endPermission'] < date('Y-m-d H:i:s')) {
            return response()->json([
                'error' => "Thời gian sai"
            ], 400);
        }

        $user = b1::where('tenTK', $validator->validated()['B1'])->first();
        
        if($user == null) {
            return response()->json([
                'error' => 'B1 không tồn tại'
            ], 404);
        }

        $user->update([
            'startPermission' => $validator->validated()['startPermission'],
            'endPermission' => $validator->validated()['endPermission'],
            'trangthai' => 0,
        ]);
        
        return response()->json([
            'message' => 'Đặt thời gian cho phép chỉnh sửa thành công'
        ], 201);
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
        $userA3 = a3::where('tenTK', $validator->validated()['A3'])->first();

        if($userA3 == null) {
            return response()->json([
                'error' => 'Sai A3',
            ],404);
        }

        $user = b1::where('tenTK', $validator->validated()['maXa'])->first();
        
        if(!$user == null) {
            return response()->json([
                'error' => 'Tài khoản đã tồn tại'
            ], 404);
        }
        $user = b1::create([
            'maXa' => $validator->validated()['maXa'],
            'tenXa' => $validator->validated()['tenXa'],
            'tenTK' => $validator->validated()['maXa'],
            'A3' => $validator->validated()['A3'],
            'MK' => bcrypt($validator->validated()['MK']),
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

        Auth::guard('a3')->logout();

        return response()->json(['message' => 'User successfully signed out'], 200);
    }

    public function danhSachAcc(Request $request) {
        return a3::where('tenTK', $request->user()->tenTK)->first()->b1;
    }

    /*
    Tra lai danh sach thong tin quanly
    */
    public function showAll(Request $request) {
        $list = b1::join('thongtin', 'thongtin.B1', '=', 'b1.tenTK')
            ->where('b1.A3', $request->user()->tenTK)
            ->select('thongtin.*')
            ->get();
        return $list;
    }

    /*
    Tra lai thong tin quanly chi dinh
    */
    public function showOne(Request $request, thongtin $thongtin) {
        $users = b1::where('b1.A3', $request->user()->tenTK)
                    ->select('b1.tenTK')
                    ->get();
        
        foreach ($users as $user) {
            if($thongtin->B1 == $user->tenTK) {
                return $thongtin;
            }
        }

        return response()->json(['error'=>'Danh sach khong thuoc don vi cua ban'], 404);
    }
    

    /*
    Trả lại danh sách trạng thái cấp dưới
    */
    public function trangthai(Request $request) {
        $users = b1::where('b1.A3', $request->user()->tenTK)
                    ->select('b1.*')
                    ->get();
        
        // $temp = $users->count();
        // for ($i = 0; $i < $temp - 1; $i++ ) {
        //     //Kiem tra xem co 2 ban ghi trung tenTK nhung khac trang thai khong
        //     if($users[$i]->tenTK == $users[$i + 1]->tenTK) {
        //         if($users[$i]->trangthai == 1) {
        //             $users->forget($i);
        //         } else {
        //             $users->forget($i + 1);
        //         }
        //     }
        // }

        return $users;
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

    /*
    Thay đổi mật khẩu cho cấp dưới
    */
    public function changePassWord(Request $request) {
        $validator = Validator::make($request->all(), [
            'MK' => 'required|string|min:8',
            'B1' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        //check A3 có tồn tại ko
        $user = b1::where('tenTK', $validator->validated()['B1'])->first();

        if($user == null) {
            return response()->json([
                'error' => 'Sai B1',
            ],404);
        }

        $user->update([
            'MK' => bcrypt($validator->validated()['MK']),
        ]);

        return response()->json([
            'message' => 'Cấp lại mật khẩu thành công',
            'user' => $user->tenTK,
            'MK' => $validator->validated()['MK'],
        ], 201);
    }
}
