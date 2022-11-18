import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviewsOfCurrent, removeReview } from "../../store/reviews";
import EditReviewFormModal from "../EditSpotForm/EditReviewForm";
import './MyReviews.css'


function MyReviews () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    useEffect(() => {
        dispatch(getReviewsOfCurrent())
    },[dispatch]);

    const allReviews = useSelector(state => Object.values(state.reviewState))
    const reviews = allReviews.filter(review => review.userId === sessionUser.id)
    if (!reviews) return null;

    let noReviews;
    if(reviews.length === 0) {
        noReviews = (
            <h2 id='my-review-title'>You have no reviews yet!</h2>
        )
    } else {
        noReviews = (
            <h2 id='my-review-title'>My Reviews List</h2>
        )
    }

    return (
        <div className="my-reviews-list">
            {noReviews}
            <div>
                {reviews.map(eachreview => (
                    <div className="my-reviews-each-review">
                        <ul key={eachreview.id}>
                            <li><span className="my-reviews-bold">Spot: </span><NavLink style={{color: 'black'}} to={`/spots/${eachreview.Spot?.id}`}> {eachreview.Spot?.name}</NavLink></li>
                            <li><span className="my-reviews-bold">Location: </span> {eachreview.Spot?.address}, {eachreview.Spot?.city}, {eachreview.Spot?.state}</li>
                            <li><span className="my-reviews-bold">Created at: </span>{eachreview.createdAt.slice(0,10)}</li>
                            <li><span className="my-reviews-bold">Stars: </span>{eachreview.stars} </li>
                            <li><span className="my-reviews-bold">Review: </span>{eachreview.review}</li>
                        </ul>
                        <span>
                            <button id='remove-review-button' onClick={(e) =>  dispatch(removeReview(eachreview.id))}>Remove Review</button>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyReviews;
