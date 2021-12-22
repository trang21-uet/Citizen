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
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('jwt.verify');
    }

    public function setQuyen(Request $request) {
        
        if ($request->user()->role != 'B1') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 401);
        }

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

        $user->update([
            'startPermission' => $validator->validated()['startPermission'],
            'endPermission' => $validator->validated()['endPermission'],
        ]);
        
        return response()->json([
            'message' => 'Đặt thời gian cho phép chỉnh sửa thành công'
        ], 201);
    }


    public function danhSachAcc(Request $request) {
                
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

        if ($request->user()->role != 'B1') {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'trangThai' => ['required', Rule::in(0, 1)],
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = b1::where('maXa',Auth::user()->tenTK)->first();

        $user->update($validator->validated());
        return response()->json(['message' => 'Đặt trạng thái thành công'], 200);
    }
}
