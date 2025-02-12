import React, { useEffect, useState } from 'react'
import options from '../Other/UrlHeader';
import Loader from '../compnents/Loader';
import TrendingMovie from '../compnents/TrendingMovie';
import Title from '../compnents/Title';
import { useNavigate } from 'react-router-dom';

const UpComingMovie = () => {
    const [upComingMovie, setUpComingMovie] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageNo}`;
        const fetchTopRatedMovies = async () => {
            try {
                const res = await fetch(url, options);
                const data = await res.json();
                setUpComingMovie((prevData) => {
                    return [...prevData, ...data.results];
                })
            } catch (err) {
                console.error('Error fetching images:', err);
            }
        };
        fetchTopRatedMovies();
    }, [pageNo]);

    // if (!upComingMovie) return <Loader />
    if (upComingMovie.length === 0) return <p><Loader/></p>

    return (
        <>
        <div className='py-5 bg-yellow-900'>
                <button onClick={() => navigate('/')} className='md:text-2xl text-xl cursor-pointer text-white px-5 font-medium'>
                    <span className='md:text-xl me-2'><i class="fa-solid fa-arrow-left"></i></span>Back to home</button>
            </div>
            <div className='bg-whte flex flex-col items-start justify-center pb-10 pt-5 px-3 text-white md:px-10 '>
                <div className='w-full'>
                </div>
                <div className='flex'>
                    <div className='md:w-[300px] md:h-100'></div>
                    <div className='grid md:grid-cols-5 flex-2 grid-cols-2 gap-4 md:gap-5  '>
                        {
                            upComingMovie.map((movie, i) => (
                                <TrendingMovie key={movie.id + i} movie={movie} type='movie' id={movie.id} />
                            ))
                        }
                        <button onClick={() => setPageNo((prevPageNo) => prevPageNo + 1)} className='bg-sky-500 col-span-full hover:bg-sky-600 cursor-pointer duration-150 text-lg py-2 rounded-3xl font-medium w-full'>Load More</button>
                    </div>
                </div>

            </div>
        </>

    )
}

export default UpComingMovie