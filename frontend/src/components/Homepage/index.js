import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getSpots } from '../../store/spots'
import './Homepage.css'
import Homepage from "./Homepage";

function HomepageIndex ({ query, setQuery }) {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spotState.allSpots));

    // const userLocation = useSelector(state => state.session.userLocation);

    useEffect(() => {
        dispatch(getSpots())
    },[dispatch]);

    return (
        <Homepage spots={spots} />
    )
}

export default HomepageIndex;
