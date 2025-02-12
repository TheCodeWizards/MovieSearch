import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Mousewheel, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { MovieContext } from '../../context/MovieProvider';
import Title from '../Title';
import TrendingMovie from '../TrendingMovie';
import Loader from '../Loader';

const Trending = () => {
    const {trending,isLoading} = useContext(MovieContext);

    return (
        <div className='md:pt-8 pt-2 text-white'>
            
            <Title text="Top Trending this week"/>
           
            {isLoading && <Loader/>}
                {
                        (
                            <Swiper
                                modules={[Navigation,Scrollbar, Mousewheel]}
                                spaceBetween={10} 
                                navigation={true}
                                scrollbar={{enabled:false,
                                    draggable: true,
                                    dragSize: 100,
                                }}
                                mousewheel={{ enabled: true }}
                                cssMode={true}
                                slidesPerView={2.25}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 6,
                                        spaceBetween: 20,
                                        scrollbar:{
                                            enabled: false,
                                            
                                        }
                                    }
                                }}
                            >
                                {trending.map((movie, i) => (
                                    <SwiperSlide className='my-4 md:mb-0 mb-6' key={movie.id} >
                                        <TrendingMovie type={movie.media_type} id={movie.id} movie={movie} index={i + 1} videoUrl={movie.trailerUrl} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )
                }
        </div>
    )
}

export default Trending
