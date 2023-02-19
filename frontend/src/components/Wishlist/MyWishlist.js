import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getWishesOfCurrent, removeWish } from "../../store/wishes";
import './wish.css'

function MyWishes () {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getWishesOfCurrent())
    },[dispatch]);

    const wishes = useSelector(state => Object.values(state.wishState))
    // console.log('----my wishes----', wishes)

    let isExist;
    if(wishes.length === 0) isExist = false
    else isExist = true

    return (
        <div className="my-trips-container">
            <h1>Wishlists</h1>
            {!isExist && (
                <h2 id='my-review-title'>No wishlist...yet!</h2>
            )}
            <div className="all-wishes-container">
                {isExist && wishes.map(wish => (
                    <div className="each-wishlist-container" key={wish.id}>
                        <NavLink to={`/spots/${wish.Spot?.id}`} style={{color: 'black', textDecoration: 'none'}}>
                        <div className="wishlist-img">
                            <img src={wish.Spot?.SpotImages[0].url} alt=''
                                onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}></img>
                        </div>
                        </NavLink>
                        <div className="wishlist-bottom">
                            <NavLink to={`/spots/${wish.Spot?.id}`} style={{color: 'black', textDecoration: 'none'}}>
                                <div className="wishlist-name-loc">
                                    <p>{wish.Spot?.name}</p>
                                    <p>{wish.Spot?.address}, {wish.Spot?.city}, {wish.Spot?.state}</p>
                                </div>
                            </NavLink>

                            <div>
                                <button id='remove-wish-button' onClick={(e) =>  dispatch(removeWish(wish.id))} title='remove wishlist'> <i className="fa-solid fa-heart" style={{color: '#ff385c'}}></i>&nbsp;</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyWishes;
