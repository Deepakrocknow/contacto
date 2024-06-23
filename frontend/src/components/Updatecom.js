import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';

const Updatecom = () => {
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const [linkedin,setLinkedin] = useState("");
  const [twitter,setTwitter] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
      getdetail();
    },[])

    const getdetail = async()=>{
        let resp = await fetch(`http://localhost:4500/prod/${params.id}`,{
          headers:{
            authorization:JSON.parse(localStorage.getItem('token'))
         }
        })
        resp = await resp.json();
        setName(resp.name);
        setPhone(resp.phone)
        setEmail(resp.email);
        setLinkedin(resp.linkedin);
        setTwitter(resp.twitter);
        console.log(resp)
    }
    
    const updatePro = async()=>{
        let rest = await fetch(`http://localhost:4500/prod/${params.id}`,{
            method:'put',
            body:JSON.stringify({name,phone,email,linkedin,twitter}),
            headers:{
               'Content-Type':'application/json',
              authorization:JSON.parse(localStorage.getItem('token'))
           }
        })
        rest = await rest.json();
        console.log(rest)
        navigate('/');
    }

  return (
    <div className='pro'>
        <h1 className=' proh1'>Update Product</h1>
        <input className='topainput' type='text'  value={name} onChange={(e)=>setName(e.target.value)} placeholder='product name'/>
         <input className='topainput' type='text'  value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='product phone'/>
         <input className='topainput' type='text'  value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='product email'/>
         <input className='topainput' type='text'  value={linkedin} onChange={(e)=>setLinkedin(e.target.value)} placeholder='product linkedin'/>
         <input className='topainput' type='text'  value={twitter} onChange={(e)=>setTwitter(e.target.value)} placeholder='product linkedin'/>
         <button onClick={updatePro}  className='polabut'>Update product</button>
         
    </div>
  )
}

export default Updatecom