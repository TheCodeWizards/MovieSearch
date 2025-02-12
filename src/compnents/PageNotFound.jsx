import React from 'react'

const PageNotFound = () => {
  return (
    <div>
      <p className="text-white">No found</p>
      <div className='text-white  bg-black' >
                        <div
                            // style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})` }}
                            className='py-10 px-20 moviedetail'>
                            {
                                type === "movie" ? null :
                                    <Link to={`/episode-details/${id}`}>
                                        <h1 className='text-lg head inline-block font-medium duration-300 hover:underline  text-white mb-3'>Episode Guide
                                            &nbsp;<span className='font-normal  text-[#9a9999]'> {movie.number_of_episodes ?
                                                movie.number_of_episodes :
                                                null}
                                            </span>
                                            <span className='hover:text-yellow-400'><i className="fa-solid icon rotate-90 fa-chevron-up"></i></span>
                                        </h1>
                                    </Link>
                            }

                            <div className='flex justify-between items-center '>
                                <div className='flex items-center gap-3'>
                                    <p className='h-18 rounded w-3 bg-yellow-400'></p>
                                    <div>
                                        <h1 className='text-3xl font-medium underline'>{movie.original_title || movie.name}</h1>
                                        <p className='text-sm mt-1 text-[#9a9999]'>{movie.tagline}</p>
                                    </div>
                                </div>
                                <div className='me-10 flex gap-4 items-start'>
                                    <div>
                                        <p className='text-lg font-medium'>Rating</p>
                                        <p className='font-medium'><i className="fa-solid fa-star me-2"></i>
                                            {movie.vote_average ? movie.vote_average.toFixed(1) : null}
                                            <span className='text-[#9a9999]'>/10</span></p>
                                    </div>
                                    <div>
                                        <p className='text-lg font-medium'>Your Rating</p>
                                        <p className='font-medium text-center'>
                                            <i className="fa-solid fa-star me-2"></i>
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-lg font-medium'>Runtime</p>
                                        <p className='font-medium text-center text-[#9a9999]'>{movie.runtime ? movie.runtime + "min" : "N/A"}</p>
                                    </div>
                                </div>

                            </div>
                            <div className='flex items-stretch gap-2 mt-5'>
                                <a href={movie.homepage ? movie.homepage : ""} target='blank'>
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        className='rounded-3xl shadow-xl object-cover object-center'
                                        style={{ width: '240px' }}
                                        alt="" />
                                </a>

                                <iframe className='rounded-3xl' width="920" height="405"
                                    src={`https://www.youtube.com/embed/${videoUrl}`}>
                                </iframe>
                                <div className='flex flex-col gap-2 flex-1'>
                                    <Link to={`/details/${id}/${type}/videos`} className='h-1/2'>
                                        <div className='bg-[#242425] flex-col flex justify-center items-center p-10 rounded-3xl h-full'>
                                            <i className=" text-4xl fa-solid fa-video"></i>
                                            <p className='text-[15px]'>Video</p>
                                        </div>
                                    </Link>
                                    <Link to={`/details/${id}/${type}/images`} className='h-1/2'>
                                        <div className='cursor-pointer bg-[#242425] h-full p-10 flex-col flex justify-center items-center rounded-3xl '>
                                            <i className="text-4xl fa-solid fa-image"></i>
                                            <p className='text-[15px]'>Images</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex mt-8 gap-6">
                                <div className=' w-2/3'>
                                    <p className='text-white mb-6 text-[16px]'>{movie.overview}</p>
                                    <CastCrew />
                                </div>
                                <div className='border-l-[2px]  py-2 shadow shadow-gray-300  px-6 border-gray-600  w-full'>
                                    {/* <div className='flex justify-between items-center border-b-[1px] pb-2 border-gray-600 '>
                                        <h1 className='text-xl font-medium '>Realse Date</h1>
                                        <p className='text-gray-400'>{movie.release_date}</p>
                                    </div>
                                    <div className='flex justify-between  items-center  mt-4 border-b-[1px] pb-2 border-gray-600 '>
                                        <h1 className='text-lg font-medium '>Runtime</h1>
                                        <p className='text-gray-400'>{movie.runtime}M</p>
                                    </div>
                                    <div className='flex justify-between shadow-2xs shadow-gray-200 items-center  mt-4 border-b-[1px] pb-2 border-gray-600 '>
                                        <h1 className='text-lg font-medium '>Availiable in Languages</h1>
                                        <p className='text-gray-400'>{movie.spoken_languages.map((item)=>(
                                            <p>{item.name}</p>
                                        ))}</p>
                                    </div>
                                    <div className='flex justify-between shadow-2xs shadow-gray-200 items-center  mt-4 border-b-[1px] pb-2 border-gray-600 '>
                                        <h1 className='text-lg font-medium '>Status</h1>
                                        <p className='text-gray-400'>{movie.status}</p>
                                           
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    

            </div>
            <div
                className="relative  bg-cover px-25 bg-center bg-no-repeat"
                style={{
                    backgroundImage: movie.poster_path
                        ? `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://image.tmdb.org/t/p/original${movie.poster_path}')`
                        : "none",
                    minHeight: "80vh", // Ensures it takes enough vertical space
                    width: "100%",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                }}
            >
                <div className='py-15 flex gap-8  ' >
                    {/*  movie poster */}
                    
                   
                    <div className='text-white'>
                        {/* movie name */}
                        <Link to={``}>
                            <h1 className="text-4xl mb-2 hover:brightness-[80%] duration-300 font-bold">{movie.title || movie.name || "N/A"}
                                <span className='ms-3 text-gray-400 font-medium text-3xl'>({movie.release_date ? (movie.release_date).slice(0, 4) : ""}
                                    {movie.first_air_date ? (movie.first_air_date).slice(0, 4) : ""})
                                </span>
                            </h1>
                        </Link>
                        {/* small details about movies */}
                        <div className='flex  text-[#f9f8f7] gap-3'>
                            <span>{movie.release_date || movie.first_air_date}<i className="fa-solid ms-3 fa-circle text-[10px]"></i>
                            </span>
                            <span>{movie.genres?.map((item) => (
                                <span key={item.id}>{item.name}, </span>
                            ))}
                            </span>

                            {movie.runtime ? <span><i className="fa-solid me-3 fa-circle text-[10px]"></i>{movie.runtime}min</span> : ""}

                        </div>
                        {/* user score */}
                        <div className='mt-4 flex items-center gap-3'>
                            <span className='bg-amber-400 font-medium flex items-center justify-center  h-15 w-15 rounded-full'>
                                <span className='text-lg'>{movie.vote_average? Math.round(movie.vote_average * 10) +"%" : ""}</span>
                            </span>
                            <span className='font-medium text-lg'>User <br />Score</span>
                        </div>
                        {/* utitily buttons */}
                        <div className='flex items-center gap-3 mt-5'>
                            <a className='bg-sky-900 rounded-full px-4 py-3'>
                                <i className="fa-solid fa-list text-sm"></i>
                            </a>
                            <a className='bg-sky-900 rounded-full px-4 py-3'>
                                <i className="fa-solid fa-heart  text-sm"></i>
                            </a>
                            <a className='bg-sky-900 rounded-full px-5 py-3'>
                                <i className="fa-solid fa-bookmark text-sm"></i>
                            </a>
                            <a className='text-whte hover:text-gray-200 cursor-pointer font-medium text-lg rounded-full px-5 py-3'>
                                <i className="fa-solid fa-play me-2"></i>
                                Play trailer
                            </a>
                        </div>
                        </div>
                        {/* overview & tagline */}
                        <div className='mt-6'>
                            <p className='text-gray-400 font-medium'><i>{movie.tagline}</i></p>
                            <h1 className='text-xl mt-1 font-medium'>Overview</h1>
                            <p className='mt-2'>{movie.overview ? movie.overview :
                                <span className='font-medium'>N/A</span>}</p>
                        </div>
                    </div>
                </div>

    </div>
    
  )
}

export default PageNotFound
