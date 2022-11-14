import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getSpots } from '../../store/spots'
import './Homepage.css'
import Homepage from "./Homepage";

function HomepageIndex () {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spotState.allSpots));
    useEffect(() => {
        dispatch(getSpots())
    },[dispatch]);

    return (
        <Homepage spots={spots} />
    )
}

export default HomepageIndex;
