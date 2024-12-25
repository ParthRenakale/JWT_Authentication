import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Navbar() {
  const isUserSignedIn=!!localStorage.getItem('token')
  const navigate=useNavigate();

  const handleSignOut=()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <nav className='flex justify-around p-3 border-b border-zinc-800 bg-[#1a1a1a]/90 text-zinc-300'>
      <Link to="/"><h1 className='text-3xl'>AuthDB</h1></Link>
      <ul className='flex gap-6'>
      {isUserSignedIn?
      <>
      <Link to="/account"><h1>Account</h1></Link>
      <li><button onClick={handleSignOut}>Sign Out</button></li>
      </>:
      <>
            <Link to="/login"><h1>Login</h1></Link>
            <Link to="/signup"><h1>SignUp</h1></Link>
      </>}

      
      </ul>
    </nav>
  )
}

export default Navbar