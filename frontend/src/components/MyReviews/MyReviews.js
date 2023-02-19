import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getReviewsOfCurrent, removeReview } from "../../store/reviews";
import EditReviewFormModal from "../EditSpotForm/EditReviewForm";
import './MyReviews.css'


function MyReviews () {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);

    const reviews = useSelector(state => Object.values(state.reviewState))

    useEffect(() => {
        dispatch(getReviewsOfCurrent())
    },[dispatch]);

    // if (!reviews) return null;

    let isExist
    if(reviews.length === 0) isExist = false
    else isExist = true

    return (
        <div className="my-trips-container">
            <h1>Reviews</h1>
            {!isExist && (
                <h2>You have no reviews yet!</h2>
            )}
            <div>
                {reviews?.map(eachreview => (
                    <div className="my-reviews-each-review" key={eachreview.id}>
                        <ul>
                            <li><span className="my-reviews-bold">Spot: </span><NavLink style={{color: 'black'}} to={`/spots/${eachreview.Spot?.id}`}> {eachreview.Spot?.name}</NavLink></li>
                            <li><span className="my-reviews-bold">Location: </span> {eachreview.Spot?.address}, {eachreview.Spot?.city}, {eachreview.Spot?.state}</li>
                            <li><span className="my-reviews-bold">Created at: </span>{eachreview.createdAt.slice(0,10)}</li>
                            <li><span className="my-reviews-bold">Stars: </span>{eachreview.stars} </li>
                            <li><span className="my-reviews-bold">Review: </span>{eachreview.review}</li>
                        </ul>
                        <span>
                            <EditReviewFormModal eachreview={eachreview}/>
                            <button id='remove-review-button' onClick={(e) =>  dispatch(removeReview(eachreview.id))}>Remove Review</button>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyReviews;
