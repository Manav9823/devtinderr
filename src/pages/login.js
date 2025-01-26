import { setUser } from '@/store/slices/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';


const login = () => {
    const [email, setEmail] = useState("Tilak@gmail.com")
    const [password, setPassword] = useState("Tilak@123")
    const router = useRouter()
    const dispatch = useDispatch()

    const handleLogin = async () => {
        console.log(email, password)
        try{
            const response = await fetch('http://localhost:7777/login', {
                method: 'POST', 
                body: JSON.stringify({emailId: email, password}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            }) 
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }
            const data = await response.json()
            console.log('data', data)
            dispatch(setUser(data.data))
            toast(data.message)
            router.push('/')
        } catch(err) {
            console.log(err)
            toast('Error while logging in please check your email and pasword')
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
