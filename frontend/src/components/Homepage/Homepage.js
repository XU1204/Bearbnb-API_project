import { NavLink } from "react-router-dom";
import StarRating from "./StarRating";
import './Homepage.css'

function Homepage ({spots}) {

    if(!spots) return null;


    return (
    <>
        <div className="hp-list">
            {spots.map(spot => (
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
        <div className="hp-page-bottom">
            <span>2022 Bearbnb, Inc. · Privacy · Terms · Sitemap</span>
            <div>
                <i class="fa-solid fa-earth-americas"></i>
                <span>English (US)  $ USD </span>
                <i class="fa-brands fa-facebook-f"></i>
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-instagram"></i>
            </div>
        </div>
    </>
    )
}

export default Homepage;
