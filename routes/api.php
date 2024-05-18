<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\AuthController;

// Auth Routes to generate JWT token
Route::prefix('auth')->group(function(){
    Route::post('register',[AuthController::class,'register']);
    Route::post('login', [AuthController::class,'login']);
});

// Protected Routes with JWT Token
Route::group([
    'middleware' => ["auth:api"]
],function(){
    // Auth protected routes 
    Route::prefix('auth')->group(function(){
        Route::get('me', [AuthController::class,'me']);  
        Route::post('refresh', [AuthController::class,'refresh']);
        Route::post('logout', [AuthController::class,'logout']);
    });
    // Customer GET, POST, PUT, DELETE REST Resocurce
    Route::resource('customer',CustomerController::class)->only('index','store','show','update','destroy');
});

