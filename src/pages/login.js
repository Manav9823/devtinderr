import Link from 'next/link';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const login = () => {
    const [email, setEmail] = useState("Raju@gmail.com")
    const [password, setPassword] = useState("Raju@123")

    const handleLogin = async () => {
        console.log(email, password)
        try{
            const response = await fetch('http://localhost:7777/login', {
                method: 'POST', 
                body: JSON.stringify({emailId: email, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }) 
            const data = await response.json()
            // console.log(data.message)
            console.log(data.data)
            toast(data.message)
        } catch(err) {
            console.log(err)
            toast(err)
        }
    }
  return (
    <>
    <ToastContainer/>
    <div className="card glass w-96 mx-auto my-20">
        
        <figure>
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="car!" />
        </figure>
        <div className="card-body">
                <h2 className="card-title mx-auto">Login</h2>
                <input type="email" placeholder='Enter your Email' value={email} className='p-3 rounded-lg text-md font-normal' onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} className='p-3 rounded-lg text-md font-normal'/>
                <div className="card-actions mx-auto">
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
        </div>
        <div className='flex mt-[-10] mb-3 justify-center items-center'>
            <h1 className=''>Don't have a account? </h1>
            <Link href="/signup" className='hover:text-blue-500 cursor-pointer ml-1'>Signup</Link>
        </div>
    </div>
    </>
    
  )
}

export default login
