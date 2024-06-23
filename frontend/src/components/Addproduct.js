import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState("");
    const [linkedin,setLinkedin] = useState("");
    const [twitter,setTwitter] = useState("");
    const navigate = useNavigate();

    const [err,setErr] = useState(false)
    const addpro = async()=>{
        // console.log(!name)
        if(!name || !phone ||!email || !linkedin || !twitter){
           setErr(true);
            return false;
        }
        console.log(name,phone,email,linkedin);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        
        let res = await fetch('http://localhost:4500/addpro',{
            method:'post',
            body:JSON.stringify({name,phone,email,linkedin,twitter,userId,}),
            headers:{
                'Content-Type':'application/json',
                 authorization:JSON.parse(localStorage.getItem('token'))
            }
            
        })

        res = await res.json();
        console.log(res);
        navigate('/')
    }

  return (
    <div className='pro'>
        <h1 className=' proh1'>Add Product</h1>
         <input className='topainput' type='text'  value={name} onChange={(e)=>setName(e.target.value)} placeholder='product name'/>
         {err && !name && <span className='tiopa' >*** Enter valid name</span>}
         <input className='topainput' type='text'  value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='product phone'/>
         {err && !phone && <span className='tiopa' >*** Enter valid phone</span>}
         <input className='topainput' type='text'  value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='product email'/>
         {err && !email && <span className='tiopa' >*** Enter valid email</span>}
         <input className='topainput' type='text'  value={linkedin} onChange={(e)=>setLinkedin(e.target.value)} placeholder='product linkedin'/>
         {err && !linkedin && <span className='tiopa' >*** Enter valid linkedin</span>}
         <input className='topainput' type='text'  value={twitter} onChange={(e)=>setTwitter(e.target.value)} placeholder='product linkedin'/>
         {err && !twitter && <span className='tiopa' >*** Enter valid twitter</span>}
         <button onClick={addpro} className='polabut'>Add product</button>
         
    </div>
  )
}

export default Addproduct                     