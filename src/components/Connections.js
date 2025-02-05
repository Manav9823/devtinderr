import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chat from './Chat'
import chatWith from '@/pages/chat/[chatWith]'

const Connections = () => {
    const [allConnections, setAllConnections] = useState([{}])
    const router = useRouter()
    const user = useSelector(state => state.user.user)
    const [openChat, setOpenChat] = useState(false)
    const [chatPartner, setChatPartner] = useState('')
    const [chatPartnerName, setChatPartnerName] = useState('')
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
    const openChatWindow = (chatWith, name) => {
        console.log('manav', chatWith, name)
        // router.push(`/chat/${chatWith}`)
        setChatPartner(chatWith)
        setChatPartnerName(name)
        setOpenChat(true)
    }
    useEffect(() => {
        console.log('inside useEffect')
        getAllConnections()
    }, [])

  return (
    // <div className='flex flex-col items-center justify-center mt-10'>
    //     {allConnections.map((connection, index) => {
    //         return (<div className='shadow-lg rounded-lg bg-gray-300 p-10 flex'>
    //             <Image src='/profile.webp'height={100} width={100} alt='image' className='w-20 h-full mr-5'/>
    //             <div className='flex flex-col'>
    //                 <h1 className='text-[20px] font-semibold font-serif'>{connection?.fromUserId?._id !== user?._id ?  
    //                 connection?.fromUserId?.firstName + " " + connection?.fromUserId?.lastName : 
    //                 connection?.toUserId?.firstName + " " + connection?.toUserId?.lastName }</h1>
    //                 <button className='btn btn-primary' onClick={() => 
    //                     openChatWindow(connection?.fromUserId?._id !== user._id  
    //                     ? connection?.fromUserId?._id : 
    //                       connection?.toUserId?._id)}>Chat Now</button>
    //             </div>
    //         </div>)
    //     })}
        
    // </div>
    <div className='flex flex-row'>
        <div className='w-[20%]'>
        {allConnections.map((connection, index) => {
            return (
                <div className='p-3 flex'>
                    <Image src='/profile.webp'height={100} width={100} alt='image' className='w-20 h-full mr-5 rounded-full'/>
                    <div className='flex flex-col'>
                        <h1 className='text-[20px] font-semibold font-serif'>{connection?.fromUserId?._id !== user?._id ?  
                        connection?.fromUserId?.firstName + " " + connection?.fromUserId?.lastName : 
                        connection?.toUserId?.firstName + " " + connection?.toUserId?.lastName }</h1>
                        <button className='btn btn-primary' onClick={() => 
                            openChatWindow(connection?.fromUserId?._id !== user?._id  
                            ? connection?.fromUserId?._id : 
                            connection?.toUserId?._id, connection?.fromUserId?._id !== user?._id ?  
                            connection?.fromUserId?.firstName + " " + connection?.fromUserId?.lastName : 
                            connection?.toUserId?.firstName + " " + connection?.toUserId?.lastName)}>Chat Now</button>
                    </div>
                </div>
            )
        })}
        </div>
        
        {
        openChat ? <div className='w-[80%] bg-gray-200'>
            {console.log('openChat here is ', openChat)}
            <Chat chatWith={chatPartner} name={chatPartnerName}/>
        </div>: 
        <div>
            Load something!!!
        </div>
        }
    </div>
  )
}

export default Connections
