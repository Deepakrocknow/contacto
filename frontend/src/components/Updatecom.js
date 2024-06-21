import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';

const Updatecom = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
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
        setPrice(resp.price)
        setCompany(resp.company);
        setCategory(resp.category);
        console.log(resp)
    }
    
    const updatePro = async()=>{
        let rest = await fetch(`http://localhost:4500/prod/${params.id}`,{
            method:'put',
            body:JSON.stringify({name,price,category,company}),
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
         <input className='topainput' type='text'  value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='product price'/>
         <input className='topainput' type='text'  value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='product category'/>
         <input className='topainput' type='text'  value={company} onChange={(e)=>setCompany(e.target.value)} placeholder='product company'/>
         <button onClick={updatePro}  className='polabut'>Update product</button>
         
    </div>
  )
}

export default Updatecom