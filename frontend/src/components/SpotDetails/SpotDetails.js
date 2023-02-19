import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from 'moment';
import { getBookingsOfSpot } from "../../store/bookings";
import { getReviewsOfSpot } from "../../store/reviews";
import { getDetails } from "../../store/spots";
import CreateReviewFormModal from "../CreateSpotForm/CreateReviewForm";
import ShowCalendar from "../Booking/Calendar";
import { getMMMDDYYYStr } from "./DateCalculate";
import CreateBooking from "../Booking/CreateBooking";
import SpotMapContainer from "../Maps/SpotMapContainer";
import './SpotDetails.css'
import CreateWish from "../Wishlist/CreateWish";

function SpotDetails () {
    const { id } = useParams();
    //Attention: typeof id is string!!!
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(getReviewsOfSpot(id))
        dispatch(getBookingsOfSpot(id))
    }, [dispatch, id]);

    const sessionUser = useSelector(state => state.session.user);

    const spot = useSelector(state => state.spotState.singleSpot[id])
    const reviews = useSelector(state => Object.values(state.reviewState))

    // date related
    const [dates, setDates] = useState({ startDate: moment(), endDate: moment() });
    // const [dateErrors, setDateErrors] = useState({});
    const [totalDays, setTotayDays] = useState(1);

    useEffect(() => {
        if (!spot) return;
        setDates({
            startDate: moment(spot.firstAvailableStart),
            endDate: moment(spot.firstAvailableEnd)
        })

        return () => {
            setDates({});
        }
    }, [spot])

    useEffect(() => {
        if (dates.endDate <= dates.startDate) return;
        setTotayDays(Math.round((dates.endDate - dates.startDate) / 86400000));

        return () => {
            setTotayDays(1);
        }
    }, [dates])

    // date related end

    if (!spot) return null;
    if (!spot.SpotImages) return null;
    if(!reviews) return null;

    let imageLink
    if (spot?.SpotImages[0]) {
        imageLink = (
            <div className="detail-photos">
                <div className="detail-big-pic">
                    <img id='img-of-spot-details' src={spot.SpotImages[0].url} alt='spot'
                        onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}/>
                </div>
                <div className="detail-photos-right">
                    <div className="detail-small-pic">
                        <img id='first-small' src={spot.SpotImages[1]? spot.SpotImages[1].url : "https://freerentbuy.com/img/nophoto.jpg" }  alt='spot'
                            onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}/>
                    </div>
                    <div className="detail-small-pic">
                        <img id='second-small' src={spot.SpotImages[2]? spot.SpotImages[2].url : "https://freerentbuy.com/img/nophoto.jpg" } alt='spot'
                            onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}/>
                    </div>
                    <div className="detail-small-pic" id='detail-photos-right-bottom'>
                        <img id='third-small' src={spot.SpotImages[3]? spot.SpotImages[3].url : "https://freerentbuy.com/img/nophoto.jpg" } alt='spot'
                            onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}/>
                    </div>
                    <div className="detail-small-pic">
                        <img id='forth-small' src={spot.SpotImages[4]? spot.SpotImages[4].url : "https://freerentbuy.com/img/nophoto.jpg" } alt='spot'
                            onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}/>
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
            <div className="detail-title-line">
                <h1>{spot.name}</h1>
                {sessionUser && <CreateWish spot={spot} />}
            </div>
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

            <div className="detail-middle-wrapper">
                <div>
                    <div>
                        <h3>Single house hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
                        <h4>{spot.address}, {spot.city}, {spot.state}</h4>
                        <div><span id='detail-page-price'>${spot.price}</span> per night</div>
                        <p>Description: {spot.description}</p>
                    </div>

                    <div style={{borderTop: '1px solid #eeeeee'}}>
                        <h1><span style={{color: '#ff385c'}}>air</span>cover</h1>
                        <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                    </div>

                    {/* modify start------------- */}
                    <div className='info-detail-wrapper'>
                        <h4>{totalDays} nights in {spot.city}</h4>
                        <div className='date-calendar-span'>
                            <span>{`${getMMMDDYYYStr(dates.startDate)}`} - {dates.endDate ? `${getMMMDDYYYStr(dates.endDate)}` : getMMMDDYYYStr(moment(dates.startDate, 'DD-MM-YYYY').add(1, 'day'))}</span>
                        </div>
                        <ShowCalendar dates={dates} setDates={setDates} />
                    </div>
                </div>

                <div className='booking-form-wrapper'>
                    <div className='booking-form-sub-wrapper'>
                        <div className='booking-form'>
                                <CreateBooking spot={spot} dates={dates} setDates={setDates} totalDays={totalDays} />
                        </div>
                    </div>
                </div>
            </div>
            {/* modify end---------------- */}

            <div>
                <div className="detail-review-wrapper">
                    <div className="review-title">
                        {/* <h3>★  {Number(spot.avgStarRating).toFixed(1) || 'new'} ・{reviews.length} Reviews:</h3> */}
                        <h3>★  {starLink}・{reviews.length} Reviews:</h3>
                        {/* <CreateReviewFormModal id={+id}/> */}
                        {createReviewFormLink}
                    </div>
                    {reviews.map(review => (
                        <div className="review-detail" key={review.id}>
                            <img id='user-review-photo' src='https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png' alt='user' />
                            <div key={review.id}>
                                <h4>{review.User? review.User.firstName : sessionUser.firstName} {review.User? review.User.lastName : sessionUser.lastName}:</h4>
                                <div><strong>{review.stars} stars</strong></div>
                                {review.review}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{margin: '4vh auto'}}>
                    <h2>
                        Where you'll be
                    </h2>
                    <SpotMapContainer spot={spot}/>
                </div>
                {/* <div className="detail-page-bottom">
                    <span>2022 Bearbnb, Inc. · Privacy · Terms · Sitemap</span>
                    <div>
                        <i class="fa-solid fa-earth-americas"></i>
                        <span>English (US)  $ USD </span>
                        <i class="fa-brands fa-facebook-f"></i>
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-instagram"></i>
                    </div>
                </div> */}
            </div>

       </div>
    )
}


export default SpotDetails;
