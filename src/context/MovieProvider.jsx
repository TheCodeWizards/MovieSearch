import { createContext, useEffect, useState, useMemo } from "react";
import options from "../Other/UrlHeader";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [trending, setTrending] = useState([]);
    const [trendingPeople, setTrendingPeople] = useState([]);
    const [upComingMovie, setUpComingMovie] = useState([]);
    const [popularSeries, setpopularSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [savedMovie, setSavedMovie] = useState();
    const fetchData = async (url,setState)=>{
        setIsLoading(true);
        try {
            const res = await fetch(url, options);
            const data = await res.json();
            setState(data.results);
        } catch (err) {
            console.error("Error fetching trending movies:", err);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        const fetchTrendingMovies = () => {
            const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US&page=1";
            fetchData(url,setTrending)
        };
        const fetchTrendingPeople = ()=>{
            const url = 'https://api.themoviedb.org/3/trending/person/week?language=en-US';
            fetchData(url,setTrendingPeople)
        }
        const fetchUpComingMovie = ()=>{
            const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
            fetchData(url,setUpComingMovie)
        }
        const fetchPopularSeries = ()=>{
            const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
            fetchData(url,setpopularSeries)
        }
        fetchTrendingMovies();
        fetchTrendingPeople();
        fetchUpComingMovie();
        fetchPopularSeries();
    }, []);

    const contextValue = useMemo(() => 
        ({ trending, isLoading,trendingPeople ,upComingMovie,popularSeries,setSavedMovie,savedMovie}), [trending, isLoading,trendingPeople,upComingMovie,popularSeries,setSavedMovie,savedMovie]);

    return <MovieContext.Provider value={contextValue}>{children}</MovieContext.Provider>;
};

export default MovieProvider;
