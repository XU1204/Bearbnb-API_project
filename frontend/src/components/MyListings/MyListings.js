import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getSpots, removeSpot, addImageToSpot } from '../../store/spots'
import EditSpotFormModal from "../EditSpotForm";
import AddImageFormModal from "../EditSpotForm/AddImageFromModal.js";

function MyListings () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSpots())
    },[dispatch]);

    const allSpots = useSelector(state => Object.values(state.spotState));
    const spots = allSpots.filter(spot => spot.ownerId === sessionUser.id)
    if (!spots) return null;
    return (
        <>
            <NavLink to='/spots'>Create new spot</NavLink>
            <div>
                <ul>
                    {spots.map(spot => (
                        <li key={spot.id}>
                            {spot.name} in {spot.city}, {spot.state}
                            <span>
                                {/* <button onClick={(e) =>  dispatch(addImageToSpot(spot.id))}>Add Image</button> */}
                                <AddImageFormModal spot={spot}/>
                            </span>
                            <span>
                                {/* <button onClick={() => setEdit(true)}>Edit Listing</button> */}
                                <EditSpotFormModal spot={spot}/>
                            </span>
                            <span>
                                <button onClick={(e) =>  dispatch(removeSpot(spot.id))}>Remove Listing</button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>

    )
}

export default MyListings;
