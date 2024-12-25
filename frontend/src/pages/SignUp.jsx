import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
function SignUp() {

  const [users,setUsers]=useState([]);
  const [email,setEmail]=useState('');
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');

  const navigate=useNavigate();

  useEffect(()=>{
    fetchUsers();
  },[])
  const fetchUsers=()=>{
    axios.get('http://localhost:3001/register')
    .then((res)=>{
      // console.log(res.data);
    })
  }

  const handleRegister=(event)=>{
    event.preventDefault();
    axios.post('http://localhost:3001/register',{email,username,password})
    .then(()=>{
      setEmail('');
      setPassword('');
      setUsername('');
      fetchUsers();
      alert("Registration successful!");
      toast.success("Registration successful!");
      navigate('/login');
      
      
    })
    .catch((err)=>{
      console.log("Unable to Register ",err)
    })

  }

  return (
    <>
      <Toaster/>
      <div className='w-full h-screen flex'>
        <div className='w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center'>
          <form className='text-center border rounded-lg w-[600px] h-[400px] p-9' onSubmit={handleRegister}>
            <label>Email</label>
            <br/>
            <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type="text" placeholder='Email' value={email} onChange={(event)=>setEmail(event.target.value)}/>
            <br/>
            <br/>
            <label>Username</label>
            <br/>
            <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type="text" placeholder='Username' value={username} onChange={(event)=>setUsername(event.target.value)}/>
            <br/>
            <br/>
            <label>Password</label>
            <br/>
            <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type="password" placeholder='password' value={password} onChange={(event)=>setPassword(event.target.value)}/>
            <br/>
            <br/>
            <button className='w-[200px] h-[50px] border hover:bg-teal-900' type='submit'>Sign Up</button>
          </form>
        </div>
        <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
          <h2 className='text-3xl text-white'>SIGNUP</h2>
        </div>
      </div>
    </>
  )
}

export default SignUp