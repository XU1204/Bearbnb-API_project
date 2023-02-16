import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getSpotsOfCurrent, removeSpot } from '../../store/spots'
import EditSpotFormModal from "../EditSpotForm";
import AddImageFormModal from "../EditSpotForm/AddImageFromModal.js";
import StarRating from "../Homepage/StarRating";
import './MyListings.css'

function MyListings () {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSpotsOfCurrent())
    },[dispatch])

   const spots = useSelector(state => Object.values(state.spotState.allSpots));
//    const spots = allSpots.filter(spot => spot.ownerId === sessionUser.id)

    if (!spots) return null;

   let noListing;
   if (spots.length === 0) {
    noListing = (
        <h2 className="my-listing-title">You have no Listing yet!</h2>
    )
   }
   else {
    noListing = (
        <h2 className="my-listing-title">My Listings</h2>
    )
   }


    return (
        <div>
            {noListing}
            <div className="my-listings-list">
            {spots.map(spot => (
                <div key={spot.id} >
                    <NavLink id='link' to={`/spots/${spot.id}`}>
                    <div className="my-listings-each">
                        <div className="">
                            <img src={spot.previewImage} alt={`preview of ${spot.name}`}
                                onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}/>
                        </div>
                        <div className="my-listings-name-star">
                            <span className='my-listings-fold'>{spot.city}, {spot.state}</span>
                            <span>
                                <span>★</span>
                                {/* <span>{Number(spot.avgRating).toFixed(1) || 'new'}</span> */}
                                <StarRating spot={spot} />
                            </span>
                        </div>
                        <li id='my-listings-name' key={spot.name}>{spot.name}</li>
                        <li key={spot.price}><span className='my-listings-fold'>${spot.price}</span> night</li>
                    </div>
                    </NavLink>
                    <div className="my-listings-button">
                            {/* <AddImageFormModal spot={spot}/> */}
                        <span>
                            {/* <button onClick={() => setEdit(true)}>Edit Listing</button> */}
                            <EditSpotFormModal spot={spot}/>
                        </span>
                        <span>
                            <button onClick={(e) =>  dispatch(removeSpot(spot.id))}>Remove</button>
                        </span>
                    </div>

                    <button>
                        <NavLink key={spot.id} to={`/spots/${spot.id}/bookings`} style={{ color: 'black', textDecoration: 'none'}}>
                            View Bookings
                        </NavLink>
                    </button>

                </div>
            ))}
            </div>
        </div>
    )
}

export default MyListings;
