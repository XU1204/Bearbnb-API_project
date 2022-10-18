import { csrfFetch } from './csrf';

const LOAD = 'spots/GET'
const CREATE = 'spots/CREATE'
const REMOVE = 'spots/REMOVE'

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

const remove = (spotId, userId) => {
    return {
        type: REMOVE,
        spotId,
        userId
    }
}

//thunk action creators
export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    if(response.ok) {
        const spots = await response.json();
        dispatch(load(spots))
    }
};

export const getSpotsOfCurrent = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current');
    if(response.ok) {
        const spot = await response.json();
        dispatch(load(spot))
    }
}

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
        console.log('spot1', spot)
        return spot;
    }
}

export const removeSpot = (spotId, userId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(remove(spotId, userId))
    }
}
//selectors
const initialState = {}

//reducer
const spotsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD:
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
            const newSpot =  {
                ...state,
                [action.payload.id]: action.payload
            }
            console.log('spot2', newSpot)
            return newSpot;
        case REMOVE:
            delete newState[action.spotId]
            return newState;
        default:
            return state
    };
}

export default spotsReducer;
