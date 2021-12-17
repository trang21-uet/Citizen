<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;
use App\Models\b2;
use App\Models\thongtin;

class B2Controller extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('jwt.verify:b2');
    }

    /*
    Tra lai danh sach thong tin quanly
    */
    public function showAll(Request $request) {
        return thongtin::where('B2', $request->user()->tenTK)->get();
    }

    /*
    Tra lai thong tin quanly chi dinh|| check xem thong tin co duoc goi boi dung nguoi ko
    */
    public function showOne(Request $request, thongtin $thongtin) {
        if($thongtin->B2 == $request->user()->tenTK) {
            return $thongtin;
        }
        return response()->json(['message'=>'Danh sach khong thuoc don vi cua ban'], 404);
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

        $user = thongtin::create(array_merge($validator->validated(), [
            'B2' => $request->user()->tenTK,
            'B1' => $request->user()->B1,
        ]));
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
        $user = b2::where('tenTK',$request->user()->tenTK)->first();
        if($user->endPermission > date('Y-m-d H:i:s')) {
            return response()->json([
                'message' => 'Bạn không có quyền thao tác'
            ], 404);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {

        Auth::guard('b2')->logout();

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
}
