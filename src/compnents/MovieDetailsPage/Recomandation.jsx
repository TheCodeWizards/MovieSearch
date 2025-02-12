import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import options from '../../Other/UrlHeader';
import { Scrollbar,Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Recomandation = () => {
    const [recommendations, setRecommendations] = useState();
    const { id, type } = useParams();
    useEffect(() => {
        const fetchMovieImages = async () => {
            const url = `https://api.themoviedb.org/3/${type}/${id}/recommendations?language=en-US&page=1`;
            try {
                const res = await fetch(url, options);
                const data = await res.json();
                setRecommendations(data.results);
            } catch (err) {
                console.error('Error fetching images:', err);
            }
        };
        fetchMovieImages();
    }, [id, type]);
    // console.log(recommendations)
    if (!recommendations)
        return;
    return (
        <div>
            <Swiper
                modules={[Scrollbar, Mousewheel]}
                spaceBetween={7}
                mousewheel={{ enabled: true }}
                cssMode={true}
                scrollbar={{
                    enabled: true,
                    draggable: true,
                    dragSize: 100,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    }
                }}
            >
                {recommendations.map((movie) => (
                    <SwiperSlide className='my-3' key={movie.id} >
                        <Link to={`/${type}/${movie.id}`}>
                            <img className='hover:brightness-[90%] duration-100 rounded-lg object-cover' src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
                            <div className='flex mt-2 px-1 justify-between'>
                                <h6 className='font-medium text-sm text-ellipsis'>{movie.title || movie.name}</h6>
                                <p>{movie.vote_average ? Math.round(movie.vote_average * 10) + "%" : "N/A"}</p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Recomandation