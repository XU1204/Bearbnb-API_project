import { NavLink } from "react-router-dom";
import './Homepage.css'

function Homepage ({spots}) {

    if(!spots) return null;

    return (
        <div className="hp-list">
            <div className="hp-each-spot">
            {spots.map(spot => (
                <NavLink key={spot.name} id='link' to={`/spots/${spot.id}`}>
                <div className="hp-each-list">
                    <div className="hp-preview-img">
                        <img src={spot.previewImage} alt={`preview image of ${spot.name}`}/>
                    </div>
                    <div className="hp-name-star">
                        <span>{spot.city}, {spot.state}</span>
                        <span>
                            <span>★</span>
                            <span>{Number(spot.avgRating).toFixed(1) || 'new'}</span>
                        </span>
                    </div>
                    <li id='hp-spot-name'>{spot.name}</li>
                    <li><span id='hp-price'>${spot.price}</span> night</li>
                </div>
                </NavLink>
            ))}
            </div>
        </div>
    )
}

export default Homepage;
