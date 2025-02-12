import React from 'react'

const Title = ({text}) => {
    return (
        <div className='flex items-center mb-4 gap-3'>
            <p className='h-10 w-2 rounded-sm bg-yellow-400'></p>
            <h1 className='md:text-2xl text-xl font-bold'>{text} </h1>
            <span className='md:text-2xl text-xl text-yellow-400 rotate-90'><i className="fa-solid fa-chevron-up"></i></span>
        </div>
    )
}

export default Title
