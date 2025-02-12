import React, { useContext } from 'react'
import { MovieContext } from '../../context/MovieProvider'
import TrendingMovie from '../TrendingMovie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation, Scrollbar } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Title from '../Title';
import 'swiper/css';
import 'swiper/css/navigation';

const UpComing = () => {
    const { upComingMovie } = useContext(MovieContext)
    return (
        <div className='text-white mt-10 '>
            <Link to='/movie/upcoming'>
                <Title text="UpComing" />
            </Link>
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
                        {upComingMovie.map((movie, i) => (
                            <SwiperSlide className='my-4 md:mb-0 mb-6' key={movie.id} >
                                <TrendingMovie type={"movie"} id={movie.id} movie={movie} index={i + 1} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )
            }
        </div>
    )
}

export default UpComing;