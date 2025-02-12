import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import options from '../Other/UrlHeader';
import WatchListMovie from './WatchListMovie';
import { LoadingBarContainer } from "react-top-loading-bar";

const WatchlistPage = () => {
  const [movie, setMovie] = useState([]);
  const [change, setChange] = useState(true);
  const [type, setType] = useState("movie");

  useEffect(() => {
    const fetchWatchList = async () => {
      const url = `https://api.themoviedb.org/3/account/21769619/watchlist/${type}?language=en-US&page=1&sort_by=created_at.desc`;

      // const url = `https://api.themoviedb.org/3/account/21769619/watchlist/${type}?language=en-US&page=1&sort_by=created_at.desc`;
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setMovie(data.results || []);
      } catch (err) {
        console.error('Error fetching watchlist:', err);
      }
    };
    fetchWatchList();
  }, [change, type]); // Added `type` dependency

  console.log("Watchlist movies:", movie);

  if (!movie) return <Loader />;
  if (movie.length === 0) 
    return <div className='flex min-h-screen justify-center font-medium bg-black text-4xl pt-20 text-white'>No Movies</div>;

  return (
    <div className='bg-black text-white min-h-screen pb-20 pt-5 px-20'>
      <LoadingBarContainer> {/* Wrap entire list */}
        {movie.map((movie) => (
          <WatchListMovie key={movie.id} id={movie.id} setChange={setChange} type="movie" movie={movie} />
        ))}
      </LoadingBarContainer>
    </div>
  );
};

export default WatchlistPage;
