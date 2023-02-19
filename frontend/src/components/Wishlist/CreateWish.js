import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWishOfSpot, getWishesOfCurrent, removeWish } from "../../store/wishes";
import './wish.css'

const CreateWish = ({spot}) => {
    const dispatch  = useDispatch();

    const wishes = useSelector(state => Object.values(state.wishState))
    const wish= wishes.find(wish => wish.spotId === +spot.id);

    useEffect(() => {
        dispatch(getWishesOfCurrent())
    }, [dispatch, wishes.length])


    let heart = (<i class="fa-regular fa-heart">&nbsp;<span className="save">save</span></i>)
    if (wish) heart = (
        <>
            <i class="fa-solid fa-heart" style={{color: '#ff385c'}}></i>&nbsp;
            <span className="save">saved</span>
        </>
        )

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (wish) {
            await dispatch(removeWish(wish.id))
        } else {
            const payload = {spotId: spot.id}
            await dispatch(createWishOfSpot(spot.id, payload))

        }
    }

    return (
        <div className="detail-heart-container">
                <button id='detail-heart' onClick={(e) => handleSubmit(e)} type='submit' title={wish? 'Remove From wishlist':'Add To wishlist'}>{heart}</button>
        </div>
    )
}

export default CreateWish;
