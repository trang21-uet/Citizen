<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;
use App\Models\a1;
use App\Models\a2;
use App\Models\thongtin;

class A1Controller extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('jwt.verify');
    }

    /**
     * Cập nhật quyền thao tác cho cấp dưới
     */
    public function setQuyen(Request $request) {

        if ($request->user()->role != 'A1') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'startPermission' => 'required|date_format:Y-m-d H:i:s',
            'endPermission' => 'required|date_format:Y-m-d H:i:s',
            'A2' => 'required|string',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        if($validator->validated()['endPermission'] < date('Y-m-d H:i:s')) {
            return response()->json([
                'error' => "Thời gian sai"
            ], 400);
        }

        $user = a2::where('maTinh', $validator->validated()['A2'])->first();
        
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

    //Trả lại danh sách tài khoản quản lý
    public function danhSachAcc(Request $request) {

        if ($request->user()->role != 'A1') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 404);
        }

        return a2::where('A1', Auth::user()->tenTK)->get();
    }

    /*
    Trả lại danh sách trạng thái tiến độ hoàn thành công việc
    */
    public function trangthai(Request $request) {
                      
        if ($request->user()->role != 'A1') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 404);
        }

        $users = a2::join('a3', 'a2.maTinh', '=', 'a3.A2')
                    ->join('b1', 'a3.maHuyen', '=', 'b1.A3')
                    ->where('a2.A1', Auth::user()->tenTK)
                    ->select('a2.*', 'b1.trangthai')
                    ->distinct()
                    ->get();
                    
        $temp = $users->count();
        
        for ($i = 0; $i < $temp - 1; $i++ ) {
            //Kiem tra xem co 2 ban ghi trung tenTK nhung khac trang thai khong
            if($users[$i]->maTinh == $users[$i + 1]->maTinh) {
                if($users[$i]->trangthai == 1) {
                    $users->forget($i);
                } else {
                    $users->forget($i + 1);
                }
            }
        }

        return $users;
    }
    
}
