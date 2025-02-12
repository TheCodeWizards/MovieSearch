import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import Loader from '../Loader';
import options from '../../Other/UrlHeader';
import 'swiper/css';
import 'swiper/css/navigation';

const FetchImages = ({ showAll }) => {
    const { id, type } = useParams();
    const [images, setImages] = useState(null); 

    const checkType = () => {
        return type === 'movie'
            ? `https://api.themoviedb.org/3/movie/${id}/images`
            : `https://api.themoviedb.org/3/tv/${id}/images`;
    };

    useEffect(() => {
        const fetchMovieImages = async () => {
            const url = checkType();
            try {
                const res = await fetch(url, options);
                const data = await res.json();
                setImages(data);
            } catch (err) {
                console.error('Error fetching images:', err);
            }
        };
        fetchMovieImages();
    }, [id, type]);

    if (!images) return <Loader />; 
    if (images.backdrops.length == 0) return <p className='text-xl'>No Images</p>

    return (
        <div className=''>
            <Swiper
                modules={[Scrollbar,Navigation]}
                spaceBetween={10}
                slidesPerView={images.backdrops?.length > 1 ? 6 : 1}
                scrollbar={{
                    enabled: true,
                    draggable: true,
                    dragSize: 100,
                }}
                cssMode={true}
                breakpoints={{
                    300: { slidesPerView: 1 }, // Small screens
                    640: { slidesPerView: 3 }, // Tablets
                    768: { slidesPerView: 4 }, // Medium screens
                    1024: { slidesPerView: 4 }, // Large screens
                }}
            >
                {showAll ? (
                    <>
                        {images.backdrops?.map((item, i) => (
                            <SwiperSlide key={i}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                                    className='w-full mb-5 rounded-xl object-cover md:h-full'
                                    alt="Poster"
                                />
                            </SwiperSlide>
                        ))}
                        {images.posters?.map((item, i) => (
                            <SwiperSlide key={`backdrop-${i}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                                    className='w-full rounded-xl object-cover h-[0%]'
                                    alt="Backdrop"
                                />
                            </SwiperSlide>
                        ))}
                    </>
                ) : (
                    images.backdrops?.slice(0, 8).map((item, i) => (
                        <SwiperSlide className='my-3' key={i}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                                className='w-full mb-5 rounded-xl object-cover h-[230px]     '
                                alt="Poster"
                            />
                        </SwiperSlide>
                    ))
                )}

                {!showAll &&  images.length>2 &&(
                    <SwiperSlide className='mt-auto   mb-auto'>
                        <Link to={`/details/${id}/${type}/images`}>
                            <button className='text-yellow-400 hover:text-yellow-500 font-medium text-xl underline cursor-pointer'>
                                More Images
                                <span><i className="fa-solid ms-1 mt-5 text-[17px] fa-arrow-right"></i></span>
                            </button>
                        </Link>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

export default FetchImages;
