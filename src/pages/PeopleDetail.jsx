import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css/scrollbar';
import options from '../Other/UrlHeader';
import Loader from '../compnents/Loader';

const PeopleDetail = () => {
    const [personalInfo, setPersonalInfo] = useState(null);
    const [credits, setCredits] = useState(null);
    const [topMovies, setTopMovies] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    // console.log(credits)
    useEffect(() => {
        const fetchPersonalInfo = async () => {
            const url = `https://api.themoviedb.org/3/person/${id}?language=en-US`;
            try {
                const res = await fetch(url, options);
                if (!res.ok) throw new Error("Failed to fetch data.");
                const data = await res.json();
                setPersonalInfo(data);
            } catch (err) {
                console.error("Error fetching personal information:", err);
                setError("Failed to load personal information.");
            }
        };
        const fetchCredits = async () => {
            const url = `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`;
            try {
                const res = await fetch(url, options);
                if (!res.ok) throw new Error("Failed to fetch data.");
                const data = await res.json();
                const allCredits = [...data.cast, ...data.crew];
                const movies = allCredits.filter(item => item.media_type === 'movie');
                setCredits(data);
                const topRankingMovie = movies.sort((a, b) => {
                    a.vote_average !== b.vote_average ? b.vote_average - a.vote_average : b.popularity - a.popularity
                })
                const top10Movies = topRankingMovie.slice(0, 10);
                setTopMovies(top10Movies)
            } catch (err) {
                console.error("Error fetching personal information:", err);
                setError("Failed to load personal information.");
            }
        };
        fetchCredits();
        fetchPersonalInfo();
    }, [id]);

    if (error) {
        return <div className="text-white bg-black text-center pt-10">{error}</div>;
    }
    if (!personalInfo) {
        return <Loader />;
    }
    return (
        <div className="bg-white py-10 md:px-20 px-3 text-black">
            <div className="flex md:flex-row flex-col gap-6">
                <div >
                    <img
                        className="rounded-xl md:w-[300px] w-[200px] mx-auto"
                        src={
                            personalInfo.profile_path
                                ? `https://image.tmdb.org/t/p/w500${personalInfo.profile_path}`
                                : '/path/to/placeholder/image.jpg'
                        }
                        alt={personalInfo.name}

                    />
                    <h1 className='text-3xl font-bold text-center  py-3'>{personalInfo.name}</h1>

                    <h1 className="mt-5 text-2xl font-medium">Personal Info</h1>
                    <h3 className="text-lg mt-4 font-medium">Known for</h3>
                    <p className="text-gray-400">{personalInfo.known_for_department}</p>
                    {/* <h3 className="text-lg mt-4 font-medium">Known Credits</h3>
                    <p className="text-gray-400">{credits? credits.cast.length : null}</p> */}
                    <h3 className="text-lg mt-4 font-medium">Gender</h3>
                    <p className="text-gray-400">
                        {personalInfo.gender === 2
                            ? 'Male'
                            : personalInfo.gender === 1
                                ? 'Female'
                                : 'Other/Unspecified'}
                    </p>
                    <h3 className="text-lg mt-4 font-medium">Birthday</h3>
                    <p className="text-gray-400">{personalInfo.birthday || 'N/A'}</p>
                    <h3 className="text-lg mt-4 font-medium">Also Known As</h3>
                    <div className="text-gray-400">
                        {personalInfo.also_known_as?.length > 0 ? (
                            personalInfo.also_known_as.map((name, index) => (
                                <p key={index}>{name}</p>
                            ))
                        ) : (
                            <p>N/A</p>
                        )}
                    </div>
                </div>
                <div className='md:w-2/3 flex-1  '>
                    <h2 className="text-xl font-medium"> Biography</h2>
                    <p className='mt-3 text-justify'>{personalInfo.biography}</p>

                    <h2 className="text-xl my-5 font-medium">Known For</h2>

                    <Swiper
                        modules={[Scrollbar]}
                        slidesPerView={2}
                        spaceBetween={15}
                        cssMode={true}
                        scrollbar={{
                            hide: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 6,
                                spaceBetween: 20,
                            }
                        }}
                    >
                        {
                            topMovies?.map((item) => (
                                <SwiperSlide key={item.id} >
                                    <Link to={`/movie/${item.id}`}>
                                        <div className="mb-7 flex flex-col items-center">
                                            <img
                                                src={
                                                    item.poster_path
                                                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                        : `https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png`
                                                }
                                                className="rounded-xl mb-4 w-48 h-47 object-cover"
                                                alt={item.title || 'Movie Poster'}
                                            />
                                            <p className="text-sm font-medium text-center">
                                                {item.title || item.name}
                                            </p>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default PeopleDetail;
