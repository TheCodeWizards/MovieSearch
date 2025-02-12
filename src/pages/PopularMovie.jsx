import React, { useEffect, useState } from 'react';
import options from '../Other/UrlHeader';
import Loader from '../compnents/Loader';
import TrendingMovie from '../compnents/TrendingMovie';
import SortMovies from '../compnents/SortMovies';
import { useNavigate } from 'react-router-dom';

const PopularMovie = () => {
    const [popularMovie, setPopularMovie] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('popularity.desc'); // Sorting state

    const increasePageNo = () => {
        setPageNo((prevPageNo) => prevPageNo + 1);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNo}&sort_by=${sortBy}`;
            try {
                const res = await fetch(url, options);
                const data = await res.json();
                setPopularMovie(data.results); // Replace existing movies when sorting changes
            } catch (err) {
                console.error('Error fetching movies:', err);
            }
        };
        fetchMovies();
    }, [pageNo, sortBy]); // Refetch when sorting option changes
    if (!popularMovie) return <Loader />
    if (popularMovie.length === 0) return <Loader />;

    return (
        <>
            <div className='py-5 bg-yellow-900'>
                <button onClick={() => navigate('/')} className='md:text-2xl text-xl cursor-pointer text-white px-5 font-medium'>
                    <span className='md:text-xl me-2'><i class="fa-solid fa-arrow-left"></i></span>Back to home</button>
            </div>
            <div className='bg-white flex items-start justify-center pb-10 pt-5 px-3 text-white md:px-10 '>
                {/* <div className='md:w-[300px] mt-4 h-100'>
                    <SortMovies setSortBy={setSortBy} /> 
                </div> */}
                <div className='grid md:grid-cols-5 grid-cols-2 gap-4 md:gap-5'>
                    {popularMovie.map((movie, i) => (
                        <TrendingMovie key={movie.id + Math.random()} movie={movie} type='movie' id={movie.id} />
                    ))}
                    <button
                        onClick={increasePageNo}
                        className='bg-sky-500 col-span-full hover:bg-sky-600 cursor-pointer duration-150 text-lg py-2 rounded-3xl font-medium w-full'>
                        Load More
                    </button>
                </div>
            </div>
        </>

    );
};

export default PopularMovie;
