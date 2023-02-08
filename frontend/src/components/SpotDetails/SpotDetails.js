import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getBookingsOfSpot } from "../../store/bookings";
import { getReviewsOfSpot } from "../../store/reviews";
import { getDetails } from "../../store/spots";
import CreateReviewFormModal from "../CreateSpotForm/CreateReviewForm";
import Calendar from "../Booking/CreateBooking";
import './SpotDetails.css'

function SpotDetails () {
    const { id } = useParams();
    // console.log('detail id----', id)
    //Attention: typeof id is string!!!
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);

    const spot = useSelector(state => state.spotState.singleSpot[id])
    const reviews = useSelector(state => Object.values(state.reviewState))
    const bookings = useSelector(state => Object.values(state.bookingState))
    console.log('bookings-----', bookings)


    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(getReviewsOfSpot(id))
        dispatch(getBookingsOfSpot(id))
    }, [ dispatch, id]);

    if (!spot) return null;
    if (!spot.SpotImages) return null;
    if(!reviews) return null;


    let imageLink
    if (spot.SpotImages[0]) {
        imageLink = (
            <div className="detail-photos">
                <img id='img-of-spot-details' src={spot.SpotImages[0].url} alt='main image'/>
                <div className="detail-photos-right">
                    <div className="two-small-photos">
                        <img src='https://a0.muscache.com/im/pictures/3277347e-df0f-4d77-bb8a-9134d2534a71.jpg?im_w=720' />
                        <img src='https://a0.muscache.com/im/pictures/2651186d-c9c5-4e93-9e6a-98ace0221e74.jpg?im_w=720' />
                    </div>
                    <div className="two-small-photos" id='detail-photos-right-bottom'>
                        <img src='https://a0.muscache.com/im/pictures/2394955e-8136-475b-83e5-5932915603bc.jpg?im_w=720' />
                        <img src='https://a0.muscache.com/im/pictures/e110f89c-22fe-43f6-9a24-1725fbf2abd8.jpg?im_w=720' />
                    </div>
                </div>
            </div>
        )
    } else {
        imageLink = (
            <img alt='No available images'/>
        )
    };

    let createReviewFormLink;
    if (sessionUser && spot.ownerId !== sessionUser.id) {
        createReviewFormLink = (
            <CreateReviewFormModal id={+id}/>
        )
    } else {
        createReviewFormLink = (
            <></>
        )
    }

    let starLink;
    if (!spot.avgStarRating) {
        starLink = (
            <span>New</span>
        )
    } else {
        starLink = (
            <span>
                {Number(spot.avgStarRating).toFixed(1)}
            </span>
        )
    }

    return (
       <div className="detail-page">
            {/* <CreateReviewFormModal id={+id}/> */}
            <h1>{spot.name}</h1>
            <div className="detail-page-top">
                <span>★</span>
                {/* <span>{Number(spot.avgStarRating).toFixed(1)  || 'new'}</span> */}
                {starLink}
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
                <div><span id='detail-page-price'>${spot.price}</span> per night</div>
                <p>Description: {spot.description}</p>
            </div>
            <div>
                <Calendar bookings={bookings} spot={spot} />
            </div>
            <div>
                <div className="review-title">
                    {/* <h3>★  {Number(spot.avgStarRating).toFixed(1) || 'new'} ・{reviews.length} Reviews:</h3> */}
                    <h3>★  {starLink}・{reviews.length} Reviews:</h3>
                    {/* <CreateReviewFormModal id={+id}/> */}
                    {createReviewFormLink}
                </div>
                {reviews.map(review => (
                    <>
                        <div className="review-detail">
                            <img id='user-review-photo'src='https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png' alt='user-photo' />
                            <div key={review.id}>
                                <h4>{review.User? review.User.firstName : sessionUser.firstName} {review.User? review.User.lastName : sessionUser.lastName}:</h4>
                                <div>{review.stars} stars</div>
                                {review.review}
                             </div>
                        </div>
                    </>
                ))}
                <div className="detail-page-bottom">
                    <span>2022 Bearbnb, Inc. · Privacy · Terms · Sitemap</span>
                    <div>
                        <i class="fa-solid fa-earth-americas"></i>
                        <span>English (US)  $ USD </span>
                        <i class="fa-brands fa-facebook-f"></i>
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-instagram"></i>
                    </div>
                </div>
            </div>

       </div>
    )
}


export default SpotDetails;
