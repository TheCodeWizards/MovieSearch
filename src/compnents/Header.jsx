import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [query, setQuery] = useState('');
    const [dropdown, setDropdown] = useState(null);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query.trim())}`);
            setQuery('');
        }
    };

    const toggleDropdown = (menu) => {
        setDropdown(dropdown === menu ? null : menu);
    };

    return (
        <div className='flex  items-center md:px-20 px-5 bg-black justify-between text-white py-5 relative '>
            <Link to='/'>
                <div>
                    <svg id="home_img" className="w-[65px] md:w-[90px] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 32" version="1.1"><g fill="#F5C518"><rect x="0" y="0" width="100%" height="100%" rx="4"></rect></g><g transform="translate(8.000000, 7.000000)" fill="#000000" fillRule="nonzero"><polygon points="0 18 5 18 5 0 0 0"></polygon><path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path></g></svg>
                </div>
            </Link>
            <button onClick={() => setShow(!show)} className='text-2xl duration-1000 text-left md:hidden'>
                {
                    show ?
                        <i class="fa-solid duration-1000 fa-x"></i>
                        :
                        <i className="fa-solid duration-1000 fa-bars"></i>
                }
            </button>

            <div className={`${show ? 'block' : 'hidden'} duration-150 md:border-t-0 border-t-2 border-lime-50 px-5 md:px-0 md:flex md:items-center md:gap-8 absolute md:relative top-full left-0 w-full md:w-auto bg-black md:bg-transparent py-3 md:py-0 z-50`}>
                <ul className='flex md:flex-row flex-col md:ms-3 md:items-center gap-3 md:gap-6 relative'>
                    {/* Movie Dropdown*/}
                    <li
                        className='text-[17px] shadow cursor-pointer font-medium  relative'
                        onClick={() => toggleDropdown('movie')}
                    >
                        Movie
                        {dropdown === 'movie' && (
                            <ul className='absolute py-1.5 text-[15px] overflow-hidden z-50 bg-white text-black rounded-lg shadow-lg mt-2 w-36'>
                                <Link to='/movie/popular'>
                                    <li className='px-4 py-1.5 duration-100 hover:bg-amber-300 cursor-pointer'>Popular</li>
                                </Link>
                                <Link to='/movie/upcoming'>
                                    <li className='px-4 py-1.5 duration-100 hover:bg-amber-300 cursor-pointer'>Up Coming</li>

                                </Link>
                                <Link to='/movie/top-rated'>
                                    <li className='px-4 py-1.5 duration-100 hover:bg-amber-300 cursor-pointer'>Top Rated</li>
                                </Link>
                            </ul>
                        )}
                        <span className='text-yellow-400 md:text-[15px] text-[13px]'>
                            {
                                dropdown === 'movie' ? <i className="fa-solid rotate-180 duration-100  fa-chevron-down"></i> :
                                    <i className="fa-solid   rotate-0 duration-100  fa-chevron-down"></i>
                            }
                        </span>
                    </li>
                    {/* Tv  DropDown*/}
                    <li
                        className='text-[17px] cursor-pointer font-medium relative'
                        onClick={() => toggleDropdown('tv')}
                    >
                        Tv Shows
                        {dropdown === 'tv' && (
                            <ul className='absolute text-[15px] py-1.5 overflow-hidden z-50 bg-white text-black rounded-lg shadow-lg mt-2 w-36'>
                                <Link to='/tv/popular'>
                                    <li className='px-5 py-1.5 duration-100 hover:bg-amber-300 cursor-pointer'>Popular</li>
                                </Link>
                                <Link to='/tv/airing-today'>
                                    <li className='px-5 py-1.5 duration-100 hover:bg-amber-300 cursor-pointer'>Air Today</li>
                                </Link>
                                <Link to='/tv/top-rated'>
                                    <li className='px-5 py-1.5 duration-100 hover:bg-amber-300 cursor-pointer'>Top Rated</li>
                                </Link>
                            </ul>
                        )}
                        <span className='text-yellow-400 md:text-[15px] text-[13px]'>
                            {
                                dropdown === 'tv' ? <i className="fa-solid  rotate-180 duration-100  fa-chevron-down"></i> :
                                    <i className="fa-solid rotate-0 duration-100  fa-chevron-down"></i>
                            }
                        </span>

                    </li>
                    {/* People DropDown */}
                    <li
                        className='group text-[17px]cursor-pointer font-medium relative active:text-yellow-400  cursor-pointer'
                        onClick={() => toggleDropdown('people')}
                    >
                        People
                        {dropdown === 'people' && (
                            <ul className='absolute md:text-[15px] text-[12px]  py-1.5 z-50 overflow-hidden bg-white text-black rounded-lg shadow-lg mt-2  md:w-36'>
                                <Link to='/people/popular'>
                                    <li className='px-4 py-1.5  duration-100 hover:bg-amber-300 cursor-pointer'>Popular People</li>
                                </Link>
                            </ul>
                        )}
                        <span className='text-yellow-400 md:text-[15px] text-[13px]'>
                            {
                                dropdown === 'people' ? <i className="fa-solid rotate-180 duration-100  fa-chevron-down"></i> :
                                    <i className="fa-solid  rotate-0 duration-100  fa-chevron-down"></i>
                            }
                        </span>
                    </li>
                </ul>
                <div className='border-2 relative md:mt-0 mt-3 px-4 md:rounded-full md:w-[700px] border-white'>
                    <form onSubmit={handleSearch} className='flex justify-center items-center'>
                        <input
                            type='text'
                            placeholder='Search'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className='px-2 outline-none py-1.5 w-full bg-transparent text-white'
                        />
                        <button type='submit' className='px-3 py-1.5 cursor-pointer'>
                            <i className='fa-solid fa-magnifying-glass'></i>
                        </button>
                    </form>
                </div>
                <div className='md:flex md:mt-0  hidden my-4 items-center justify-center'>
                    <button className='bg-yellow-400 font-medium md:text-[17px] text-sm cursor-pointer duration-75 hover:bg-yellow-500 px-4 py-1.5 rounded-lg '>Sign in</button>
                    <Link to='/watchlist'>
                        <button className='ms-2 px-3 py-1.5 rounded-2xl font-medium text-sm md:text-[17px] cursor-pointer hover:underline '>Watch list</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
