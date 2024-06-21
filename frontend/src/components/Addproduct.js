import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Addproduct = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [company,setCompany] = useState("");
    const navigate = useNavigate();

    const [err,setErr] = useState(false)
    const addpro = async()=>{
        // console.log(!name)
        if(!name || !price ||!category || !company){
           setErr(true);
            return false;
        }
        console.log(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        
        let res = await fetch('http://localhost:4500/addpro',{
            method:'post',
            body:JSON.stringify({name,price,category,userId,company}),
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
         <input className='topainput' type='text'  value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='product price'/>
         {err && !price && <span className='tiopa' >*** Enter valid price</span>}
         <input className='topainput' type='text'  value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='product category'/>
         {err && !category && <span className='tiopa' >*** Enter valid category</span>}
         <input className='topainput' type='text'  value={company} onChange={(e)=>setCompany(e.target.value)} placeholder='product company'/>
         {err && !company && <span className='tiopa' >*** Enter valid company</span>}
         <button onClick={addpro} className='polabut'>Add product</button>
         
    </div>
  )
}

export default Addproduct                     