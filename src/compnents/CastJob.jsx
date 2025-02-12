import React from 'react'

const CastJob = ({ state }) => {
    return (
        <div>
            <div className='flex my-3 items-center gap-5'>
                <img src={`https://image.tmdb.org/t/p/w185${state.profile_path}`} className='rounded-xl' style={{ width: "70px" }} />
                <div>
                    <p className=' font-medium'>{state.name}</p>
                    <p className='text-sm text-gray-400'>{state.job}</p>
                </div>
            </div>
        </div>
    )
}

export default CastJob
