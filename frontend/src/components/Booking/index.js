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

    const pastBookings = allBookings.filter(booking => isPast(booking.startDate.slice(0,10)))
    const futureBookings = allBookings.filter(booking => !isPast(booking.startDate.slice(0,10)) )

    return (
        <div className="my-trips-container">
            <h1 id='my-trips-title'>Trips</h1>
            <div className="future-bookings">
                {futureBookings && (
                <div className="all-future-bookings-container">
                    {futureBookings.map(booking => (
                        <div className="each-future-booking-container" key={booking.id}>
                            <NavLink id='link' to={`/spots/${booking.spotId}`}>
                                <img src={booking.Spot?.previewImage} alt=''
                                    onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}></img>
                                <div className="future-booking-li">
                                    <p title={booking.Spot?.name} style={{fontWeight: 'bold'}}>{booking.Spot?.name}</p>
                                    <p>{booking.Spot?.address}, {booking.Spot?.city}, {booking.Spot?.state}</p>
                                    <p>{booking.startDate.slice(0,10)} -- {booking.endDate.slice(0,10)} </p>
                                </div>
                            </NavLink>
                            {/* remember to change it  */}
                            <div className="cancel-booking-container">
                                <button id='remove-booking-button' onClick={(e) =>  dispatch(removeBooking(booking.id))}>Cancel </button>
                            </div>
                        </div>
                    ))}
                    {!futureBookings.length && (
                        <div className="no-trips-container">
                            <h2 id='my-trips-title'>No trips booked...yet!</h2>
                            <p>Time to dust off your bags and start planning your next adventure</p>
                            <NavLink to='/'>
                                <button id='start-search'>Start searching</button>
                            </NavLink>
                        </div>
                    )}
                </div>
                )}
            </div>

            <div className="past-bookings">
                <h2>Past Bookings</h2>
                {pastBookings && (
                    <div>
                        {pastBookings.map(booking => (
                        <div className="each-past-booking-container" key={booking.id}>
                            <NavLink id='link' to={`/spots/${booking.spotId}`}>
                                <img src={booking.Spot?.previewImage} alt='' className="past-booking-img"
                                    onError={e => { e.currentTarget.src = "https://freerentbuy.com/img/nophoto.jpg" }}></img>
                            </NavLink>
                            <div className="past-booking-info">
                                <NavLink id='link' to={`/spots/${booking.spotId}`}>
                                    <div className="past-booking-li">
                                        <li><span className="my-reviews-bold">Spot: </span>{booking.Spot?.name}</li>
                                        <li><span className="my-reviews-bold">Location: </span> {booking.Spot?.address}, {booking.Spot?.city}, {booking.Spot?.state}</li>
                                        <li><span className="my-reviews-bold">Created at: </span>{booking.createdAt?.slice(0,10)}</li>
                                        <li><span className="my-reviews-bold">Date: </span>from {booking.startDate.slice(0,10)} to {booking.endDate.slice(0,10)} </li>
                                    </div>
                                </NavLink>
                                {/* remember to change it  */}
                                <button id='remove-booking-button' onClick={(e) =>  dispatch(removeBooking(booking.id))} title='Delete this order'>Delete</button>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
                {!pastBookings && (
                    <h2 id='my-trips-title'>No past trips!</h2>
                )}
            </div>
        </div>
    )
}

export default MyBookings;
