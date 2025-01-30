import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { setUser } from '@/store/slices/user'
import { useRouter } from 'next/navigation'

const Layout = ({children}) => {
  console.log('Inside layout')
  const dispatch = useDispatch()
  const router = useRouter()
  const fetchProfileData = async() => {
    console.log('Inside fetch Profile')
    try{
      const response = await fetch('http://localhost:7777/profile', {
        method: "GET", 
        credentials: "include"
      })
        if(!response.ok) {
          const data = response.json()
          throw new Error('Token Not present')
        }
       const data = await response.json()
       console.log('data', data)
       dispatch(setUser(data.data))
    } catch(err) {
      router.push('/login')
      console.log(err)
    }
  }
  useEffect(() => {
    fetchProfileData()
  }, [])
  return (
    <div>
      <Navbar/>
        <main>{children}</main>
      {/* <Footer/> */}
    </div>
  )
}

export default Layout
