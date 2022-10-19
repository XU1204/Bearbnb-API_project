import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviewsOfCurrent } from "../../store/reviews";


function MyReviews () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    useEffect(() => {
        dispatch(getReviewsOfCurrent())
    },[dispatch]);

    const allReviews = useSelector(state => Object.values(state.reviewState))
    //console.log('all')
    if (!allReviews) return null;
    return (
        <>
            <NavLink to='/reviews'>Create new review</NavLink>
            <div>
                <ul>
                    {allReviews.map(review => (
                        <li key={review.id}>
                            {review.review} in {review.Spot.id}, {review.stars} stars.
                            <span>
                                <button>Add Image</button>
                                {/* <AddImageFormModal spot={spot}/> */}
                            </span>
                            <span>
                                <button >Edit Review</button>
                                {/* <EditSpotFormModal spot={spot}/> */}
                            </span>
                            <span>
                                <button>Remove Review</button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default MyReviews;
