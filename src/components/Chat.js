import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'

const Chat = ({chatWith}) => {
    const [text, setText] = useState('')
    const [message, setMessage] = useState([])
    const handleMessage = () => {
        console.log('inside set Message')
        message.push({text: text})
        console.log(message)
        setMessage(message)
    }
    console.log(chatWith)
  return (
    <div className='border-2 border-gray-200 flex flex-col justify-center items-center mx-auto h-96 w-96 p-2'>
        <div className='h-3/4 border-2 border-gray-300 w-full'>
            {message.map((m) => {
                <div>
                    <h1 className='text-[16px] font-bold font-serif flex items-start'>{m.text}</h1>
                </div>
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
