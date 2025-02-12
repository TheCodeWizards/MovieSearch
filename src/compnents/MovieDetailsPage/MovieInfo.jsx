import React from 'react'

const MovieInfo = ({ movie }) => {
    const chekLang = () => {
        const languageCode = "en"
        if (movie.original_language)
            return new Intl.DisplayNames([movie.original_language], { type: 'language' }).of(languageCode);
        else return null;
    }
    return (
        <div>
            <a className='text-lg' target='blank' title='visit home page' href={movie.homepage}><i className="fa-solid fa-house"></i></a>
            <h1 className="text-lg mt-5 font-medium">Facts</h1>
            <h1 className="text-lg mt-2 font-medium">Status</h1>
            <p className='text-[#7b7b7b]'>{movie.status}</p>
            <h1 className="text-lg mt-5 font-medium">Original Name</h1>
            <p className='text-[#7b7b7b]'>{movie.original_name || movie.original_title}</p>
            {movie.networks ?
                <>
                    <h1 className="text-lg mt-5 font-medium">Networks</h1>
                    <img style={{ height: "60px" }} className='mt-3 bg-white rounded p-3' src={`https://image.tmdb.org/t/p/w500${movie.networks[0].logo_path}`} />
                </> :
                ""}
            {movie.type ?
                <>
                    <h1 className="text-lg mt-5 font-medium">Type</h1>
                    <p className='text-[#7b7b7b]'>{movie.type}</p>
                </> :
                ""}
            <h1 className="text-lg mt-5 font-medium">Original Language</h1>
            <p className='text-[#7b7b7b]'>{chekLang()}</p>

            {
                movie.budget ?
                    <>
                        <h1 className="text-lg mt-5 font-medium">Budget</h1>
                        <p className='text-[#7b7b7b]'>${movie.budget ? movie.budget.toLocaleString() : "N/A"}</p>
                    </>
                    : ""
            }
            {
                movie.revenue ?
                    <>
                        <h1 className="text-lg mt-5 font-medium">Revenue</h1>
                        <p className='text-[#7b7b7b]'>${movie.revenue ? (movie.revenue).toLocaleString() : "N/A"}</p>
                    </>
                    : ""
            }
            {
                movie.number_of_seasons ?
                    <>
                        <h1 className="text-lg mt-5 font-medium">Total Seasons</h1>
                        <p className='text-[#7b7b7b]'>{movie.number_of_seasons}</p>
                    </>
                    : ""
            }
             {
                movie.number_of_episodes ?
                    <>
                        <h1 className="text-lg mt-5 font-medium">Total Episodes</h1>
                        <p className='text-[#7b7b7b]'>{movie.number_of_episodes}</p>
                    </>
                    : ""
            }
           
        </div>
    )
}

export default MovieInfo