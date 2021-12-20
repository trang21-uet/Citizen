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
        $this->middleware('jwt.verify:a1');
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
            'message' => 'Đặt thời gian cho phép chỉnh sửa thành công'
        ], 201);

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
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if(strlen($validator->validated()['maTinh']) != 2){
            return response()->json([
                'error' => 'Sai định dạng tài khoản cấp dưới'
            ], 400);
        }

        $maTinh = $validator->validated()['maTinh'];

        $user = a2::where('tenTK', $maTinh)->first();
        
        if(!$user == null) {
            return response()->json([
                'error' => 'Tài khoản đã tồn tại'
            ], 404);
        }
        $user = a2::create([
            'maTinh' => $maTinh,
            'tenTinh' => $validator->validated()['tenTinh'],
            'tenTK' => $maTinh,
            'A1' => Auth::guard('a1')->user()->tenTK,
            'MK' => bcrypt($validator->validated()['MK']),
        ]);
        
        $user->save();
        
        return response()->json([
            'message' => 'Cấp tài khoản thành công',
            'user' => $maTinh,
            'password' => $request->MK,
            'type' => 'a2',
        ], 201);
    }

    //Trả lại danh sách tài khoản quản lý
    public function danhSachAcc(Request $request) {
        return a1::where('tenTK', Auth::guard('a1')->user()->tenTK)->first()->a2;
    }

    /*
    Tra lai danh sach thong tin quanly
    */
    public function showAll(Request $request) {
        $list = a2::join('a3', 'a2.tenTK', '=', 'a3.A2')
            ->join('b1', 'a3.tenTK', '=', 'b1.A3')
            ->join('thongtin', 'thongtin.B1', '=', 'b1.tenTK')
            ->where('a2.A1', Auth::guard('a1')->user()->tenTK)
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
                    ->where('a2.A1', Auth::guard('a1')->user()->tenTK)
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
        $users = a2::join('a3', 'a2.tenTK', '=', 'a3.A2')
                    ->join('b1', 'a3.tenTK', '=', 'b1.A3')
                    ->where('a2.A1', Auth::guard('a1')->user()->tenTK)
                    ->select('a2.*', 'trangthai')
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
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {

        Auth::guard('a1')->logout();

        return response()->json(['message' => 'User successfully signed out'], 200);
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
            'A2' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        //check A2 có tồn tại ko
        $user = a2::where('tenTK', $validator->validated()['A2'])->first();

        if($user == null) {
            return response()->json([
                'error' => 'Sai A2',
            ],404);
        }

        $user->update([
            'MK' => bcrypt($validator->validated()['MK']),
        ]);
        
        return response()->json([
            'message' => 'Cấp lại mật khẩu thành công',
            'user' => $user->tenTK,
            'MK' => $validator->validated()['MK']
        ], 201);
    }
}
