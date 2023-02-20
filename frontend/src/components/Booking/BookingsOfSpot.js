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

    let isExist;
    if (bookings.length) isExist = true
    else isExist = false

    return (
        <div className="my-trips-container">
            <h1 id='bookingsOfSpot-title'>Bookings</h1>
            <div className="past-bookings">
                {isExist && (
                <div>
                    {bookings.map(booking => (
                        <NavLink id='link' to={`/spots/${booking.spotId}`}>
                            <div className="each-past-booking-container" key={booking.id}>
                                <img src={booking.Spot?.SpotImages[0].url} alt='' className="past-booking-img"
                                    onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}></img>
                                <div className="past-booking-info">
                                    <div className="past-booking-li">
                                        <li><strong>Spot: </strong>{booking.Spot?.name}</li>
                                        <li><strong>Location: </strong> {booking.Spot?.address}, {booking.Spot?.city}, {booking.Spot?.state}</li>
                                        <li><strong>Created at: </strong>{booking.createdAt?.slice(0,10)}</li>
                                        <li><strong>Guest: </strong> {booking.User?.firstName} {booking.User?.lastName}</li>
                                        <li><strong>Stay: </strong> {booking.startDate.slice(0,10)} to {booking.endDate.slice(0,10)} </li>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
                )}
                {!isExist && (
                    <h2 id='my-review-title'>This listing has no bookings yet!</h2>
                )}
            </div>
        </div>
    )
}

export default BookingsOfSpot;
