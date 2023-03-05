import React from 'react'
import { useState } from 'react'
import supabase from '../utils/supabaseClient';

const signup= () => {
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [submitted, setSubmitted]=useState(false)
 console.log(email);
 async function signUpWithEmail(e){

	e.preventDefault()
	try{
		
		const resp=await supabase.auth.signUp({email:email, password:password})
		const userId=resp.data.user?.id;

		console.log("userId:",userId);
		setSubmitted(true)
	


	}
	catch{

	}
 }
 if(submitted){

	return(
		<div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">
		
		<h1 className="font-bold text-2xl">Thanks check your email for confirmation</h1>
	
		</div>
	  )
 }

    return (
   
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-200 text-gray-700">


	<h1 className="font-bold text-2xl">Signup :)</h1>
	<form className="flex flex-col bg-white rounded shadow-lg p-12 mt-12" action="">
		<label className="font-semibold text-xs" htmlFor="usernameField">Username or Email</label>
		<input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2" type="email" 
		onChange={(e)=>setEmail(e.target.value)}/>
		<label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
		<input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"type="password"
		onChange={(e)=>setPassword(e.target.value)}/>
		<button  onClick={signUpWithEmail} 
		className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700">Sign Up</button>
		<div className="flex mt-6 justify-center text-xs">
			<a className="text-blue-400 hover:text-blue-500" href="#">Forgot Password</a>
			<span className="mx-2 text-gray-300">/</span>
			
			<a className="text-blue-400 hover:text-blue-500" href="#">Sign Up</a>
			
		</div>
	</form>
	
</div>


  ) 


  
 
}

export default signup