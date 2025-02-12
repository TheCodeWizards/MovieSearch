import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import options from '../../Other/UrlHeader';
import Loader from '../Loader';
import ReviewCard from '../MovieDetailsPage/ReviewCard'
const Review = ({ showAll }) => {
    const [review, setReview] = useState();
    const { id, type } = useParams();
    const checkType = () => {
        if (type === 'movie')
            return `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
        else
            return `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1;`
    }
    useEffect(() => {
        const fetchReview = async () => {
            const url = checkType();
            try {
                const res = await fetch(url, options);
                if (!res.ok) throw new Error("Failed to fetch data.");
                const data = await res.json();
                setReview(data.results);
            }
            catch (err) {
                console.error('Error fetching trailer:', err);
                return null;
            }
        };
        fetchReview();
    }, [id,type]);
    if (!review)
        return <Loader />;
    if(review.length==0)
        return <p className='text-xl'>N/A</p>
    return (
        <div className='py-1 '>
            {showAll ?
                (review.slice(0, 1).map((item) => (
                    <ReviewCard key={item.id} review={item} />
                )))
                :
                (
                    review.map((item) => (
                        <ReviewCard key={item.id} review={item} />
                    )))
            }
                {
                    showAll?
                    <Link to={`review`}>
                <button className='mt-5 text-xl  font-medium cursor-pointer hover:underline'>Read all the Reviews</button>
            </Link>
            :""
                }    
            
        </div>
    )
}

export default Review;