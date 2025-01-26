import React, { useEffect } from 'react'

const Profile = () => {
  console.log('inside profile')
  const fetchUserProfile = async() =>{
    console.log('Inside fetch user Profile')
    try {
      console.log('inside this')
      const response = await fetch('http://localhost:7777/feed', {
        method: 'GET',
        credentials: "include"
      })
      const data = await response.json()
      console.log(data)
    } catch(err) {
      // console.log('err', err.meesa)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])
  return (
    <div>
      Feed121
    </div>
  )
}

export default Profile
