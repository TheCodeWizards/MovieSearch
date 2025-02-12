import React from 'react'
import Trending from '../compnents/HomePage/Trending'
import PopularCelebs from '../compnents/HomePage/PopularCelebs'
import UpComing from '../compnents/HomePage/UpComing'
import PopularTvSeries from '../compnents/HomePage/PopularTvSeries'
const Home = () => {
  return (
      <div className='md:px-20 ps-3 md:pb-10 pb-7 bg-black' >
        <Trending/>
        <PopularCelebs/>
        <UpComing/>
        <PopularTvSeries/>
      </div>
      
  )
}

export default Home
