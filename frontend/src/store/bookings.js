import { csrfFetch } from './csrf';

const LOAD = 'bookings/GET';
const CREATE = 'bookings/CREATE'
const UPDATE = 'bookings/UPDATE'
const REMOVE = 'bookings/REMOVE'

const load = (bookings) => ({
    type: LOAD,
    bookings
});

const create = (booking) => ({
    type: CREATE,
    booking
});

const update = (booking) => ({
    type: UPDATE,
    booking
});

const remove = (bookingId, userId) => {
    return {
        type: REMOVE,
        bookingId,
        userId
    }
}


//thunk action creators
export const getBookingsOfCurrent = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current');
    if(response.ok) {
        const bookings = await response.json();
        dispatch(load(bookings.Bookings))
    }
};

export const getBookingsOfSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`);
    if(response.ok) {
        const bookings = await response.json();
        dispatch(load(bookings.Bookings))
        return bookings
    }
};

export const createBookingOfSpot = (id, payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const booking = await response.json();
        dispatch(create(booking));
        return booking;
    }
    else {
        const data = await response.json()
        if(data.errors){
            return data
        }
    }
};

export const updateBooking = (id, payload) => async dispatch => {
    const response = await (`/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const booking = await response.json();
        dispatch(update(booking));
        return booking;
    }
    else {
        const data = await response.json()
        if(data.errors){
            return data
        }
    }
};

export const removeBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(remove(bookingId))
    }
};



//reducers
const bookingsReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD:
            let newState = {};
            action.bookings.forEach(booking => newState[booking.id] = booking);
            return newState;
        case CREATE:
            return Object.assign({...state}, {[action.booking.id]: action.booking});
        case UPDATE:
            return  Object.assign({...state}, {[action.booking.id]: action.booking});
        case REMOVE:
            let newOne = {...state}
            delete newOne[action.bookingId]
            return newOne;
        default:
            return state;
    }
}

export default bookingsReducer;
