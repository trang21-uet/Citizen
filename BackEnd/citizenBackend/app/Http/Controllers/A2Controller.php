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
        $this->middleware('jwt.verify:a2');
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
            'maHuyen' => 'required|string',
            'tenHuyen' => 'required|string',
            'MK' => 'required|string|min:8',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if(strlen($validator->validated()['maHuyen']) != 2){
            return response()->json([
                'error' => 'Sai định dạng tài khoản cấp dưới'
            ], 400);
        }

        $maHuyen = Auth::guard('a2')->user()->tenTK . $validator->validated()['maHuyen'];

        $user = a3::where('tenTK', $maHuyen)->first();
        
        if(!$user == null) {
            return response()->json([
                'error' => 'Tài khoản đã tồn tại'
            ], 404);
        }

        $user = a3::create([
            'maHuyen' => $maHuyen,
            'tenHuyen' => $validator->validated()['tenHuyen'],
            'tenTK' => $maHuyen,
            'A2' => Auth::guard('a2')->user()->tenTK,
            'MK' => bcrypt($validator->validated()['MK']),
        ]);
        
        $user->save();
        
        return response()->json([
            'message' => 'Cấp tài khoản thành công',
            'user' => $maHuyen,
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

        return response()->json(['message' => 'User successfully signed out'], 200);
    }

    public function danhSachAcc(Request $request) {
        return a2::where('tenTK', $request->user()->tenTK)->first()->a3;
    }

    /*
    Tra lai danh sach thong tin quanly
    */
    public function showAll(Request $request) {
        $list = a3::join('b1', 'a3.tenTK', '=', 'b1.A3')
            ->join('thongtin', 'thongtin.B1', '=', 'b1.tenTK')
            ->where('a3.A2', $request->user()->tenTK)
            ->select('thongtin.*')
            ->get();
        return $list;
    }


    /*
    Tra lai thong tin quanly chi dinh
    */
    public function showOne(Request $request, thongtin $thongtin) {
        $users = a3::join('b1', 'a3.tenTK', '=', 'b1.A3')
                    ->where('a3.A2', $request->user()->tenTK)
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
        $users = a3::join('b1', 'a3.tenTK', '=', 'b1.A3')
                    ->where('a3.A2', $request->user()->tenTK)
                    ->select('a3.*', 'trangthai')
                    ->distinct()
                    ->get();
        
        $temp = $users->count();
        for ($i = 0; $i < $temp - 1; $i++ ) {
            //Kiem tra xem co 2 ban ghi trung tenTK nhung khac trang thai khong
            if($users[$i]->tenTK == $users[$i + 1]->tenTK) {
                if($users[$i]->trangthai == 1) {
                    $users->forget($i);
                } else {
                    $users->forget($i + 1);
                }
            }
        }

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
            'A3' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        //check A3 có tồn tại ko
        $user = a3::where('tenTK', $validator->validated()['A3'])->first();

        if($user == null) {
            return response()->json([
                'error' => 'Sai A3',
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
