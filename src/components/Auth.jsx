import React, { useState } from 'react'
import {auth, googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from 'firebase/auth';
export default function Auth(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    // console.log(auth?.currentUser?.photoURL); To get the Photo of the User
    // console.log(auth?.currentUser?.email);    To get the logged in user email
    const signIn = async()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password);
        }
        catch (err){
            console.error(err);
        }
    }

    const signInwithGoogle=async()=>{
        try{
            await signInWithPopup(auth,googleProvider);
        }
        catch(err){
            console.error(err);
        }
    }

    const logout =async()=>{
        try{
            await signOut(auth)
        }
        catch(err){
            console.error(err);
        }
    }

  return (
    <div>
      <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Username'/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
      <button onClick ={signIn}>sign in</button>
      <button onClick={signInwithGoogle}>signIn with Google</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}
