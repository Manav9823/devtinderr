import React from 'react'

const FeedCard = ({feed}) => {
    console.log('feed here', feed)
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
            <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="card-title justify-center">{feed.firstName}</h2>
            <p>{feed.about}</p>
            <div className="card-actions justify-center">
            <button className="btn btn-secondary">Interested</button>
            <button className="btn btn-primary">Ignore</button>
            </div>
        </div>
    </div>
  )
}

export default FeedCard
