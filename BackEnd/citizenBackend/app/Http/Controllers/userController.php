<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\user;
use App\Models\a1;
use App\Models\a2;
use App\Models\a3;
use App\Models\b1;
use App\Models\b2;

class userController extends Controller
{

    public function __construct() {
        $this->middleware('jwt.verify')->except('logout');
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'tenTK' => 'required|string|regex:/^[0-9]+$/',
            'tenDonvi' => 'required|string|regex:/^([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+)$/',
            'MK' => 'required|string|min:8|regex:/^\S*(?=\S*[a-zA-Z])(?=\S*[\d])\S*$/',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if(strlen($validator->validated()['tenTK']) != 2){
            return response()->json([
                'error' => 'Sai định dạng tài khoản cấp dưới'
            ], 400);
        }

        $tenTK;

        if(in_array(Auth::user()->role, ['A2', 'A3', 'B1', 'B2'])) {
            $tenTK = Auth::user()->tenTK . $validator->validated()['tenTK'];
        } else if (Auth::user()->role == 'A1') {
            $tenTK = $validator->validated()['tenTK'];
        }

        //Kiem tra xem tai khoan co ton tai khong
        $temp = user::where('tenTK', $tenTK)->first();
        
        if(!$temp == null) {
            return response()->json([
                'error' => 'Tài khoản đã tồn tại'
            ], 404);
        }

        $role = 'A1';
        
        if(Auth::user()->role == 'A1') {
            a2::create([
                'maTinh' => $tenTK,
                'tenTinh' => $validator->validated()['tenDonvi'],
                'A1' => Auth::user()->tenTK,
                'MK' => bcrypt($validator->validated()['MK']),
            ]);
            $role = 'A2';
        } else if (Auth::user()->role == 'A2'){
            a3::create([
                'maHuyen' => $tenTK,
                'tenHuyen' => $validator->validated()['tenDonvi'],
                'A2' => Auth::user()->tenTK,
                'MK' => bcrypt($validator->validated()['MK']),
            ]);
            $role = 'A3';
        } else if (Auth::user()->role == 'A3'){
            b1::create([
                'maXa' => $tenTK,
                'tenXa' => $validator->validated()['tenDonvi'],
                'A3' => Auth::user()->tenTK,
                'MK' => bcrypt($validator->validated()['MK']),
            ]);
            $role = 'B1';
        } else if (Auth::user()->role == 'B1'){
            b2::create([
                'maThon' => $tenTK,
                'tenThon' => $validator->validated()['tenDonvi'],
                'B1' => Auth::user()->tenTK,
                'MK' => bcrypt($validator->validated()['MK']),
            ]);
            $role = 'B2';
        } else if (Auth::user()->role == 'B2'){
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 401);
        }

        user::create([
            'tenTK' => $tenTK,
            'role' => $role,
            'MK' => bcrypt($validator->validated()['MK']),
            'manager' => Auth::user()->tenTK,
        ]);
        
        return response()->json([
            'message' => 'Cấp tài khoản thành công',
            'user' => $tenTK,
            'password' => $request->MK,
            'type' => $role,
        ], 201);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {

        Auth::logout();

        return response()->json(['message' => 'User successfully signed out'], 200);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(Auth::refresh());
    }

     /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        $user = Auth::user();

        $manager = null;

        if($user->role == 'A2') {
            $manager = a1::where('maTongcuc', $user->manager)->first();
            $user = a2::where('maTinh', $user->tenTK)->first();
        } else if ($user->role == 'A3'){
            $manager = a2::where('maTinh', $user->manager)->first();
            $user = a3::where('maHuyen', $user->tenTK)->first();
        } else if ($user->role == 'B1'){
            $manager = a3::where('maHuyen', $user->manager)->first();
            $user = b1::where('maXa', $user->tenTK)->first();
        } else if ($user->role == 'B2'){
            $manager = b1::where('maXa', $user->manager)->first();
            $user = b2::where('maThon', $user->tenTK)->first();
        } else if($user->role == 'A1') {
            $user = a1::where('maTongcuc', $user->tenTK)->first();
        }

        return response()->json([
            'userProfile' => $user,
            'manager' => $manager,
        ]);
    }

    /*
    Thay đổi mật khẩu cho cấp dưới
    */
    public function changePassWord(Request $request) {
        $validator = Validator::make($request->all(), [
            'MK' => 'required|string|min:8|regex:/^\S*(?=\S*[a-zA-Z])(?=\S*[\d])\S*$/',
            'user' => 'required|string|regex:/^[0-9a-zA-Z]+$/',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        
        if($validator->validated()['user'] ==Auth::user()->tenTK) {
            return response()->json([
                'error' => 'Không thể thay đổi mật khẩu của bản thân',
            ]);
        }

        //check user có tồn tại ko
        $user = user::where('tenTK', $validator->validated()['user'])->first();

        if($user == null) {
            return response()->json([
                'error' => 'Sai user muốn thay đổi',
            ],404);
        }

        if($request->user()->tenTK != $user->manager) {
            return response()->json([
                'error' => 'Đơn vị không thuộc quản lý của bạn',
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
