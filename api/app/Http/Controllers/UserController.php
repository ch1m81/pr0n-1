<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
use Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
//use Hash;

class UserController extends Controller
{
	public function show($id) {
		return User::find($id);
	}
		
	
	// validate and log the user in
	public function logMeIn(Request $request)	{
		
		// get the desired parameter posted by post
		$input = $request->only(['email', 'password']);		
		
		// rules to validate against provided fields
		$rules = array(
				'email'    => 'required|email', // make sure the email is an actual email
				'password' => 'required|alphaNum|min:3' // password can only be alphanumeric and has to be greater than 3 characters
		);
		
		// run the validation
		$validator = Validator::make($input, $rules);
		
		// logic after validation
		// if the validator failed send back response 400 with an array of messages
		if ($validator->fails()) {
				
			return response()->json([
				"status" => "invalid",
				"error" => $validator->messages()
			], 400);
		} 	
		
	// verify the credentials and create a token for the user
			try {
				
				// verify the credentials and create a token for the user
				if (! $token = JWTAuth::attempt($input)) {
					
					// wrong user or pass
					return response()->json([
						"status" => "error",
						"error" => "invalid credentials"
					], 400);
				}
				
				// server error - could not create token
			} catch (JWTException $e) {
        
				// server error - could not create token
				return response()->json([
					"status" => "error",
					"error" => "could not create token"
				], 500);           
			}

			return response()
				->json(Auth::user())
				->header('Authorization', 'Bearer '.$token);
	}
		
	public function logMeOut() {
		Auth::logout(); // log the user out of our application
    return Redirect::to('login');
	}	
		
		
}
