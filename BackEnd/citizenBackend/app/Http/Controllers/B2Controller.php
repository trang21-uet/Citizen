<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\Rule;
use App\Models\b1;
use App\Models\b2;
use App\Models\thongtin;

class B2Controller extends Controller
{
    /** 
     * yêu cầu phải được xác thực mới có thể truy cập
    */
    public function __construct() {
        $this->middleware('jwt.verify');
    }

}
