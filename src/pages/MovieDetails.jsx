import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import options from '../Other/UrlHeader';
import Loader from '../compnents/Loader';
import Title from '../compnents/Title';
import MovieInfo from '../compnents/MovieDetailsPage/MovieInfo';
import Review from '../compnents/MovieDetailsPage/Review';
import FetchVideos from '../compnents/MovieDetailsPage/FetchVideos';
import FetchImages from '../compnents/MovieDetailsPage/FetchImages';
import Cast from '../compnents/MovieDetailsPage/Cast';
import Recomandation from '../compnents/MovieDetailsPage/Recomandation';

const MovieDetails = () => {
    const [movie, setMovieDetails] = useState(null);
    const { id, type } = useParams();

    const checkType = () => {
        return type === 'movie'
            ? `https://api.themoviedb.org/3/movie/${id}?language=en-US`
            : `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await fetch(checkType(), options);
                if (!res.ok) throw new Error("Failed to fetch data.");
                const data = await res.json();
                setMovieDetails(data);
            } catch (err) {
                console.error('Error fetching movie details:', err);
            }
        };
        fetchMovieDetails();
    }, [id, type]);

    if (!movie) return <Loader />;

    return (
        <div>
            {/* Movie Header */}
            <div
                className="relative px-5 md:px-12 py-10 flex flex-col items-center text-white bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: movie.poster_path
                        ? `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url('https://image.tmdb.org/t/p/original${movie.poster_path}')`
                        : "none",
                    minHeight: "80vh",
                }}
            >
                <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-6xl">
                    {/* Movie Poster */}
                    <img
                        className="rounded-xl object-cover w-[200px] h-[300px] md:w-[300px] md:h-[450px]"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title || movie.name}
                    />

                    {/* Movie Details */}
                    <div className='text-center md:text-left'>
                        <h1 className="text-2xl md:text-4xl font-bold">{movie.title || movie.name} ({movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4)})</h1>
                        <div className='mt-2 text-gray-300 text-sm md:text-lg'>
                            {movie.release_date || movie.first_air_date} | {movie.genres?.map((g) => g.name).join(', ')} | {movie.runtime && `${movie.runtime} min`}
                        </div>

                        {/* User Score */}
                        <div className='mt-4 flex items-center justify-center md:justify-start gap-3'>
                            <span className='bg-amber-400 text-black font-medium p-2 rounded-full w-12 h-12 flex items-center justify-center'>
                                {movie.vote_average ? Math.round(movie.vote_average * 10) + "%" : "N/A"}
                            </span>
                            <span className='font-medium text-lg'>User Score</span>
                        </div>

                        {/* Overview */}
                        <div className='mt-6'>
                            <p className='text-gray-400 italic'>{movie.tagline}</p>
                            <h2 className='text-xl font-semibold mt-2'>Overview</h2>
                            <p className='mt-2'>{movie.overview || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Details Section */}
            <div className='bg-white text-black md:gap-10 flex md:flex-row flex-col px-3 md:px-12 py-10'>
                <div className='max-w-6xl flex-auto'>
                        {/* Cast */}
                    <Title text="Cast" />
                    <Cast />

                    {/* Images */}
                    <div className='mt-7 md:mt-10'>
                        <Link to={`/${type}/${id}/images`}><Title text="Images" /></Link>
                        <FetchImages showAll={false} />
                    </div>

                    {/* Videos */}
                    <div className='mt-7 md:mt-10'>
                        <Link to={`/${type}/${id}/videos`}><Title text="Videos" /></Link>
                        <FetchVideos showAll={false} />
                    </div>

                    {/* Reviews */}
                    <div className='mt-7 md:mt-10'>
                        <Link to={`/${type}/${id}/review`}><Title text="Reviews" /></Link>
                        <Review showAll={true}  />
                    </div>

                    {/* Recommendations */}
                    <div className='mt-7 md:mt-10'>
                        <Title text="Recommendations" />
                        <Recomandation />
                    </div>
                </div>
            
                {/* Movie Info */}
                <div className='mt-7 md:mt-10'>
                    <MovieInfo movie={movie} />
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
