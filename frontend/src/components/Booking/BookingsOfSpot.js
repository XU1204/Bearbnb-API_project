import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { getBookingsOfSpot } from "../../store/bookings";


const BookingsOfSpot = () => {
    const {spotId} = useParams();
    console.log("++++++++++",spotId)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookingsOfSpot(+spotId))
    },[dispatch, spotId]);

    const bookings = useSelector(state => Object.values(state.bookingState))
    console.log('bookings++++++', bookings)


    return (
        <div>
            <h1>Booking Orders</h1>
        </div>
    )
}

export default BookingsOfSpot;
