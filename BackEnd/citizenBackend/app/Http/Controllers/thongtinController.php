<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\a1;
use App\Models\a2;
use App\Models\a3;
use App\Models\b1;
use App\Models\b2;
use App\Models\thongtin;

class thongtinController extends Controller
{

    private $regex = '/^([a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂÉếưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s])+$/';

    /** 
     * yêu cầu phải được xác thực mới có thể truy cập
    */
    public function __construct() {
        $this->middleware('jwt.verify');
    }

    /*
    Tra lai danh sach thong tin quanly
    */
    public function showAll(Request $request) {
              
        /**
         * Xác thực phải có role phù hợp mới có thể thao tác
         */  
        if (!in_array($request->user()->role, ['A1', 'A2', 'A3', 'B1', 'B2'])) {
            return response()->json([
                'error' => 'You don\'t have permission',
            ], 404);
        }

        /**
         * Lấy dữ liệu theo từng role
         */
        if ($request->user()->role == 'A1') {
            $list = a2::join('a3', 'a2.maTinh', '=', 'a3.A2')
                ->join('b1', 'a3.maHuyen', '=', 'b1.A3')
                ->join('thongtin', 'thongtin.B1', '=', 'b1.maXa')
                ->where('a2.A1', Auth::user()->tenTK)
                ->select('thongtin.*')
                ->whereNull('thongtin.deleted_at')
                ->get();
            return $list;
        } else if ($request->user()->role == 'A2') {
            $list = a3::join('b1', 'a3.maHuyen', '=', 'b1.A3')
                ->join('thongtin', 'thongtin.B1', '=', 'b1.maXa')
                ->where('a3.A2', Auth::user()->tenTK)
                ->select('thongtin.*')
                ->whereNull('thongtin.deleted_at')
                ->get();
            return $list;
        } else if ($request->user()->role == 'A3') {
            $list = b1::join('thongtin', 'thongtin.B1', '=', 'b1.maXa')
                ->where('b1.A3', Auth::user()->tenTK)
                ->select('thongtin.*')
                ->whereNull('thongtin.deleted_at')
                ->get();
            return $list;
        } else if ($request->user()->role == 'B1') {
            return thongtin::where('B1', Auth::user()->tenTK)
            ->whereNull('thongtin.deleted_at')
            ->get();
        } else if ($request->user()->role == 'B2') {
            return thongtin::where('B2', Auth::user()->tenTK)
            ->whereNull('thongtin.deleted_at')
            ->get();
        }
    }

    /*
    Tra lai thong tin quanly chi dinh|| check xem thong tin co duoc goi boi dung nguoi ko
    */
    public function showOne(Request $request, thongtin $thongtin) {

        $users;

        /**
         * Lấy dữ liệu theo từng role
         */
        if ($request->user()->role == 'A1') {
            $users = a2::join('a3', 'a2.maTinh', '=', 'a3.A2')
                    ->join('b1', 'a3.maHuyen', '=', 'b1.A3')
                    ->where('a2.A1', Auth::user()->tenTK)
                    ->select('b1.maXa')
                    ->get();
        } else if($request->user()->role == 'A2') {
            $users = a3::join('b1', 'a3.maHuyen', '=', 'b1.A3')
                    ->where('a3.A2', Auth::user()->tenTK)
                    ->select('b1.maXa')
                    ->get();
        } else if($request->user()->role == 'A3') {
            $users = b1::where('b1.A3', Auth::user()->tenTK)
                    ->select('b1.maXa')
                    ->get();
        } else if($request->user()->role == 'B1') {
            if($thongtin->B1 == Auth::user()->tenTK) {
                return $thongtin;
            }
        } else if($request->user()->role == 'B2') {
            if($thongtin->B2 == Auth::user()->tenTK) {
                return $thongtin;
            }
        }

        /**
         * Kiểm tra xem thông tin lấy được do laravel có được quản lý bởi đon vị gọi hay không
         */
        foreach ($users as $user) {
            if($thongtin->B1 == $user->maXa) {
                return $thongtin;
            }
        }

        return response()->json(['error'=>'Danh sach khong thuoc don vi cua ban'], 404);
    }

    /*
    Them mot ban ghi thong tin vao database
    */
    public function insert(Request $request) {

        /**
         * Xác thực phải có role phù hợp mới có thể thao tác
         */
        if(!$this->checkQuyen($request)) {
            return response()->json([
                'error' => 'You don\'t have permission'
            ], 401);
        }

        /**
         * Xử lý dữ liệu người dùng gửi lên
         */
        $validator = Validator::make($request->all(), [
            'cccd' => 'string|regex:' . $this->regex,
            'ho' => 'required|string|regex:' . $this->regex,
            'ten' => 'required|string|regex:' . $this->regex,
            'ngaySinh' => 'required|date_format:Y-m-d',
            'gioiTinh' => 'required|string|regex:' . $this->regex,
            'queQuan' => 'required|string|regex:' . $this->regex,
            'thuongTru' => 'required|string|regex:' . $this->regex,
            'tamTru' => 'required|string|regex:' . $this->regex,
            'tonGiao' => 'required|string|regex:' . $this->regex,
            'trinhDoVanHoa' => 'required|string|regex:' . $this->regex,
            'ngheNghiep' => 'required|string|regex:' . $this->regex,
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        /**
         * Thêm dữ liệu người dùng tùy theo role
         */
        if($request->user()->role == 'B1') {
            $user = thongtin::create(array_merge($validator->validated(), ['B1' => Auth::user()->tenTK]));
        } else if($request->user()->role == 'B2') {
            $user = thongtin::create(array_merge($validator->validated(), [
                'B2' => Auth::user()->tenTK,
                'B1' => Auth::user()->manager,
            ]));
        }

        return response()->json([
            'message' => 'Thêm dữ liệu thành công',
        ], 200);
    }

    /*
    Update mot ban ghi
    */
    public function update(Request $request, thongtin $thongtin) {

        /**
         * Xác thực phải có role phù hợp mới có thể thao tác
         */
        if(!$this->checkQuyen($request)) {
            return response()->json([
                'error' => 'You don\'t have permission'
            ], 401);
        }
        
        if($thongtin != $this->showOne($request, $thongtin)) {
            return response()->json(['error'=>'Danh sach khong thuoc don vi cua ban'], 404);
        }

        /**
         * Xử lý dữ liệu người dùng gửi lên
         */
        $validator = Validator::make($request->all(), [
            'cccd' => 'string|regex:' . $this->regex,
            'ho' => 'required|string|regex:' . $this->regex,
            'ten' => 'required|string|regex:' . $this->regex,
            'ngaySinh' => 'required|date_format:Y-m-d',
            'gioiTinh' => 'required|string|regex:' . $this->regex,
            'queQuan' => 'required|string|regex:' . $this->regex,
            'thuongTru' => 'required|string|regex:' . $this->regex,
            'tamTru' => 'required|string|regex:' . $this->regex,
            'tonGiao' => 'required|string|regex:' . $this->regex,
            'trinhDoVanHoa' => 'required|string|regex:' . $this->regex,
            'ngheNghiep' => 'required|string|regex:' . $this->regex,
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        /**
         * Cập nhật thông tin người dân
         */
        $thongtin->update($validator->validated());

        return response()->json([
            'message' => 'Sửa dữ liệu thành công',
        ], 201);
    }

    /*
    Xoa mot ban ghi khoi co so du lieu
    */
    public function delete(Request $request, thongtin $thongtin) {

        /**
         * Xác thực phải có role phù hợp mới có thể thao tác
         */
        if(!$this->checkQuyen($request)) {
            return response()->json([
                'error' => 'You don\'t have permission'
            ], 401);
        }

        /**
         * Kiểm tra xem thông tin có thuộc quản lý của người dùng không
         */
        if($thongtin != $this->showOne($request, $thongtin)) {
            return response()->json(['error'=>'Danh sach khong thuoc don vi cua ban'], 404);
        }

        $thongtin->delete();
        return response()->json([
            'message' => 'Xóa dữ liệu thành công',
        ], 201);
    }

    /**
    * Check xem co duoc phep chinh sua cho cac chuc nang khong(su dung chi trong file nay)
    */
    private function checkQuyen(Request $request) {
        
        /**
         * Xác thực phải có role phù hợp mới có thể thao tác
         */
        if (!in_array($request->user()->role, ['B1', 'B2'])) {
            return false;
        }

        $user;

        if($request->user()->role == 'B1') {
            $user = b1::where('maXa',Auth::user()->tenTK)->first();
        } else {
            $user = b2::where('maThon',Auth::user()->tenTK)->first();
        }
        
        /**
         * So sánh xem người dùng có được quyền thao tác database không
         */
        $startPermission = new \DateTime($user->startPermission);
        $endPermission = new \DateTime($user->endPermission);
        $now = new \DateTime(date('Y-m-d H:i:s'));
        if($endPermission < $now || $startPermission > $now) {
            return false;
        }

        return true;
    }

    /**
     * Trả lại trạng thái có được phép chỉnh sửa hay không
     */
    public function trangThaiQuyen(Request $request) {

        /**
         * Xác thực phải có role phù hợp mới có thể thao tác
         */
        if (!in_array($request->user()->role, ['B1', 'B2'])) {
            return response()->json([
                'error' => 'You don\'t have permission'
            ], 401);
        }

        $user;

        if($request->user()->role == 'B1') {
            $user = b1::where('maXa',Auth::user()->tenTK)->first();
        } else {
            $user = b2::where('maThon',Auth::user()->tenTK)->first();
        }

        /**
         * So sánh xem người dùng có được quyền thao tác database không
         */
        $startPermission = new \DateTime($user->startPermission);
        $endPermission = new \DateTime($user->endPermission);
        $now = new \DateTime(date('Y-m-d H:i:s'));
        if($endPermission < $now || $startPermission > $now) {
            return response()->json([
                'error' => 'You don\'t have permission'
            ], 401);
        }
        return response()->json([
            'message' => 'Có thể chỉnh sửa'
        ], 201);
    }
}
