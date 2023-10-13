<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //when payload send using axios api it reach here in backend part(server) 

    //created LoginRequest class using php artisan make:request LoginRequest
    public function login(LoginRequest $request){

    }

    //created SignupRequest
    public function signup(SignupRequest $request){

    }

    //use built-in class Request
    public function logout(Request $request){
        
    }
}
