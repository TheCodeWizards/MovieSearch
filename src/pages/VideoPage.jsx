import React from 'react'
import FetchVideos from '../compnents/MovieDetailsPage/FetchVideos'

const VideoPage = () => {
    return (
        <div className='h-screen flex md:p-10 items-center justify-center bg-black'>
            <div className='w-full'>
                <FetchVideos showAll={true} />
            </div>
        </div>
    )
}

export default VideoPage