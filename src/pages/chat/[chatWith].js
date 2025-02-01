import Chat from '@/components/Chat'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const chatWith = () => {
    const router = useRouter()
    console.log('router', router?.query)
    const chatWith = router?.query?.chatWith
    console.log('inside chat page',chatWith)
    // const [chatWith, setChatWith] = useState(null);
  //   useEffect(() => {
  //     if (router.isReady) {
  //         setChatWith(router?.query?.chatWith);
  //     }
  // }, [router.isReady, router?.query?.chatWith]);
  if (!chatWith) return <p>Loading...</p>;
  return (
    <div>
        <Chat chatWith={chatWith}/>
    </div>
  )
}

export default chatWith
