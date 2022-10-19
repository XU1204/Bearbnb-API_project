import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../../store/spots";
import './SpotDetails.css'

function SpotDetails () {
    //`console.log(1)
    const { id } = useParams();
    //console.log('id---', id)
    const dispatch = useDispatch();

    useEffect(() => {
        //console.log(2)
        dispatch(getDetails(id))
    }, [id]);
    const spot = useSelector(state => state.spotState[id])

    //console.log('spot------', spot)

    if (!spot) return null;
    if (!spot.SpotImages) return null;
    //console.log(3)

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
                <h3>Single house hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                <h4>{spot.address}, {spot.city}, {spot.state}</h4>
                <div>${spot.price} per night</div>
                <p>Description: {spot.description}</p>
            </div>
            <ul></ul>
       </div>
    )
}


export default SpotDetails;
