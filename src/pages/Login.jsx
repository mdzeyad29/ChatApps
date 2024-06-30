import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom'
import { auth } from '../firebase';
export const Login =  () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (e)=>{
        e.preventDefault() ;
        const email = e.target[0].value;
        const password = e.target[1].value;
       
  try{
       await signInWithEmailAndPassword(auth, email, password) ;
       navigate("/")    
    }catch(err){
             
          console.log("Login Second error is found ");
          setErr(true);
        }
  }
  return (
    <div className="flex items-center justify-center h-dvh bg-cyan-400" >
                <form onSubmit={submitHandler} className="flex flex-col bg-white gap-3 items-center p-2  rounded-lg ... ">
                <spam className="p-2 text-2xl font-bold">LIVE CHAT</spam>
                <spam className="text-xl font-medium">Login</spam>
                    <input type="email" placeholder="Email"  className="py-2 border-b-4 border-blue-500 outline-none"  />
                    <input type="password" placeholder="Password" className="py-2 border-b-4 border-blue-500 outline-none"  />
                    <input type="file" id="file" className='hidden'/>
                    <button className="px-8 bg-blue-300 border-2 border-indigo-600 border-solid rounded-md">Login</button>
                    {err && <span>Something go wrong , try again</span>}
                    <p>you do have an account? <Link to="/Register">Register</Link></p>
                </form>
        </div>
  )
}
