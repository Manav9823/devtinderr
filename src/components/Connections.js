import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Connections = () => {
    const [allConnections, setAllConnections] = useState([{}])
    const router = useRouter()
    const getAllConnections = async() => {
        try {
            console.log('inside get all connecitons')
            const response = await fetch('http://localhost:7777/getAllConnections',{
                method: 'GET',
                credentials: 'include'
            })
            const data = await response.json()
            console.log('all connections', data)
            setAllConnections(data.data)
        } catch(err) {

        }
    }
    const openChatWindow = (chatWith) => {
        router.push(`/chat/${chatWith}`)
    }
    useEffect(() => {
        console.log('inside useEffect')
        getAllConnections()
    }, [])
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        {allConnections.map((connection, index) => {
            return (<div className='shadow-lg rounded-lg bg-gray-300 p-10 flex'>
                <Image src='/profile.webp'height={100} width={100} alt='image' className='w-20 h-full mr-5'/>
                <div className='flex flex-col'>
                    <h1 className='text-[20px] font-semibold font-serif'>{connection?.fromUserId?.firstName + " " + connection?.fromUserId?.lastName}</h1>
                    <button className='btn btn-primary' onClick={() => openChatWindow(connection?.fromUserId?._id)}>Chat Now</button>
                </div>
            </div>)
        })}
        
    </div>
  )
}

export default Connections
