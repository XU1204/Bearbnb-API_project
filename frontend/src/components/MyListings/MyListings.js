import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import { getSpots } from '../../store/spots'

function MyListings () {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
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
                        <li>
                            {spot.name} in {spot.city}, {spot.state}
                            <span>
                                <button>Edit Listing</button>
                            </span>
                            <span>
                                <button>Remove Listing</button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>

    )
}

export default MyListings;
