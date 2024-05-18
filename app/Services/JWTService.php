<?php
namespace App\Services;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWTService{
 
  public function generate() { 
    $user = Auth::user();
    $token = JWTAuth::fromUser($user); return $token; 
  } 

  public function verify($token) { 
    try { 
      $payload=JWTAuth::decode($token); return true; 
    } catch(\Tymon\JWTAuth\Exceptions\JWTException $e) {
      return false; 
    } 
  } 
  public function refresh($token) {
    try { 
      $refreshedToken=JWTAuth::refresh($token); return $refreshedToken; 
    } catch(\Tymon\JWTAuth\Exceptions\JWTException $e) { 
      return false; 
    } 
  }
}