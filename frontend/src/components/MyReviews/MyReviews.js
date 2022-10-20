import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviewsOfCurrent, removeReview } from "../../store/reviews";
import EditReviewFormModal from "../EditSpotForm/EditReviewForm";


function MyReviews () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    useEffect(() => {
        console.log(1)
        dispatch(getReviewsOfCurrent())
    },[dispatch]);

    const allReviews = useSelector(state => Object.values(state.reviewState))
    const reviews = allReviews.filter(review => review.userId === sessionUser.id)
    console.log('2222 reviews-------', reviews)
    if (!reviews) return null;

    return (
        <>
            <div>
                <ul>
                    {reviews.map(eachreview => (
                        <li key={eachreview.id}>
                            {eachreview.review} in {eachreview.spotId}, {eachreview.stars} stars.
                            {/* <span>
                                <button>Add Image</button>
                            </span> */}
                            {/* <span>
                                <EditReviewFormModal eachreview={eachreview}/>
                            </span> */}
                            <span>
                                <button onClick={(e) =>  dispatch(removeReview(eachreview.id))}>Remove Review</button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default MyReviews;
