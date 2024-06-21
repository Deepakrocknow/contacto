import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login =  ()=> {
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState('');
    const navigate = useNavigate();

    
  const handlelogin =async()=>{
    console.log(email,pass);
    let result = await fetch('http://localhost:4500/login',{
          method:'post',
          body:JSON.stringify({email,pass}),
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
        <input className='topainput' type='text' value={email} placeholder='enter email' onChange={(e)=>{setEmail(e.target.value)}}/>
        <input className='topainput' type='password' value={pass} placeholder='enter password' onChange={(e)=>{setPass(e.target.value)}}/>
        <button onClick={handlelogin} type='button' className='polabut'>Log-in</button>
        
    </div> 
  )
}

export default Login