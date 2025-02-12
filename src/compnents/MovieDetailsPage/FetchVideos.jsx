import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import options from '../../Other/UrlHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Loader from '../Loader';

const FetchVideos = ({ showAll }) => {
    const { id, type } = useParams();
    const [video, setVideo] = useState();

    const checkType = () => {
        if (type === 'movie')
            return `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
        else
            return `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
    }
    useEffect(() => {
        const fetchMovieImages = async () => {
            const url = checkType();
            try {
                const res = await fetch(url, options);
                const data = await res.json();
                setVideo(data.results);
            }
            catch (err) {
                console.error('Error fetching trailer:', err);
                return null;
            }
        }
        fetchMovieImages();
    }, [id, type]);
    if (!video) return <Loader />
    if (video.length == 0) return <p className='text-xl'>No Videos</p>
    return (
        <div className='mt-5'>
            <Swiper
                modules={[Scrollbar]}
                slidesPerView={video.length > 1 ? 2 : 1}
                spaceBetween={10}
                scrollbar={{
                    enabled: true,
                    draggable: true,
                    dragSize: 100,
                }}
                cssMode={true}
                breakpoints={{
                    300: { slidesPerView: 1 }, // Small screens
                    640: { slidesPerView: video.length > 1 ? 2 : 1 }, // Tablets
                    768: { slidesPerView: 2 }, // Medium screens
                    1024: { slidesPerView: video.length > 1 ? 2 : 1}, // Large screens
                }}
            >{
                // For video page
                    showAll ? (
                        video ? (
                            video.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <iframe className={`rounded-2xl mb-6 md:w-[950px] h-[200px] w-100 ${showAll ? "md:h-[505px]" : "md:h-[325px]"} `}
                                        src={`https://www.youtube.com/embed/${item.key}`}>
                                    </iframe>
                                </SwiperSlide>
                            ))
                        ) :
                            <Loader />
                    ) :
                    // For moviedetails page
                        (video ? (
                            video.slice(0, 4).map((item, i) => (
                                <SwiperSlide className='my-3' key={i}>
                                    <iframe  className={`rounded-2xl mb-6 md:w-[950px] h-[250px] w-100 ${showAll ? "md:h-[505px]" : "md:h-[325px]"}`} src={`https://www.youtube.com/embed/${item.key}`}></iframe>
                                </SwiperSlide>
                            ))
                        ) :
                            <Loader />)
                }
                {
                    !showAll && video.length > 2 &&
                    <SwiperSlide className='mt-auto mb-auto' >
                        <Link to={`/details/${id}/${type}/videos`}>
                            <button className='font-medium text-xl underline cursor-pointer'>
                                More Videos
                                <span><i className="fa-solid ms-1 mt-5 text-[17px] fa-arrow-right"></i></span>
                            </button>
                        </Link>
                    </SwiperSlide>
                }

            </Swiper>

        </div>
    )
}

export default FetchVideos
