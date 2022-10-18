import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import { getSpots } from '../../store/spots'

function MyListings () {
    const sessionUser = useSelector(state => state.session.user);
    console.log('user', sessionUser.id)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpots())
    },[dispatch]);
    const allSpots = useSelector(state => Object.values(state.spotState));
    console.log('allspots', allSpots)
    const spots = allSpots.filter(spot => spot.ownerId === sessionUser.id)
    console.log('spot1111', spots)
    return (
        <>
            <NavLink to='/api/spots'>Create new spot</NavLink>
            <Homepage spots={spots} />
        </>

    )
}

export default MyListings;
