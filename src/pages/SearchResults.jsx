import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import options from '../Other/UrlHeader';
import TrendingMovie from '../compnents/TrendingMovie';
import Loader from '../compnents/Loader';
import Title from '../compnents/Title';


const SearchResults = () => {
    const [results, setResults] = useState();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    useEffect(() => {
        const handleSearch = () => {
            const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=true&language=en-US&page=1`;
            fetch(url, options)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Response is not okay")
                    }
                    return res.json()
                })
                .then((json) => {
                   const res = json.results.filter((movie) => movie.backdrop_path !== null
                    )
                setResults(res);
                })
                .catch(err => console.error(err));
        }
        handleSearch();
    }, [query]);
    return (
        <div className='md:px-20 px-5 pb-20 pt-7 text-white bg-black'>
            <Title text="Search Results"/>
            <div className='grid grid-cols-2 md:grid-cols-6 md:justify-center mt-9 gap-5 '>
                {
                    results ? (
                        results.map((movie) => (
                            <TrendingMovie type={movie.media_type} id={movie.id} key={movie.id} movie={movie} videoUrl={1} />
                        ))) :
                        <Loader/>
                }
            </div>
        </div>
    )
}

export default SearchResults
