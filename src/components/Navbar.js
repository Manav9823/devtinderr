import { removeUser, setUser } from '@/store/slices/user'
import { BASE_URL } from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Navbar = () => {
    console.log('Inside navbar')
    const user = useSelector((state) => state.user)
    const router = useRouter()
    const dispatch = useDispatch()

    // console.log('user value here', user?.user)
    const handleLogout = async() => {
        console.log('inside logout')
        try{
            await fetch(BASE_URL + '/logout', {
                method: 'GET', 
                credentials: "include"
            })
            // if(!response.ok){
            //     throw new Error('Not able to logout at this moment please try again !!!!')
            // }
            dispatch(removeUser())
            router.push('/login')

            // toast('Logged out successfully')
        } catch (err) {
            console.log('Inside catch')
            toast(err.message)
        }
    }
    // const dispatch = useDispatch()
    // const fetchProfileData = async() => {
    //     console.log('Inside fetch Profile')
    //     try {
    //     const response = await fetch('http://localhost:7777/profile', {
    //         method: "GET", 
    //         credentials: "include"
    //     })
    //     const data = await response.json()
    //     console.log('data', data)
    //     dispatch(setUser(data.data))
    //     } catch(err) {

    //     }
    // }
    // useEffect(() => {
    //     fetchProfileData()
    // }, [])

  return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">devTinderr</Link>
        </div>
        <div className="flex-none gap-2">
            {user?.user && <div className="dropdown dropdown-end mr-10">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                    />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                <Link className="justify-between" href={'/profile'}>
                    Profile
                    <span className="badge">New</span>
                </Link>
                </li>
                <li><Link href='/connections'>Connections</Link></li>
                <li><a>Settings</a></li>
                <li onClick={handleLogout}><Link href="/login">Logout</Link></li>
            </ul>
            </div>}
        </div>
    </div>
  )
}

export default Navbar
