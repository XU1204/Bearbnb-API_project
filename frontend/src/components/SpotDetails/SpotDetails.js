import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getReviewsOfSpot } from "../../store/reviews";
import { getDetails } from "../../store/spots";
import CreateReviewFormModal from "../CreateSpotForm/CreateReviewForm";
import './SpotDetails.css'

function SpotDetails () {
    console.log(1)
    const { id } = useParams();
    //Attention: typeof id is string!!!
    //console.log('id---', id)
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const spot = useSelector(state => state.spotState.singleSpot[id])

    const reviews = useSelector(state => Object.values(state.reviewState))

    useEffect(() => {
        //console.log(2)
        dispatch(getDetails(id));
        dispatch(getReviewsOfSpot(id))
    }, [ dispatch, id]);

    //console.log('spot------', spot)
    // useEffect(() => {

    // },[dispatch ,id])
    //const reviews = allreviews.filter(review => review.spotId === +id)
    //console.log('review from spotsdetails, reviews)

    if (!spot) return null;
    if (!spot.SpotImages) return null;
    if(!reviews) return null;


    let imageLink
    if (spot.SpotImages[0]) {
        imageLink = (
            <img id='img-of-spot-details' src={spot.SpotImages[0].url} alt='main image'/>
        )
    } else {
        imageLink = (
            <img alt='No available images'/>
        )
    }

    return (
       <div>
            {/* <CreateReviewFormModal id={+id}/> */}
            <h1>{spot.name}</h1>
            <div>
                <span>★</span>
                <span>{spot.avgStarRating || 'new'}</span>
                <span>・{spot.numReviews} Reviews・</span>
                <span>{spot.city}, </span>
                <span>{spot.state}, </span>
                <span>{spot.country}</span>
            </div>
            <div>
                {/* <img src={spot.SpotImages[0].url} alt='main image'/> */}
                {imageLink}
            </div>
            <div>
                <h3>Single house hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
                <h4>{spot.address}, {spot.city}, {spot.state}</h4>
                <div>${spot.price} per night</div>
                <p>Description: {spot.description}</p>
            </div>
            <div>
                <div>
                <h3>★  {spot.avgStarRating || 'new'} ・{reviews.length} Reviews:</h3>
                <CreateReviewFormModal id={+id}/>
                </div>
                {reviews.map(review => (
                    <>
                        <div>
                        <ul>
                            <li key={review.id}><h4>{review.User? review.User.firstName : sessionUser.firstName} {review.User? review.User.lastName : sessionUser.lastName}:</h4> {review.review}</li>
                        </ul>
                        </div>
                    </>
                ))}
            </div>

       </div>
    )
}


export default SpotDetails;
