import { createSocketConnection } from '@/utils/socket'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Chat = ({chatWith, name}) => {
    console.log('inside chat', name, chatWith)
    const [nameHere, setNameHere] = useState(name)
    console.log('nameHere', nameHere)
    const [text, setText] = useState('')
    const [message, setMessage] = useState([])
    const [currentText, setCurrentText] = useState()
    const user = useSelector(state => state.user?.user)
    // console.log('user', user)
    const userId = user?._id
    const firstName = user?.firstName
    const handleMessage = () => {
        const socket = createSocketConnection()
        socket.emit("sendMessage",{userId, chatWith, firstName, text})
        console.log('inside set Message')
        socket.on('testing', ({text}) =>{
            console.log('text here is', text)
        })
        setText('')
        // socket.on("messageRecieved", ({firstName, text}) =>{
        //     console.log(`message :  ${firstName} : ${text} `)
        // })
        // message.push({text: text})
        // console.log(message)
        // setMessage([...message, { text }])
        // setText('')
        // setCurrentText(message)
    }
    console.log(chatWith)


    useEffect(()=>{
        const socket = createSocketConnection()
        console.log('userId', userId)
        const firstName = user?.firstName
        socket.emit("joinChat", {userId, chatWith, firstName}).on("User joined successfully", () => {
            console.log(`${firstName} joined the room successfully`)
        })
        socket.on('userLoggedIn', ({text}) =>{
            console.log('text here is', text)
        })
        console.log('inside useEffect')
        socket.on("throwMessage", ({firstName, text}) =>{
            console.log('inside message recieved')
            console.log(`message :  ${firstName} : ${text} `)
            setMessage((prevMessage) => [...prevMessage, {text: text, firstName}])
        })
        return () => {
            socket.disconnect()
        }
    }, [userId, chatWith])

    const getAllMessages = async() => {
        const response = await fetch(`http://localhost:7777/getMessages/${chatWith}`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json()
        console.log('data present here is', data.message)
        const chatMessages = data.message.map((m) => {
           const {senderId, text} = m
           return { 
            firstName: senderId?.firstName,
            lastName: senderId?.lastName,
            text
           }
        })
        setMessage(chatMessages)
    }

    useEffect(() => {
        getAllMessages()
    }, [])
  return (
    // <div className='border-2 border-gray-200 flex flex-col justify-center items-center mx-auto h-96 w-96 p-2'>
    //     <div className='h-3/4 border-2 border-gray-300 w-full'>
    //         {message.map((m) => {
    //             return (<div>
    //                 <h1 className='text-[16px] font-bold font-serif flex items-start'>{m.text}</h1>
    //             </div>)
    //         })}
    //     </div>
    //     <div className='border-t-2 border-gray-200 p-2 flex mr-3'>
    //         <input
    //             type='text'
    //             className='w-full rounded-lg border-2 border-gray-400'
    //             value={text}
    //             onChange={(e) => setText(e.target.value)}
    //         />
    //         <button className='btn btn-secondary' onClick={handleMessage}>Send</button>
    //     </div>
    // </div>
    <div className='h-[88vh] flex flex-col'>
        <div className='flex items-center shadow-lg p-4'>
            <Image src='/profile.webp'height={100} width={100} alt='image' className='w-14 h-full mr-5 rounded-full border-2 border-gray-400'/>
            <h1 className='font-bold text-[20px]'>{name}</h1>
        </div>
        
        <div className='w-full mx-4 h-[90%] p-3 overflow-y-auto '>
            {message.map((m) => {
                return (
                    m?.firstName === firstName ? 
                    <div key={m.text} className='flex flex-col items-end'>
                        {/* <h1 className='text-[12px] font-semibold font-serif flex  shadow-lg bg-green-100 p-3 rounded-lg w-[10%]'>You</h1> */}
                        <h1 className='text-[16px] font-bold font-serif flex items-start shadow-lg m-3 bg-green-100 p-3 rounded-lg w-1/4'>{m?.text}</h1>
                    </div> : 
                    <div key={m?.text}>
                        <h1 className='text-[12px] font-semibold font-serif flex  shadow-lg m-3 bg-green-100 p-3 rounded-lg w-[10%]'>{m?.firstName}</h1>
                        <h1 className='text-[16px] font-bold font-serif flex items-start shadow-lg m-3 bg-white p-3 rounded-lg w-1/4'>{m?.text}</h1>
                    </div>
                )
            })}
        </div>
        <div className='flex mr-3 h-[8%]'>
            <input
                type='text'
                className='w-full rounded-lg border-2 border-gray-400'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button className='btn btn-secondary' onClick={handleMessage}>Send</button>
        </div>
    </div>
  )
}

export default Chat
