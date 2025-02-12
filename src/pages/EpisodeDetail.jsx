import React, { useEffect, useState } from 'react'
import options from '../Other/UrlHeader';
import { useParams } from 'react-router-dom';
import Loader from '../compnents/Loader';

const EpisodeDetail = () => {
    const [episode,setEpisode] = useState();
    const {id} = useParams();
    useEffect(() => {
        const fetchMovieDetails = async () => {
            const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
            try {
                const res = await fetch(url, options);
                if (!res.ok) throw new Error("Failed to fetch data.");
                const data = await res.json();
                setEpisode(data.seasons);
            }
            catch (err) {
                console.error('Error fetching trailer:', err);
                return null;
            }
        }
        fetchMovieDetails();
    }, [id]);
    if(!episode){
        return <Loader/>
    }
    console.log(episode)
  return (
    <div className='bg-black text-white px-20'>
                <div className=''>

        {
            episode.map((ep)=>(
                <div className="flex">                  
                <img src={`https://image.tmdb.org/t/p/w500${ep.poster_path}`} style={{width:"120px"}} alt="" />
                <p>{ep.name}</p>
                </div>
  
            ))
        }
                </div>

      
    </div>
  )
}

export default EpisodeDetail
