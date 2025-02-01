import { createSocketConnection } from '@/utils/socket'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Chat = ({chatWith}) => {
    const [text, setText] = useState('')
    const [message, setMessage] = useState([])
    const [currentText, setCurrentText] = useState()
    const user = useSelector(state => state.user.user)
    // console.log('user', user)
    const userId = user._id
    const firstName = user.firstName
    const handleMessage = () => {
        const socket = createSocketConnection()
        socket.emit("sendMessage",{userId, chatWith, firstName, text})
        console.log('inside set Message')
        socket.on('testing', ({text}) =>{
            console.log('text here is', text)
        })
        socket.on("messageRecieved", ({firstName, text}) =>{
            console.log(`message :  ${firstName} : ${text} `)
        })
        // message.push({text: text})
        // console.log(message)
        setMessage([...message, { text }])
        setText('')
        // setCurrentText(message)
    }
    console.log(chatWith)


    useEffect(()=>{
        const socket = createSocketConnection()
        console.log('userId', userId)
        const firstName = user.firstName
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
        })
        return () => {
            socket.disconnect()
        }
    }, [userId, chatWith])

    useEffect(() => {

    }, )
  return (
    <div className='border-2 border-gray-200 flex flex-col justify-center items-center mx-auto h-96 w-96 p-2'>
        <div className='h-3/4 border-2 border-gray-300 w-full'>
            {message.map((m) => {
                return (<div>
                    <h1 className='text-[16px] font-bold font-serif flex items-start'>{m.text}</h1>
                </div>)
            })}
        </div>
        <div className='border-t-2 border-gray-200 p-2 flex mr-3'>
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
