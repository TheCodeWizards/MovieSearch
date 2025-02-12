import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import options from "../Other/UrlHeader"; 


const TrendingMovie = ({ type, id, movie, index }) => {
  const [temp, setTemp] = useState(true);
  const [saved, setSaved] = useState(false); // Default to not saved
  const api_key = " eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTA1NTM5MzZkYjg5NzYyZmRiYmEwOTFkYzdhODEwNCIsIm5iZiI6MTczNzYxNjA0NC44OTQsInN1YiI6IjY3OTFlYWFjOGQxZGRkOTMwYWI1NzMzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._J3UVKX-CGThIw2zyG6bEWIfNLEDtB4Oapau9BESVa0"
  // Fetch movie trailer
  const fetchTrailer = async () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        setTemp(false);
        return;
      }
      const data = await res.json();
      const trailer = data.results.find(
        (item) => item.type === "Trailer" && item.name.includes("Official Trailer")
      );
      if (trailer) {
        window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
      } else {
        setTemp(false);
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
      setTemp(false);
    }
  };
  useEffect(()=>{
    const savedMovies = JSON.parse(localStorage.getItem("watchlist")) ||[];
    setSaved(savedMovies.includes(id));
  },[id]);
  // Add to Watchlist
  const handleSavedMovies = async () => {
    const url = `https://api.themoviedb.org/3/account/21769619/watchlist`;
    const body = {
      media_type: type, // "movie" or "tv"
      media_id: id,
      watchlist: !saved, // Toggle watchlist state
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_key}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {

        setSaved((prev)=>{
          const newState = !prev
          const savedMovies = JSON.parse(localStorage.getItem("watchlist")) ||[];

          if(newState)
            localStorage.setItem("watchlist",JSON.stringify([...savedMovies,id]));
          else {
            localStorage.setItem("watchlist",JSON.stringify(savedMovies.filter(movieId => movieId !== id)));
          }
          return newState;
        }); 
      }
    } catch (err) {
      console.error("Error adding to watchlist:", err);
    }
  };

  return (
    <div className="rounded-2xl group hover:scale overflow-hidden duration-150 bg-[#141414] relative  max-w-[230px]">
      
      <Link to={`/${type}/${id}`} className="font-medium">
      <div className="md:w-[230px] w-[180px] md:h-[300px] h-[200px]">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : `https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png`
          }
          cla
          // style={{ width: "230px", height: "300px" }}
          className="w-full h-full cursor-pointer hover:brightness-[90%] aspect-16/9 object-cover object-center"
          alt={movie.title || "No Image"}
        />
        </div>
      </Link>
{/*  */}
      <div className="px-3 md:py-4 py-3 flex flex-col justify-between">
        {/* Movie rating */}
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-[15px]">
            <span className="me-1">
              <i className="fa-solid fa-star"></i>
            </span>
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </p>
          {/* Add to wathclist */}
          <button
            onClick={handleSavedMovies}
            className="md:text-xl text-[14px] duration-100 cursor-pointer"
          >
            {saved ? (
              <i className="fa-solid duration-100 fa-bookmark"></i>
            ) : (
              <i className="fa-regular duration-100 fa-bookmark"></i>
            )}
          </button>
        </div>

        {/* Movie Title */}
        <Link
          to={`/${type}/${id}`}
          className="truncate group-hover:underline md:text-[16px] text-[14px] font-medium mt-4"
        >
          {index ? <span>{index}. </span> : null}
          {movie.title || movie.name}
        </Link>

        {/* Watch Options Button */}
        <button className="bg-yellow-500 duration-75 cursor-pointer hover:bg-yellow-600 mt-4 md:text-[16px] text-[13px] font-medium rounded-full md:py-2 py-1 md:mt-7">
          Watch Options
        </button>

        {/* Trailer Button */}
        {temp ? (
          <a
            onClick={fetchTrailer}
            className="text-center hover:underline text-yellow-400 duration-75 cursor-pointer text-[14px] md:text-[16px] font-medium py-2 mt-3"
          >
            <span className="text-sm">
              <i className="fa-solid fa-play pe-3"></i>
            </span>
            Trailer
          </a>
        ) : (
          <span className="text-center text-red-400 md:text-[16px] text-[14px] font-medium py-2 mt-3">
            Trailer is not available
          </span>
        )}
      </div>
    </div>
  );
};

export default TrendingMovie;
