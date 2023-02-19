import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBookingsOfCurrent, removeBooking } from "../../store/bookings";
import './bookings.css'

function MyBookings () {
    const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user);

    const allBookings = useSelector(state => Object.values(state.bookingState))

    useEffect(() => {
        dispatch(getBookingsOfCurrent())
    },[dispatch, allBookings.length]);

    if (!allBookings) return null

    const isPast = (date) => {
        const today = new Date()
        const prev = new Date(date)
        if ((today - prev)/(1000*3600*24) >= 1) return true
        else return false
    }

    return (
        <div className="my-trips-container">
            <h1 id='my-trips-title'>Trips</h1>
            {allBookings && (
            <div className="my-trips-list">
                {allBookings.map(booking => (
                    <div className="my-reviews-each-review" key={booking.id}>
                        <ul>
                            <li><span className="my-reviews-bold">Spot: </span><NavLink style={{color: 'black'}} to={`/spots/${booking.Spot?.id}`}> {booking.Spot?.name}</NavLink></li>
                            <li><span className="my-reviews-bold">Location: </span> {booking.Spot?.address}, {booking.Spot?.city}, {booking.Spot?.state}</li>
                            <li><span className="my-reviews-bold">Created at: </span>{booking.createdAt?.slice(0,10)}</li>
                            <li><span className="my-reviews-bold">Date: </span>from {booking.startDate.slice(0,10)} to {booking.endDate.slice(0,10)} </li>
                        </ul>
                        {/* remember to change it  */}
                        <span>
                            <button id='remove-review-button' onClick={(e) =>  dispatch(removeBooking(booking.id))}>{isPast(booking.startDate.slice(0,10))? 'Delete' : 'Cancel'} </button>
                        </span>
                    </div>
                ))}
            </div>
            )}
            {!allBookings && (
                <div className="no-trips-container">
                    <h3 id='my-trips-title'>No trips booked...yet!</h3>
                    <p>Time to dust off your bags and start planning your next adventure</p>
                    <NavLink to='/'>
                        <button>Start searching</button>
                    </NavLink>
                </div>
            )}
        </div>
    )
}

export default MyBookings;
