import React from 'react'
import ReadMore from '../ReadMore';

const ReviewCard = ({ review }) => {
    const randomColor = ["#FFFF32", // White
        "#FF4500", // Orange Red
        "#32CD32", // Lime Green
        "skyBlue", // Dodger Blue
        "#FFD700", // Gold
        "#FF69B4", // Hot Pink
        "#800080", // Purple
        "#FF6347", // Tomato
        "#00CED1", // Dark Turquoise
        "lime"  // Peach Puff
       ];
    const pickRandomColor = () => {
        const index = Math.floor(Math.random() * 10);
        return randomColor[index];
    }
    // const name = review.author.split(" ")
    // if(name.length===1){
    //     const intial = name[0][0];
    // }
    // else{
    //     const intial = name[0][0]+name[name.length-1][0]

    // }
    const authorColor = pickRandomColor();
    return (
        <div className='w-full my-3 shadow-[0px_0px_5px_rgba(211,211,211,0.7),_0px_0px_5px_rgba(0,0,0,0.5)] border-gray   text-black border-gray-300 border-[1px] p-4 rounded-lg'>
            <div className='flex gap-2 mb-1 items-center'>
                <div className='px-5 py-3 text-white rounded-full' style={{ background: authorColor }}>
                    <h1 className='text-xl font-medium'>{review.author ? review.author.slice(0, 1).toUpperCase() : ""}</h1>
                </div>
                <div>
                    <h1 className='md:text-2xl text-xl font-bold'>A review by
                        <span className='px-2' style={{color:'black'}}>{review.author}</span>
                    </h1>
                    <p className='font-light md:text-[15px] text-xs #999c9e'>
                        Written By <span className='font-normal text-black ' >{review.author}
                        </span> on
                        <span className='font-normal  text-black'> {review.updated_at ? review.updated_at.slice(0, 10) : "N/A"} </span>
                    </p>
                </div>
            </div>
            <ReadMore text={review.content} length={300} />
        </div>
    )
}

export default ReviewCard