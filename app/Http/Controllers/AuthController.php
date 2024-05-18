<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request){


        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::attempt([
            "email" => $request->email , 
            "password" => $request->password
        ]);

        
        return response()->json([
            'status' => 'success' , 
            'message' => 'User created successfully',
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        
        $token = JWTAuth::attempt([
            "email" => $request->email , 
            "password" => $request->password
        ]);

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        return response()->json([
            'status' => 'success' , 
            "token" => $token
        ]);

    }

    public function logout()
    {
        auth()->logout();

        return response()->json([
            'status' => 'success' , 
            "message" => "User logged out successfully"
        ]);
    }


    public function refresh()
    {
        $newToken = auth()->refresh();

        return response()->json([
            'status' => 'success' , 
            "message" => "New access token",
            "token" => $newToken
        ]);
    }

    public function me(){

        $userdata = auth()->user();

        return response()->json([
            'status' => 'success' , 
            "message" => "Profile data",
            "data" => $userdata
        ]);
    } 
}
