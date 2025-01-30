import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import FeedCard from './FeedCard'
import { useDispatch } from 'react-redux'
import { addFeed } from '@/store/slices/feed'

const Feed = () => {

    const [feed, setFeed] = useState([{}])
    const dispatch = useDispatch()

    const getFeedOfUser = async() => {
        try {
            const data = await fetch('http://localhost:7777/feed', {
                method: 'GET',
                credentials: "include"
            })
            const response = await data.json()
            dispatch(addFeed(response.data))
            setFeed(response.data)
            console.log('response ',response)
        } catch(err) {
            toast(err)
        }
    }

    useEffect(() => {
        getFeedOfUser()
    }, [])

  return feed && (
    <div>
        <ToastContainer/>
        <div className='flex justify-center my-10'>
            <FeedCard feed = {feed[0]}/>
        </div>
    </div>
  )
}

export default Feed
