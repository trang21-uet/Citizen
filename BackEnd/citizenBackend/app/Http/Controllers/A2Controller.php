<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;
use App\Models\a1;
use App\Models\a2;
use App\Models\a3;
use App\Models\thongtin;

class A2Controller extends Controller
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

        if ($request->user()->role != 'A2') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'startPermission' => 'required|date_format:Y-m-d H:i:s',
            'endPermission' => 'required|date_format:Y-m-d H:i:s',
            'A3' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if($validator->validated()['endPermission'] > a2::where('maTinh', Auth::user()->tenTK)->first()->endPermission || $validator->validated()['endPermission'] < date('Y-m-d H:i:s')) {
            return response()->json([
                'error' => "Thời gian sai"
            ], 400);
        }

        $user = a3::where('maHuyen', $validator->validated()['A3'])->first();
        
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

    //Trả lại danh sách tài khoản quản lý
    public function danhSachAcc(Request $request) {

        if ($request->user()->role != 'A2') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 404);
        }

        return a3::where('A2', Auth::user()->tenTK)->get();
    }


    /*
    Trả lại danh sách trạng thái tiến độ hoàn thành công việc
    */
    public function trangthai(Request $request) {  

        if ($request->user()->role != 'A2') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 404);
        }

        $users = a3::leftJoin('b1', 'a3.maHuyen', '=', 'b1.A3')
                    ->where('a3.A2', Auth::user()->tenTK)
                    ->select('a3.*', 'b1.trangThai')
                    ->distinct()
                    ->get();
        
        $temp = array();

        $count = $users->count();

        for ($i = 0; $i < $count - 1; $i++ ) {
            //Kiem tra xem co 2 ban ghi trung tenTK nhung khac trang thai khong
            if($users[$i]->maHuyen == $users[$i + 1]->maHuyen) {
                if($users[$i]->trangThai == 1) {
                    $temp[] = $users[$i + 1];
                } else {
                    $temp[] = $users[$i];
                }
            } else {
                if(count($temp) == 0) {
                    $temp[] = $users[$i];
                } else if($users[$i]->maHuyen != $temp[count($temp) - 1]->maHuyen) {
                    $temp[] = $users[$i];
                }
                if(!in_array($users[$i + 1], $temp)) {
                    $temp[] = $users[$i + 1];
                }
            }
        }

        return $temp;
    }

}
