import { useEffect } from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getSpots } from '../../store/spots'
import './Homepage.css'
import SpotDetails from "../SpotDetails/SpotDetails";

function Homepage () {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spotState));
    useEffect(() => {
        dispatch(getSpots())
    },[dispatch])

    if(!spots) return null;
    //console.log('spots from hp', spots)
    return (
        <div className="hp-list">
            {spots.map(spot => (
                <NavLink key={spot.name} id='link' to={`/api/spots/${spot.id}`}>
                <div className="hp-each-list">
                    <img src={spot.previewImage} alt={`preview image of ${spot.name}`}/>
                    <div className="hp-name-star">
                        <h4>Home in {spot.city}</h4>
                        <div>
                            <span>★</span>
                            <span>{spot.avgRating || 'new'}</span>
                        </div>
                    </div>
                    <h5>{spot.name}</h5>
                    <li>{spot.description}</li>
                    <li>${spot.price} / night</li>
                </div>
                </NavLink>
            ))}
            {/* <Switch>
                    <Route path='/api/spots/:id'>
                        <SpotDetails spots={spots}/>
                    </Route>
            </Switch> */}
        </div>
    )
}

export default Homepage;
