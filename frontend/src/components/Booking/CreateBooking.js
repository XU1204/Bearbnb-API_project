import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { DateRangePicker } from 'react-dates';
import { newBookingThunk, allBookingsUserThunk } from '../../store/bookings';
import moment from "moment";


const Calendar = ({ bookings, spot }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const { spotId } = useParams()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [focusedInput, setFocusedInput] = useState(null)
    const [bookedDates, setBookedDates] = useState([])
    const [blockedDates, setBlockedDates] = useState([])

    useEffect(() => {
        existingBookings(bookings)
    }, [dispatch, bookings])


    useEffect(() => {
        blockedDates.push(bookedDates)
    }, [dispatch, bookedDates])

    useEffect(() => {
        const endInput = document.getElementById('endDateId')
        if (!startDate) {
            endInput.disabled = true
            setEndDate()
            setStartDate()
        }
    }, [startDate])

    const handleSubmitBookings = async (e) => {
        e.preventDefault()
        const data = {
            startDate, endDate, spotId,
            userId: user.id
        }
        await dispatch(newBookingThunk(data))
        await dispatch(allBookingsUserThunk(user.id))
        history.push(`/${user.id}/bookings`)
    }

    const handleDateChanges = ({ startDate, endDate }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    const blockDates = (day) => {
        const blockedDates = new Set([...bookedDates])
        return blockedDates.has(moment(day).format('YYYY-MM-DD'))
    }

    const existingBookings = (bookings) => {
        bookings.forEach(booking => {
            const { startDate, endDate } = booking
            let date = moment(startDate)
            let dateEnd = moment(endDate)
            while (date <= dateEnd) {
                bookedDates.push(moment(new Date(date)).format('YYYY-MM-DD'))
                date.add(1, 'days')
            }
        })
    }

    const checkGapDays = (day) => {
        if (day > moment()) {
            const gapDays = []
            bookings.forEach(booking => gapDays.push(moment(booking.startDate).subtract(1, "days").format('YYYY-MM-DD')))
            return gapDays.find(gapDay => gapDay == day.format('YYYY-MM-DD'))
        }

    }

    const validatedDates = (day) => {
        if (!startDate) {
            return moment(startDate).diff(day, 'days') > 0
        }
        if (startDate) {
            const blockedDates = [...bookedDates]
            let earliestBlockedDate = blockedDates[0]
            for (let i = 1; i < blockedDates.length; i++) {
                if (moment(blockedDates[i]) > moment(startDate) &&
                    moment(blockedDates[i]).diff(day, 'days') < moment(earliestBlockedDate).diff(day, 'days')) {
                    earliestBlockedDate = blockedDates[i]
                }
            }
            if (moment(startDate).diff(earliestBlockedDate, 'days') > 0) {
                return moment(startDate).diff(day, 'days') > 0
            }
            return moment(startDate).diff(day, 'days') > 0 || moment(day).format('YYYY-MM-DD') > earliestBlockedDate
        }
    }

    const handleClear = (e) => {
        e.preventDefault()
        setStartDate()
        setEndDate()
        document.getElementById('startDateId').focus()
    }

    const handleClose = (e) => {
        e.preventDefault()
        setFocusedInput(null)
    }

    const calInfo = (e) => {
        return (
            <div className="calendar-info-bottom">
                <button onClick={handleClear} className='clearDateBTN' >Clear dates</button>
                <button onClick={handleClose} className='closeBTN'>Close</button>
            </div>
        )
    }

    const handleButtonClick = (e) => {
        e.preventDefault()
        document.getElementById('startDateId').focus()
    }

    return (
        <div className="calendar-container">
            <div className='cal-price-reviews'>
                <div>
                    <span style={{ fontSize: '25px' }}>${spot.price}</span>  &nbsp;<span>night</span>
                </div>
                {/* <div>
                    ⭐{spot.avgStarRating} • {spot.numReviews}&nbsp;review
                </div> */}

                {
                    spot.numReviews > 0 ?
                        <span>{`⭐ ${spot.avgStarRating ? Number(spot.avgStarRating).toFixed(0) : "New"}`} · {spot.numReviews} {`${spot.numReviews === 1 ? "review" : "reviews"}`}</span>
                        :
                        <span>New</span>
                }
            </div>
            <div className='cal-input'>
                <DateRangePicker
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    startDateId="startDateId" // PropTypes.string.isRequired,
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    endDateId="endDateId" // PropTypes.string.isRequired,
                    onDatesChange={handleDateChanges} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                    showClearDates={true}
                    reopenPickerOnClearDates={startDate}
                    minimumNights={1}
                    minDate={moment(new Date())}
                    isDayBlocked={blockDates}
                    startDatePlaceholderText={`${'add date'}`}
                    endDatePlaceholderText="Checkout"
                    hideKeyboardShortcutsPanel={true}
                    isDayHighlighted={checkGapDays}
                    isOutsideRange={validatedDates}
                    calendarInfoPosition={"bottom"}
                    renderCalendarInfo={calInfo}

                />
            </div>
            {startDate == null && endDate == null && <div className='cal-reserve-div'>
                <button onClick={handleButtonClick} className='cal-reserve' style={{ color: 'white', marginBottom: ' 10px' }}>Check availability</button>
            </div>}

            {startDate && endDate && <div className='cal-reserve-div'>
                <button onClick={handleSubmitBookings} className='cal-reserve' style={{ color: 'white' }}>Reserve</button>
            </div>}

            {startDate && endDate && <div className='cal-charge'>
                <div style={{ fontSize: '13px', color: 'grey' }}>You won't be charged yet</div>
            </div>}

            {startDate && endDate && <div className='cal-all'>
                <div className='cal-charge-info'>
                    <p>${spot.price} x {moment(endDate).diff(moment(startDate), 'days')} nights </p><p>${spot.price * moment(endDate).diff(moment(startDate), 'days')}</p>
                </div>
                <div className='cal-charge-info'>
                    <p>Special offer</p> <p style={{ color: 'green' }}>-$100</p>
                </div>
                <div className='cal-charge-info'>
                    <p>Cleaning fee</p> <p>$150</p>
                </div>
                <div className='cal-charge-info'>
                    <p>Service Fee</p> <p>${((spot.price * moment(endDate).diff(moment(startDate), 'days')) * .14).toFixed(0)}</p>
                </div>
                <div>
                    <div className='cal-charge-info' style={{ borderTop: "1px solid grey" }}>
                        <p>Total before taxes</p> <p>${50 + (spot.price * moment(endDate).diff(moment(startDate), 'days') * .14) + (spot.price * moment(endDate).diff(moment(startDate), 'days'))}</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}


export default Calendar
