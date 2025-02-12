import React, { useState } from 'react'

const ReadMore = ({text,length}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    if(text.length<length)
        return <p className='p-2'>{text}</p>;
  return (
    <p className='text-justify md:text-[17px] text-sm p-2'>
        {isExpanded? text : text.slice(0,length) + "..."}{" "}
        <button onClick={()=>setIsExpanded(!isExpanded)} className='text-blue-400 font-medium cursor-pointer hover:text-blue-500 underline'>
        {isExpanded ? "Read Less" : "Read more"}
        </button>
    </p>
  )
}

export default ReadMore