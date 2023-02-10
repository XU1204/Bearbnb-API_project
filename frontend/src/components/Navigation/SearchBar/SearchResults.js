import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getSpots } from "../../../store/spots";
import StarRating from "../../Homepage/StarRating";


export default function SearchResults() {
    const {keyword} = useParams();
    const dispatch = useDispatch();
    console.log('----keyword----', keyword)

    let index;
    for (let i = 0; i < keyword.length; i++){
        if (keyword[i] === '+') {
            index = i
        }
    }
    let min = +keyword.slice(1, index)
    let max = +keyword.slice(index+1)

    useEffect(() =>{
        dispatch(getSpots())
    }, [dispatch])

    const allSpots = useSelector(state => Object.values(state.spotState.allSpots));
    const filteredSpots = allSpots.filter(spot => min <= spot.price <= max)

    return (
        <div className="hp-content-container">
        <div className="hp-list">
            {filteredSpots.map(spot => (
                <div className="hp-each-list">
                <NavLink key={spot.name} id='link' to={`/spots/${spot.id}`}>
                    <div className="hp-preview-img">
                        <img src={spot.previewImage} alt={`preview image of ${spot.name}`}/>
                    </div>
                    <div className="hp-name-star">
                        <span>{spot.city}, {spot.state}</span>
                        <span>
                            <span>★</span>
                            {/* <span>{Number(spot.avgRating).toFixed(1) || 'new'}</span> */}
                            <StarRating spot={spot} />
                        </span>
                    </div>
                    <li id='hp-spot-name'>{spot.name}</li>
                    <li><span id='hp-price'>${spot.price}</span> night</li>
                </NavLink>
                </div>
            ))}
        </div>
    </div>
    )

}
