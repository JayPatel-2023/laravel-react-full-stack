<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    //when payload send using axios api it reach here in backend part(server) and using this controller the further process done....

    //created LoginRequest class using php artisan make:request LoginRequest
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));  //send response to the Login.jsx
    }

    //created SignupRequest
    public function signup(SignupRequest $request){
        $data = $request->validated();

        /** @var \App\Models\User $user - means $user is instance of that User class */ 
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),   //password encrypted
        ]);

        $token =  $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));  //send response to the Signup.jsx
    }

    //use built-in class Request
    public function logout(Request $request){
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete;
        return response('', 204);
    }
}
