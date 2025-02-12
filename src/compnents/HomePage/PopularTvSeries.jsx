import React, { useContext } from 'react'
import Title from '../Title'
import { MovieContext } from '../../context/MovieProvider'
import TrendingMovie from '../TrendingMovie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation, Scrollbar } from 'swiper/modules';
import { Link } from 'react-router-dom';

const PopularTvSeries = () => {
    const { popularSeries } = useContext(MovieContext);
    // console.log(popularSeries)
    return (
        <div className='text-white mt-10 '>
            <Link to='/tv/popular'>
                <Title text='Popular TV Series' />
            </Link>
            <div>
                {
                    (
                        <Swiper
                        modules={[Navigation,Scrollbar, Mousewheel]}
                        spaceBetween={10} 
                        navigation={true}
                        
                        mousewheel={{ enabled: true }}
                        cssMode={true}
                        slidesPerView={2.25}
                        breakpoints={{
                            640: {
                                slidesPerView: 6,
                                spaceBetween: 20,
                            }
                        }}
                    >
                            {popularSeries.map((movie, i) => (
                                <SwiperSlide className='my-4 md:mb-0 mb-6' key={movie.id} >
                                    <TrendingMovie type="tv" id={movie.id} movie={movie} index={i + 1} videoUrl={movie.trailerUrl} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )
                }
            </div>
        </div>
    )
}

export default PopularTvSeries