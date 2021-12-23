<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;
use App\Models\a2;
use App\Models\a3;
use App\Models\b1;
use App\Models\thongtin;

class A3Controller extends Controller
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

        if ($request->user()->role != 'A3') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'startPermission' => 'required|date_format:Y-m-d H:i:s',
            'endPermission' => 'required|date_format:Y-m-d H:i:s',
            'B1' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if($validator->validated()['endPermission'] > a3::where('maHuyen', Auth::user()->tenTK)->first()->endPermission
        ||$validator->validated()['endPermission'] < date('Y-m-d H:i:s')) {
            return response()->json([
                'error' => "Thời gian sai"
            ], 400);
        }

        $user = b1::where('maXa', $validator->validated()['B1'])->first();
        
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

    public function danhSachAcc(Request $request) {

        if ($request->user()->role != 'A3') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 404);
        }

        return b1::where('A3', Auth::user()->tenTK)->get();
    }    

    /*
    Trả lại danh sách trạng thái tiến độ hoàn thành công việc
    */
    public function trangthai(Request $request) {
        
        if ($request->user()->role != 'A3') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 404);
        }
        
        $users = b1::where('b1.A3', Auth::user()->tenTK)
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

}
