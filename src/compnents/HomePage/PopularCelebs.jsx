import React, { useContext } from 'react'
import { MovieContext } from '../../context/MovieProvider'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, Scrollbar } from 'swiper/modules';
import Title from '../Title';
import { Link } from 'react-router-dom';

const PopularCelebs = () => {
    const { trendingPeople } = useContext(MovieContext);
    return (
        <div className='text-white mt-10 '>
            <Link to='/people/popular'>
            <Title text="Most Popular Celebrities" />

            </Link>
            <div className='mt-6'>
            <Swiper
                                modules={[Navigation,Scrollbar]}
                                spaceBetween={10} 
                                navigation={true}
                                cssMode={true}
                                slidesPerView={2.25}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 6,
                                        spaceBetween: 20,
                                    }
                                }}
                            >
                    {
                        trendingPeople.map((people) => (
                            <SwiperSlide className='md:mb-0 mb-3' key={people.id}>
                                <Link to={`/person/${people.id}/${people.name}`}>
                                    <div className='flex flex-col mb-5 gap-4 hover:brightness-[90%] hover:underline items-center'>
                                        <img src={`https://image.tmdb.org/t/p/w500${people.profile_path}`} className='rounded-full  object-cover object-center w-[150px] h-[150px] md:w-[180px] md:h-[180px]'  alt="" />
                                        <p className='text-white text-lg font-medium'>{people.name}</p>
                                    </div>
                                </Link>

                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default PopularCelebs
