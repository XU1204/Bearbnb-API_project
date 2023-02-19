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
            <div className="past-bookings">
                {!isExist && (
                    <h2>You have no reviews yet!</h2>
                )}
                {isExist && reviews.map(eachreview => (
                    <div className="each-review-container" key={eachreview.id}>
                        <NavLink id='link' to={`/spots/${eachreview.Spot?.id}`}>
                            <img src={eachreview.Spot?.previewImage? eachreview.Spot?.previewImage : eachreview.Spot?.SpotImages[0]?.url} alt='' className="past-booking-img"
                                onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}></img>
                        </NavLink>
                        <div className="review-info">
                            <NavLink id='link' to={`/spots/${eachreview.Spot?.id}`}>
                                <div className="review-li">
                                    <li><strong>Spot:&nbsp;</strong> {eachreview.Spot?.name}</li>
                                    <li><strong>Location:&nbsp;</strong> {eachreview.Spot?.address}, {eachreview.Spot?.city}, {eachreview.Spot?.state}</li>
                                    <li><strong>Created at:&nbsp; </strong>{eachreview.createdAt.slice(0,10)}</li>
                                    <li><strong>Stars:&nbsp; </strong>{eachreview.stars} </li>
                                    <li><strong>Review:&nbsp; </strong>{eachreview.review}</li>
                                </div>
                            </NavLink>
                            <div id='change-review-container'>
                                <EditReviewFormModal eachreview={eachreview}/>
                                <button id='change-review-button' onClick={(e) =>  dispatch(removeReview(eachreview.id))}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyReviews;
