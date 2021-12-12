<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Validator;
use App\Models\a1;
use App\Models\a2;
use App\Models\a3;
use App\Models\b1;
use App\Models\b2;
use Illuminate\Support\Facades\Auth;

class loginController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
    	$validator = Validator::make($request->all(), [
            'tenTK' => 'required|string',
            'MK' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (strlen($request->tenTK) == '2') {
            if ($token = Auth::guard('a2')->attempt(['tenTK' => $request->tenTK, 'password' => $request->MK])) {
                return $this->createNewToken($token, 'a2');
            }
        } else if (strlen($request->tenTK) == '4') {
            if ($token = Auth::guard('a3')->attempt(['tenTK' => $request->tenTK, 'password' => $request->MK])) {
                return $this->createNewToken($token, 'a3');
            }
        } else if (strlen($request->tenTK) == '6') {
            if ($token = Auth::guard('b1')->attempt(['tenTK' => $request->tenTK, 'password' => $request->MK])) {
                return $this->createNewToken($token, 'b1');
            }
        } else if (strlen($request->tenTK) == '8') {
            if ($token = Auth::guard('b2')->attempt(['tenTK' => $request->tenTK, 'password' => $request->MK])) {
                return $this->createNewToken($token, 'b2');
            }
        } else {
            if ($token = Auth::guard('a1')->attempt(['tenTK' => $request->tenTK, 'password' => $request->MK])) {
                return $this->createNewToken($token, 'a1');
            }
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token, $type){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60,
            'user' => Auth::user()->tenTK,
            'type' => $type
        ]);
    }
}
