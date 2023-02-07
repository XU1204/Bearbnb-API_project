import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBookingsOfCurrent, removeBooking } from "../../store/bookings";
// import EditReviewFormModal from "../EditSpotForm/EditReviewForm";


function MyBookings () {
    const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getBookingsOfCurrent())
    },[dispatch]);

    const allBookings = useSelector(state => Object.values(state.bookingState))
    if (!allBookings) return null

    const isPast = (date) => {
        const today = new Date()
        const prev = new Date(date)
        if ((today - prev)/(1000*3600*24) >= 1) return true
        else return false
    }

    return (
        <div className="my-reviews-list">
            <h2 id='my-review-title'>My Bookings</h2>
            {allBookings && (
            <div>
                {allBookings.map(booking => (
                    <div className="my-reviews-each-review">
                        <ul key={booking.id}>
                            <li><span className="my-reviews-bold">Spot: </span><NavLink style={{color: 'black'}} to={`/spots/${booking.Spot?.id}`}> {booking.Spot?.name}</NavLink></li>
                            <li><span className="my-reviews-bold">Location: </span> {booking.Spot?.address}, {booking.Spot?.city}, {booking.Spot?.state}</li>
                            <li><span className="my-reviews-bold">Created at: </span>{booking.createdAt.slice(0,10)}</li>
                            <li><span className="my-reviews-bold">Date: </span>{booking.startDate.slice(0,10)} - {booking.endDate.slice(0,10)} </li>
                        </ul>
                        {/* remember to change it  */}
                        {
                            isPast && (
                                <span>
                                    <button>Edit booking</button>
                                </span>
                            )
                        }
                        <span>
                            <button id='remove-review-button' onClick={(e) =>  dispatch(removeBooking(booking.id))}>{isPast(booking.startDate.slice(0,10))? 'Remove booking' : 'Cancel booking'} </button>
                        </span>
                    </div>
                ))}
            </div>
            )}
            {!allBookings && (
                <h2 id='my-review-title'>You have no bookings yet!</h2>

            )}
        </div>
    )
}

export default MyBookings;
