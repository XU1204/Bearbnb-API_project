import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom"
import { useEffect } from "react";
import { getBookingsOfSpot, removeBooking } from "../../store/bookings";
import { getDetails } from "../../store/spots";

const BookingsOfSpot = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBookingsOfSpot(id))
        dispatch(getDetails(id));
    },[dispatch, id]);

    const bookings = useSelector(state => Object.values(state.bookingState))
    const spot = useSelector(state => state.spotState.singleSpot[id])


    return (
        <div>
            <div className="my-reviews-list">
            <h1>Booking Orders</h1>
                {bookings && (
                <div>
                    {bookings.map(booking => (
                        <div className="my-reviews-each-review">
                            <ul key={booking.id}>
                                <li><span className="my-reviews-bold">Spot: </span><NavLink style={{color: 'black'}} to={`/spots/${booking?.spotId}`}> {spot?.name}</NavLink></li>
                                <li><span className="my-reviews-bold">User: </span> {booking.User?.firstName} {booking.User?.lastName}</li>
                                <li><span className="my-reviews-bold">Created at: </span>{booking.createdAt.slice(0,10)}</li>
                                <li><span className="my-reviews-bold">Stay: </span>{booking.startDate.slice(0,10)} to {booking.endDate.slice(0,10)} </li>
                            </ul>
                            {/* <span>
                                <button id='remove-review-button' onClick={(e) =>  dispatch(removeBooking(booking.id))}>Remove booking </button>
                            </span> */}
                        </div>
                    ))}
                </div>
                )}
                {!bookings && (
                    <h2 id='my-review-title'>This spot has no bookings yet!</h2>
                )}
            </div>
        </div>
    )
}

export default BookingsOfSpot;
