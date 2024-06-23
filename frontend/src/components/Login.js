import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login =  ()=> {
    const [name,setName] = useState("");
    const [pass,setPass] = useState('');
    const navigate = useNavigate();

    
  const handlelogin =async()=>{
    console.log(name,pass);
    let result = await fetch(https://backreal.vercel.app/login',{
          method:'post',
          body:JSON.stringify({name,pass}),
          headers:{
              'Content-Type':'application/json'
          }
    });
    result = await result.json();
    console.log(result)
   if(result.auth){
        localStorage.setItem('user',JSON.stringify(result.ans));
        localStorage.setItem('token',JSON.stringify(result.auth));
        navigate('/');
   }
   else{
      alert('Enter Correct Details')
   }
}


  return (
    <div className='login'>
        <h1 Style="margin:15px">Login</h1>
        <input className='topainput' type='text' value={name} placeholder='enter name' onChange={(e)=>{setName(e.target.value)}}/>
        <input className='topainput' type='password' value={pass} placeholder='enter password' onChange={(e)=>{setPass(e.target.value)}}/>
        <button onClick={handlelogin} type='button' className='polabut'>Log-in</button>
    </div> 
  )
}

export default Login
