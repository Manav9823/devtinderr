import Chat from '@/components/Chat'
import { useRouter } from 'next/navigation'
import React from 'react'

const chatWith = () => {
    const router = useRouter()
    const chatWith = router?.query?.chatWith
  return (
    <div>
        <Chat chatWith={chatWith}/>
    </div>
  )
}

export default chatWith
