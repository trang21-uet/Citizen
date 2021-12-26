<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;
use App\Models\a3;
use App\Models\b1;
use App\Models\b2;
use App\Models\thongtin;

class B1Controller extends Controller
{
    /** 
     * yêu cầu phải được xác thực mới có thể truy cập
    */
    public function __construct() {
        $this->middleware('jwt.verify');
    }

    /**
     * Cập nhật quyền thao tác cho cấp dưới
     */
    public function setQuyen(Request $request) {
        
        /**
         * Xác thực phải có role phù hợp mới có thể thao tác
         */
        if ($request->user()->role != 'B1') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 401);
        }

        /**
         * Xử lý dữ liệu người dùng gửi lên
         */
        $validator = Validator::make($request->all(), [
            'startPermission' => 'required|date_format:Y-m-d H:i:s',
            'endPermission' => 'required|date_format:Y-m-d H:i:s',
            'B2' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if($validator->validated()['endPermission'] > b1::where('maXa', Auth::user()->tenTK)->first()->endPermission
        ||$validator->validated()['endPermission'] < date('Y-m-d H:i:s')) {
            return response()->json([
                'error' => "Thời gian sai"
            ], 400);
        }

        $user = b2::where('maThon', $validator->validated()['B2'])->first();
        
        if($user == null) {
            return response()->json([
                'error' => 'B2 không tồn tại'
            ], 404);
        }

        /**
         * Đặt quyền cho người dùng
         */
        $user->update([
            'startPermission' => $validator->validated()['startPermission'],
            'endPermission' => $validator->validated()['endPermission'],
        ]);
        
        return response()->json([
            'message' => 'Đặt thời gian cho phép chỉnh sửa thành công'
        ], 201);
    }

    /**
     * Trả lại danh sách tài khoản quản lý
     */
    public function danhSachAcc(Request $request) {
        
        /**
         * Xác thực phải có role phù hợp mới có thể thao tác
         */
        if ($request->user()->role != 'B1') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 401);
        }

        return b2::where('B1', Auth::user()->tenTK)->get();
    }

    /*
    Cập nhật trạng thái của đơn vị
    */
    public function hoanthanh(Request $request) {      

        /**
         * Xác thực phải có role phù hợp mới có thể thao tác
         */
        if ($request->user()->role != 'B1') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 401);
        }

        /**
         * Xử lý dữ liệu người dùng gửi lên
         */
        $validator = Validator::make($request->all(), [
            'trangThai' => ['required', Rule::in(0, 1)],
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        
        /**
         * Cập nhật trạng thái user
         */
        $user = b1::where('maXa',Auth::user()->tenTK)->first();

        $user->update($validator->validated());
        return response()->json(['message' => 'Đặt trạng thái thành công'], 200);
    }
}
