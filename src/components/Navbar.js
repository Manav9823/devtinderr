import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const user = useSelector((state) => state.user)
    console.log('user value here', user.user)
  return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">devTinderr</Link>
        </div>
        <div className="flex-none gap-2">
            {user.user && <div className="dropdown dropdown-end mr-10">
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
                <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
            </div>}
        </div>
    </div>
  )
}

export default Navbar
