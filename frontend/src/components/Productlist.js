import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Productlist = () => {
    const [pro,setPro] = useState([]);

    useEffect(()=>{
          getproduct();

    },[])

    const getproduct = async()=>{
         let res = await fetch('https://backreal.vercel.app/products',{
              headers:{
                 authorization:JSON.parse(localStorage.getItem('token'))
              }
         });
         res  = await res.json();
         setPro(res);
         console.log(res)
    }
 
    const deleproduct = async(id)=>{
          let res = await fetch(`https://backreal.vercel.app/prod/${id}`,{
            method:'delete',
            headers:{
               authorization:JSON.parse(localStorage.getItem('token'))
            }
          });
          res = await res.json();
          if(res){
             getproduct();
          }
    }

    const searcHandle = async(event)=>{
       let key = event.target.value;
       if(key){
        let rest = await fetch(`https://backreal.vercel.app/search/${key}`,{
         headers:{
            authorization:JSON.parse(localStorage.getItem('token'))
         }
        });
        rest = await rest.json();
        if(rest){
           setPro(rest)
        }
        console.log(rest)
       }
       else{
          getproduct();
       }
      
    }

  return (
      <div className='kelpop'>
        <h3 className='dfer'>Contact list</h3>
        <input className='loip' type='text' placeholder='Search product' onChange={searcHandle}/>
        <ul className='head'>
            <li>S. No</li>
            <li>Name</li>
            <li>Phone</li>
            <li>Email</li>
            <li>Linkedin</li>
            <li>Twitter</li>
            <li>Operation</li>
        </ul>
        {
            pro.length>0? pro.map((e,item)=>
             <ul key={e._id}>
            <li>{item+1}</li>
            <li>{e.name}</li>
            <li>{e.phone}</li>
            <li>{e.email}</li>
            <li>{e.linkedin}</li>
            <li>{e.twitter}</li>
            <li>
              <button  onClick={()=>deleproduct(e._id)} className='polabt'>Delete</button>
              <Link className='' to={'/update/'+e._id }><button className='but'>Update</button></Link>
              </li>
             </ul>
            )
            : <h1>No result found</h1>
        }
        
      </div>
  )
}

export default Productlist
