import { BASE_URL } from '@/utils/constants'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const Profile = () => {
  console.log('inside profile')

  const selector = useSelector((state) => state.user.user)
  const [emailId, setEmailId] = useState(selector?.emailId)
  const [password, setPassword] = useState(selector?.password)
  const [firstName, setFirstName] = useState(selector?.firstName)
  const [lastName, setLastName] = useState(selector?.lastName)
  const [about, setAbout] = useState(selector?.about)

  console.log('data here is ',selector)
  const fetchUserProfile = async() =>{
    console.log('Inside fetch user Profile')
    try {
      console.log('inside this')
      const response = await fetch(BASE_URL + '/feed', {
        method: 'GET',
        credentials: "include"
      })
      const data = await response.json()
      console.log(data)
    } catch(err) {
      // console.log('err', err.meesa)
    }
  }

  const handleProfileUpdate = async () => {
    try {
      const response = await fetch(BASE_URL + '/updateUser', {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          about: about
        })
      })
      const data = await response.json()
      console.log('updated data',data)
    } catch (err) {

    }
  }

  useEffect(() => {
    // fetchUserProfile()
  }, [])
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
                <h2 className="card-title mx-auto">Edit Profile</h2>
                <input type="text" value={firstName} className='p-3 rounded-lg text-md font-normal' onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" value={lastName} className='p-3 rounded-lg text-md font-normal' onChange={(e) => setLastName(e.target.value)}/>
                <input type="text" value={about} className='p-3 rounded-lg text-md font-normal' onChange={(e) => setAbout(e.target.value)}/>

                {/* <input type="email" placeholder='Enter your Email' value={email} className='p-3 rounded-lg text-md font-normal' onChange={(e) => setEmail(e.target.value)}/> */}
                {/* <input type="password" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} className='p-3 rounded-lg text-md font-normal'/> */}
                <div className="card-actions mx-auto">
                    <button className="btn btn-primary" onClick={handleProfileUpdate}>Edit Profile</button>
                </div>
        </div>
    </div>
    </>
  )
}

export default Profile
