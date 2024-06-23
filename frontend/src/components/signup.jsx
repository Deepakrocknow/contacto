import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
         navigate('/');
    }
  })

  const collectData =async()=>{
         console.log(name,email,pass);
         let result = await fetch('https://pop-nu.vercel.app/register',{
               method:'post',
               body:JSON.stringify({name,email,pass}),
               headers:{
                   'Content-Type':'application/json'
               }
         });
         result = await result.json();
         console.log(result)
         localStorage.setItem("user",JSON.stringify(result.res));
         localStorage.setItem("token",JSON.stringify(result.auth));
         if(result){
              navigate('/')
         }
  }

  return (
    <div className='regis'>
        <h1 Style="margin:15px">Register</h1>
        <input className='topainput' type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='enter name'/>
        <input className='topainput' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter email'/>
        <input className='topainput' type='password' value={pass} onChange={(e)=>setPass(e.target.value)} placeholder='enter password'/>
        <button type='button' onClick={collectData} className='polabut'>Signup</button>
    </div>
  )
}

export default Signup;
