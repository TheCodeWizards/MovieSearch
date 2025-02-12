import React from 'react'
import Review from '../compnents/MovieDetailsPage/Review'
import { useNavigate, useParams } from 'react-router-dom';

const ReviewPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className='py-5 bg-yellow-900' >
        <button onClick={() => navigate(-1)} className='md:text-2xl text-xl cursor-pointer text-white px-5 font-medium'>
          <span className='md:text-xl me-2'><i class="fa-solid fa-arrow-left"></i></span>Back</button>
      </div>
      <div className='md:px-20 px-5 pt-5 pb-10 md:min-h-screen'>
        <Review showAll={false}></Review>
      </div>
    </>



  )
}

export default ReviewPage