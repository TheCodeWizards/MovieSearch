import React from 'react'
import { Link } from 'react-router-dom'
import { useLoadingBar } from "react-top-loading-bar";
const WatchListMovie = ({ id,movie, setChange }) => {

    const api_key = " eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTA1NTM5MzZkYjg5NzYyZmRiYmEwOTFkYzdhODEwNCIsIm5iZiI6MTczNzYxNjA0NC44OTQsInN1YiI6IjY3OTFlYWFjOGQxZGRkOTMwYWI1NzMzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._J3UVKX-CGThIw2zyG6bEWIfNLEDtB4Oapau9BESVa0"
    const { start, complete } = useLoadingBar({
        color: "#fdc700",
        height: 4,
    });
    const handleSavedMovies = async () => {
        start();
        const url = `https://api.themoviedb.org/3/account/21769619/watchlist`;
        const body = {
            media_type: "movie", // "movie" or "tv"
            media_id: id,
            watchlist: false, // Toggle watchlist state
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${api_key}`, // Use env variable for security
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (data.success) {
                complete();
                setChange((prev) => !prev); // Toggle change state on success
                const savedMovies = JSON.parse(localStorage.getItem("watchlist")) || [];
                const removeItem = savedMovies.filter(movieId => movieId != movie.id);
                localStorage.setItem("watchlist", JSON.stringify(removeItem))
            }
        } catch (err) {
            console.error("Error adding to watchlist:", err);
        }
    };
    return (
        <div className='p-3'>
            <div className='flex gap-5 items-center shadow-[0px_0px_5px_rgba(211,211,211,0.7),_0px_0px_5px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden'>
                {/* MOVIE POSTER */}
                <Link
                    className="cursor-pointer hover:brightness-[90%] " to={`/movie/${movie.id}`}>
                    <div className='' style={{ width: "140px", }}>
                        <img
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : `https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png`
                            }
                            className='object-cover object-center'

                            alt={movie.title || "No Image"}
                        />
                    </div>
                </Link>

                <div>
                    <Link
                        to={`/movie/${movie.id}`}
                        className="truncate text-2xl mt-3 font-medium block "
                    >
                        {/* {index ? <span>{index}. </span> : null} */}
                        <span className='hover:underline '>{movie.title || movie.name}</span>
                        <span className='text-gray-500 ms-1 text-xl font-normal'>({movie.original_title})</span>
                    </Link>
                    <div className='flex items-center gap-3'>
                        <p className='text-gray-500'><span className='text-gray-100'>Released Date : </span>{movie.release_date}</p>
                        <p className='text-gray-500 text-[15px] '><span className='text-gray-100 text-[15px] '>Rating : </span>
                            <span className='text-gray-100 text-[15px] '> {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>/10</p>
                    </div>
                    <p className='mt-4 text-gray-100'>{movie.overview}</p>
                    <button onClick={handleSavedMovies} className='text-gray-500 cursor-pointer group my-4'>
                        <i className="fa-solid text-[12px]  duration-100 px-2.5 py-2 text-gray-500 group-hover:bg-gray-300 group-hover:border-gray-300 border-3 rounded-full fa-x"></i>
                        <span className='ms-1'>Remove</span></button>
                </div>
            </div>
        </div>
    )
}

export default WatchListMovie