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

   let isExist;
   if (spots.length === 0) isExist= false
   else isExist=true


    return (
        <div className="listing-container">
            <h1>Listings</h1>
            <div className="my-listings-list">
                {!isExist && (
                    <h2>You have no Listings yet!</h2>
                )}
                {isExist && spots.map(spot => (
                    <div key={spot.id} className="my-listings-each">
                        <NavLink id='link' to={`/spots/${spot.id}`}>
                        <div className="my-listings-content">
                            <img src={spot.previewImage} alt={`preview of ${spot.name}`}
                                onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}/>
                            <div className="my-listings-name-star">
                                <span className='my-listings-bold'>{spot.city}, {spot.state}</span>
                                <span>
                                    <span>★</span>
                                    {/* <span>{Number(spot.avgRating).toFixed(1) || 'new'}</span> */}
                                    <StarRating spot={spot} />
                                </span>
                            </div>
                            <li id='my-listings-name' key={spot.name}>{spot.name}</li>
                            <li key={spot.price}><span className='my-listings-fold'><strong>${spot.price}</strong></span> night</li>
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
                            <span>
                                <NavLink key={spot.id} to={`/spots/${spot.id}/bookings`} style={{ color: 'black', textDecoration: 'none'}}>
                                <button id='my-listings-bookings'>Bookings</button>
                                </NavLink>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyListings;
