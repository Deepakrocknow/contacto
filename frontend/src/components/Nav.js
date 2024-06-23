import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const Nav = () => {
  const auth = localStorage.getItem('user')
  const navigate = useNavigate();
  useEffect(()=>{
     const auth = localStorage.getItem('user');
   //   if(auth){
   //    //   navigate('/');
   //   }
  })

  const logout = ()=>{
        localStorage.clear();
        navigate('/signup')
  }
 
  return (
    <div>
       {/* <img className='pli' src='https://t4.ftcdn.net/jpg/04/83/17/69/360_F_483176984_NkRE4YCDBZQnMrOpm7ROQvLgxX6NBG8h.jpg' alt='logo'/> */}
        {auth?<ul className='nav-ul'>
            <li><Link to="/">Contact's</Link></li>
            <li><Link to="/add">Add Contact</Link></li>
            <li><Link to="/update">Update Contact</Link></li>
            <li><Link onClick={logout} to="/signup">logout({JSON.parse(auth).name})</Link></li>       
        </ul>:
        <ul className='nav-ul'>
             <li><Link to='/signup'>Signup</Link></li>
             <li><Link to="/login">Login</Link></li>
        </ul>
}
    </div>
  )
}

export default Nav

