import { csrfFetch } from './csrf';

const LOAD = 'spots/GET'
const CREATE = 'spots/CREATE'

const load = (spots) => ({
    type: LOAD,
    spots
})

const add = (payload) => {
    return {
        type: CREATE,
        payload
    }
}

//thunk action creators
export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    if(response.ok) {
        const spots = await response.json();
        console.log('spotsdata', spots)
        dispatch(load(spots))
    }
};

export const getDetails = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const spot = await response.json();
        //console.log('spot from getDetails',spot)
        dispatch(load(spot))
    }
};

export const addSpot = (payload) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(add(spot));
        return spot;
    }
}

//selectors
const initialState = {}

//reducer
const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD:
            const newState = {...state};
            if (action.spots.Spots) {
                action.spots.Spots.forEach(spot => newState[spot.id] = spot);
                return newState;
            }
            else {
                newState[action.spots.id] = action.spots;
                //console.log('newState from getdetails,', newState)
                return newState;
            }
        case CREATE:
            return {
                ...state,
                [action.payload.id]: action.payload
            }
        default:
            return state
    };
}

export default spotsReducer;
