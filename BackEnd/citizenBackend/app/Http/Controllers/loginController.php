<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Validator;
use App\Models\user;
use Illuminate\Support\Facades\Auth;

class loginController extends Controller
{
    /**
     * Xác minh người dùng
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
        
        /**
         * Xử lý dữ liệu người dùng gửi lên
         */
    	$validator = Validator::make($request->all(), [
            'tenTK' => 'required|string|regex:/^[0-9a-zA-Z]+$/',
            'MK' => 'required|string|regex:/^[0-9a-zA-Z]+$/',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $user = $validator->validated();
        
        if ($token = Auth::attempt(['tenTK' => $user['tenTK'], 'password' => $user['MK']])) {
            return $this->createNewToken($token);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * Trả lại token cho FrontEnd
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60,
            'user' => Auth::user()->tenTK,
            'type' => Auth::user()->role,
        ]);
    }
}
