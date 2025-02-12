import React, { useEffect, useState } from 'react'
import TrendingMovie from '../compnents/TrendingMovie';
import options from '../Other/UrlHeader';
import Loader from '../compnents/Loader';
import { useNavigate } from 'react-router-dom';

const TopRatedTV = () => {
    const [topRatedSeries, setTopRatedSeries] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const url = `https://api.themoviedb.org/3//tv/top_rated?language=en-US&page=${pageNo}`;
        const fetchTopRatedSeries = async () => {
            try {
                const res = await fetch(url, options);
                const data = await res.json();
                setTopRatedSeries((prevData) => [...prevData, ...data.results]);
            } catch (err) {
                console.error('Error fetching images:', err);
            }
        };
        fetchTopRatedSeries();
    }, [pageNo]);

    if (topRatedSeries.length === 0) return <Loader />


    return (
        <>
        <div className='py-5 bg-yellow-900'>
                <button onClick={() => navigate('/')} className='md:text-2xl text-xl cursor-pointer text-white px-5 font-medium'>
                    <span className='md:text-xl me-2'><i class="fa-solid fa-arrow-left"></i></span>Back to home</button>
            </div>
        <div className='bg-white flex items-start justify-center pb-10 pt-5 px-3 text-white md:px-10 '>
            <div className='md:w-[300px] h-100'></div>
            <div className='grid md:grid-cols-5 grid-cols-2 gap-4 md:gap-5'>
                {
                    topRatedSeries.map((movie, i) => (
                        <TrendingMovie key={movie.id + i} movie={movie} type='tv' id={movie.id} />
                    ))
                }
                <button onClick={() => setPageNo((prevPageNo) => prevPageNo + 1)} className='bg-sky-500 col-span-full hover:bg-sky-600 cursor-pointer duration-150 text-lg py-2 rounded-3xl font-medium w-full'>Load More</button>
            </div>
        </div>
        </>
    )
}

export default TopRatedTV