import React, { useEffect, useState } from 'react'
import options from '../Other/UrlHeader';
import Loader from '../compnents/Loader';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../compnents/Title';
const PopularPeople = () => {
    const [popularPeople, setPopularPeople] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const navigate = useNavigate();
    
    useEffect(() => {
        const url = `https://api.themoviedb.org/3//person/popular?language=en-US&page=${pageNo}`;
        const fetchPopularPeople = async () => {
            try {
                const res = await fetch(url, options);
                const data = await res.json();
                setPopularPeople((prevData) => [...prevData, ...data.results]);
            } catch (err) {
                console.error('Error fetching images:', err);
            }
        };
        fetchPopularPeople();
    }, [pageNo]);

    if (!popularPeople) return <Loader />
    if (popularPeople.length === 0) return <p>No movies</p>
    return (
        <>
            <div className='py-5 bg-yellow-900'>
                <button onClick={() => navigate('/')} className='md:text-2xl text-xl cursor-pointer text-white px-5 font-medium'>
                    <span className='md:text-xl me-2'><i class="fa-solid fa-arrow-left"></i></span>Back to home</button>
            </div>
            <div className='flex items-start justify-center bg-white pb-10 pt-5 px-5 text-black md:px-10   '>

                <div className='md:w-[300px] h-100'></div>
                <div className='grid md:grid-cols-5 grid-cols-2 gap-5'>
                    {
                        popularPeople.map((people, i) => (
                            <Link to={`/person/${people.id}/${people.name}`}>
                                <div className='flex flex-col gap-4 hover:brightness-[90%] hover:underline items-center'>
                                    <img src={`https://image.tmdb.org/t/p/w500${people.profile_path}`} className='rounded-full object-cover object-center' style={{ width: '180px', height: '180px' }} alt="" />
                                    <p className='text-black md:text-lg font-medium'><span className='text-[16px] text-gray-500'>{i + 1}.</span> {people.name}</p>
                                </div>
                            </Link>
                        ))
                    }
                    <button onClick={() => setPageNo((prevPageNo) => prevPageNo + 1)} className='bg-sky-500 col-span-full hover:bg-sky-600 cursor-pointer duration-150 text-lg py-2 rounded-3xl font-medium w-full'>Load More</button>
                </div>
            </div>
        </>
    )
}

export default PopularPeople