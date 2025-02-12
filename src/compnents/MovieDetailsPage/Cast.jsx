import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import options from '../../Other/UrlHeader';
import CastCard from './CastCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Loader from '../Loader';

const Cast = () => {
  const { id, type } = useParams();
  const [cast, setCast] = useState([]);

  // Determine the correct endpoint based on type
  const checkType = () => {
    if (type === 'movie') {
      return `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    } else {
      return `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;
    }
  };

  useEffect(() => {
    const fetchCast = async () => {
      const url = checkType();
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        const filterCast = data.cast.filter((item) => {
          if (item.profile_path !== null) return item;
          else return null;
        });
        setCast(filterCast || []);
      } catch (err) {
        console.error('Error fetching cast:', err);
      }
    };
    fetchCast();
  }, [id, type]);
  if (!cast) {
    return <Loader/>
  }
  if(cast.length==0)
    return <p>No Information </p>

  const handleSlideChange = (swiper) => {
    if (swiper.activeIndex === cast.length - swiper.params.slidesPerView) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  return (
      <>
        <Swiper
          modules={[Scrollbar]}
          spaceBetween={10}
          slidesPerView={2}
          cssMode={true}
          scrollbar={{
            hide: false,
            enabled:true
          }}
          onSlideChange={handleSlideChange} // Track slide change
          // when width is greater than or equal to >= 640px 
          breakpoints={{
            640: {
                slidesPerView: 7,
                spaceBetween: 10,
            }
          }
        }
        >
          <>
            {cast.map((item) => (
              <SwiperSlide className='my-3' key={item.id}>
                <Link to={`/person/${item.id}/${item.name}`}>
                  <CastCard cast={item} />
                </Link>
              </SwiperSlide>
              ))}
          <SwiperSlide className="flex mt-25 mb-auto items-center justify-center ">
            <Link to={`/${type}/${id}/cast`} >
              <button className="px-3 py-2 duration-400 font-medium cursor-pointer text-lg rounded-full  hover:underline">
                View More <span><i className="fa-solid ms-1 text-[14px] fa-arrow-right"></i></span>
              </button>
            </Link>
          </SwiperSlide>
        </>
      </Swiper>
    </>
  );
};

export default Cast;
