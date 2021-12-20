<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;
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
        $this->middleware('jwt.verify:b1');
    }

    public function setQuyen(Request $request) {
        $validator = Validator::make($request->all(), [
            'startPermission' => 'required|date_format:Y-m-d H:i:s',
            'endPermission' => 'required|date_format:Y-m-d H:i:s',
            'B2' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if($validator->validated()['endPermission'] > b1::where('tenTK', Auth::guard('b1')->user()->tenTK)->first()->endPermission
        ||$validator->validated()['endPermission'] < date('Y-m-d H:i:s')) {
            return response()->json([
                'error' => "Thời gian sai"
            ], 400);
        }

        $user = b2::where('tenTK', $validator->validated()['B2'])->first();
        
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

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'maThon' => 'required|string',
            'tenThon' => 'required|string',
            'MK' => 'required|string|min:8',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if(strlen($validator->validated()['maThon']) != 2){
            return response()->json([
                'error' => 'Sai định dạng tài khoản cấp dưới'
            ], 400);
        }

        $maThon = Auth::guard('b1')->user()->tenTK . $validator->validated()['maThon'];

        $user = b2::where('tenTK', $maThon)->first();
        
        if(!$user == null) {
            return response()->json([
                'error' => 'Tài khoản đã tồn tại'
            ], 404);
        }

        $user = b2::create([
            'maThon' => $maThon,
            'tenThon' => $validator->validated()['tenThon'],
            'tenTK' => $maThon,
            'B1' => Auth::guard('b1')->user()->tenTK,
            'MK' => bcrypt($validator->validated()['MK']),
        ]);
        
        $user->save();
        
        return response()->json([
            'message' => 'Cấp tài khoản thành công',
            'user' => $maThon,
            'password' => $request->MK,
            'type' => 'b2',
        ], 201);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {

        Auth::guard('b1')->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }


    /*
    Tra lai danh sach thong tin quanly
    */
    public function showAll(Request $request) {
        return thongtin::where('B1', Auth::guard('b1')->user()->tenTK)->get();
    }

    /*
    Tra lai thong tin quanly chi dinh|| check xem thong tin co duoc goi boi dung nguoi ko
    */
    public function showOne(Request $request, thongtin $thongtin) {
        if($thongtin->B1 == Auth::guard('b1')->user()->tenTK) {
            return $thongtin;
        }
        return response()->json(['error'=>'Danh sach khong thuoc don vi cua ban'], 404);
    }

    /*
    Them mot ban ghi thong tin vao database
    */
    public function insert(Request $request) {

        $this->checkQuyen($request);

        $validator = Validator::make($request->all(), [
            'cccd' => 'string',
            'ho' => 'required|string',
            'ten' => 'required|string',
            'ngaySinh' => 'required|date_format:Y-m-d',
            'gioiTinh' => 'required|string',
            'queQuan' => 'required|string',
            'thuongTru' => 'required|string',
            'tamTru' => 'required|string',
            'tonGiao' => 'required|string',
            'trinhDoVanHoa' => 'required|string',
            'ngheNghiep' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = thongtin::create(array_merge($validator->validated(), ['B1' => Auth::guard('b1')->user()->tenTK]));
        $user->save();

        return response()->json([
            'message' => 'Thêm dữ liệu thành công',
        ], 200);
    }

    /*
    Update mot ban ghi
    */
    public function update(Request $request, thongtin $thongtin) {

        $this->checkQuyen($request);
        
        $thongtin = $this->showOne($request, $thongtin);

        $validator = Validator::make($request->all(), [
            'cccd' => 'string',
            'ho' => 'required|string',
            'ten' => 'required|string',
            'ngaySinh' => 'required|date_format:Y-m-d',
            'gioiTinh' => 'required|string',
            'queQuan' => 'required|string',
            'thuongTru' => 'required|string',
            'tamTru' => 'required|string',
            'tonGiao' => 'required|string',
            'trinhDoVanHoa' => 'required|string',
            'ngheNghiep' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $thongtin->update($validator->validated());

        return response()->json([
            'message' => 'Sửa dữ liệu thành công',
        ], 201);
    }

    /*
    Xoa mot ban ghi khoi co so du lieu
    */
    public function delete(Request $request, thongtin $thongtin) {
        $this->checkQuyen($request);
        
        $thongtin = $this->showOne($request, $thongtin);
        $thongtin->delete();
        return response()->json([
            'message' => 'Xóa dữ liệu thành công',
        ], 201);
    }

    /*
    Check xem co duoc phep chinh sua khong
    */
    public function checkQuyen(Request $request) {
        $user = b1::where('tenTK',Auth::guard('b1')->user()->tenTK)->first();
        if($user->endPermission > date('Y-m-d H:i:s')) {
            return response()->json([
                'error' => 'Bạn không có quyền thao tác'
            ], 404);
        }
    }

    public function danhSachAcc(Request $request) {
        return b1::where('tenTK', Auth::guard('b1')->user()->tenTK)->first()->b2;
    }

    /*
    Cập nhật trạng thái của đơn vị
    */
    public function hoanthanh(Request $request) {
        $validator = Validator::make($request->all(), [
            'trangThai' => ['required', Rule::in(0, 1)],
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = b1::where('tenTK',Auth::guard('b1')->user()->tenTK)->first();

        $user->update($validator->validated());
        return response()->json(['message' => 'Đặt trạng thái thành công'], 200);
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
        return response()->json(Auth::guard('b1')->user());
    }

    /*
    Thay đổi mật khẩu cho cấp dưới
    */
    public function changePassWord(Request $request) {
        $validator = Validator::make($request->all(), [
            'MK' => 'required|string|min:8',
            'B2' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        //check A3 có tồn tại ko
        $user = b2::where('tenTK', $validator->validated()['B2'])->first();

        if($user == null) {
            return response()->json([
                'error' => 'Sai B2',
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
