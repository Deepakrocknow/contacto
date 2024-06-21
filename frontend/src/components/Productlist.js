import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Productlist = () => {
    const [pro,setPro] = useState([]);

    useEffect(()=>{
          getproduct();

    },[])

    const getproduct = async()=>{
         let res = await fetch('http://localhost:4500/products',{
              headers:{
                 authorization:JSON.parse(localStorage.getItem('token'))
              }
         });
         res  = await res.json();
         setPro(res);
         console.log(res)
    }
 
    const deleproduct = async(id)=>{
          let res = await fetch(`http://localhost:4500/prod/${id}`,{
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
        let rest = await fetch(`http://localhost:4500/search/${key}`,{
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
        <h3 className='dfer'>Product list</h3>
        <input className='loip' type='text' placeholder='Search product' onChange={searcHandle}/>
        <ul>
            <li>S. No</li>
            <li>Name</li>
            <li>Price</li>
            <li>category</li>
            <li>company</li>
            <li>Operation</li>
        </ul>
        {
            pro.length>0? pro.map((e,item)=>
             <ul key={e._id}>
            <li>{item+1}</li>
            <li>{e.name}</li>
            <li>{e.price}</li>
            <li>{e.category}</li>
            <li>{e.company}</li>
            <li>
              <button  onClick={()=>deleproduct(e._id)} className='polabt'>Delete</button>
              <Link className='tikap' to={'/update/'+e._id }>Update</Link>
              </li>
             </ul>
            )
            : <h1>No result found</h1>
        }
        
      </div>
  )
}

export default Productlist