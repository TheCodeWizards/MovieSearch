import React, { useRef, useState } from 'react';

const SortMovies = ({ setSortBy }) => {
    const val = useRef('popularity.desc');
    const [dropDown, setDropdown] = useState(false);

    const toggleDropDown = () => {
        setDropdown((prev) => !prev);
    };

    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        setSortBy(selectedValue); // Update sorting state in parent
    };

    return (
        <div>
            <button 
                onClick={toggleDropDown} 
                className='bg-white text-black font-medium text-lg text-left px-2 rounded w-full cursor-pointer py-1 mt-4'>
                Sort
            </button>
            {dropDown && (
                <select
                    ref={val}
                    className='cursor-pointer d-block rounded bg-[#1a1a1a] px-2 mt-2 w-full py-1'
                    onChange={handleSortChange} // Handle dropdown change
                >
                    <option value="popularity.desc">Popularity Descending</option>
                    <option value="popularity.asc">Popularity Ascending</option>
                    <option value="vote_average.desc">Rating Descending</option>
                    <option value="vote_average.asc">Rating Ascending</option>
                    <option value="title.asc">Title (A-Z)</option>
                    <option value="title.desc">Title (Z-A)</option>
                </select>
            )}
        </div>
    );
};

export default SortMovies;
