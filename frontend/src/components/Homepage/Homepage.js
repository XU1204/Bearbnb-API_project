import { NavLink } from "react-router-dom";
import './Homepage.css'

function Homepage ({spots}) {

    if(!spots) return null;

    return (
        <div className="hp-list">
            {spots.map(spot => (
                <NavLink key={spot.name} id='link' to={`/spots/${spot.id}`}>
                <div className="hp-each-list">
                    <div className="hp-preview-img">
                        <img src={spot.previewImage} alt={`preview image of ${spot.name}`}/>
                    </div>
                    <div className="hp-name-star">
                        <h4>Home in {spot.city}</h4>
                        <div>
                            <span>★</span>
                            <span>{spot.avgRating || 'new'}</span>
                        </div>
                    </div>
                    <h5>{spot.name}</h5>
                    <li>{spot.description}</li>
                    <li><span id='hp-price'>${spot.price}</span> night</li>
                </div>
                </NavLink>
            ))}
        </div>
    )
}

export default Homepage;
