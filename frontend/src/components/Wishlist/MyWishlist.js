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
            <h2>Wishlists</h2>
            {!isExist && (
                <h2 id='my-review-title'>No wishlist...yet!</h2>
            )}
            <div>
                {isExist && wishes.map(wish => (
                    <div className="my-reviews-each-review" key={wish.id}>
                        <ul>
                            <li><span className="my-reviews-bold">Spot: </span><NavLink style={{color: 'black'}} to={`/spots/${wish.Spot?.id}`}> {wish.Spot?.name}</NavLink></li>
                            <li><span className="my-reviews-bold">Location: </span> {wish.Spot?.address}, {wish.Spot?.city}, {wish.Spot?.state}</li>
                            <li><span className="my-reviews-bold">Created at: </span>{wish.createdAt.slice(0,10)}</li>
                        </ul>
                        <span>
                            <button id='remove-wish-button' onClick={(e) =>  dispatch(removeWish(wish.id))} title='remove wishlist'> <i class="fa-solid fa-heart" style={{color: '#ff385c'}}></i>&nbsp;</button>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyWishes;
