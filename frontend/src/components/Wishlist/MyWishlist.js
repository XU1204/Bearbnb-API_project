import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getWishesOfCurrent, removeWish } from "../../store/wishes";



function MyWishes () {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getWishesOfCurrent())
    },[dispatch]);

    const wishes = useSelector(state => Object.values(state.wishState))

    console.log('----my wishes----', wishes)


    let noWishes;
    let isExist;
    if(wishes.length === 0) {
        noWishes = (
            <h2 id='my-review-title'>You have no wishlist yet!</h2>
        );
        isExist = false
    } else {
        noWishes = (
            <h2 id='my-review-title'>My Wishlist</h2>
        )
        isExist = true
    }

    return (
        <div className="my-reviews-list">
            {noWishes}
            <div>
                {isExist && wishes.map(wish => (
                    <div className="my-reviews-each-review" key={wish.id}>
                        <ul>
                            <li><span className="my-reviews-bold">Spot: </span><NavLink style={{color: 'black'}} to={`/spots/${wish.Spot?.id}`}> {wish.Spot?.name}</NavLink></li>
                            <li><span className="my-reviews-bold">Location: </span> {wish.Spot?.address}, {wish.Spot?.city}, {wish.Spot?.state}</li>
                            <li><span className="my-reviews-bold">Created at: </span>{wish.createdAt.slice(0,10)}</li>
                        </ul>
                        <span>
                            <button id='remove-review-button' onClick={(e) =>  dispatch(removeWish(wish.id))}>Remove wish</button>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyWishes;
