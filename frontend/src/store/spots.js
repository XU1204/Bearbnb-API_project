import { csrfFetch } from './csrf';

const LOAD = 'spots/GET'
const CREATE = 'spots/CREATE'
const REMOVE = 'spots/REMOVE'
const UPDATE = 'spots/UPDATE'
const ADD_IMAGE = 'spots/ADD_IMAGE'

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

const update = (spot) => {
    return {
        type: UPDATE,
        spot
    }
}

const addImage = (spot, payload) => {
    return {
        type: ADD_IMAGE,
        spot,
        payload
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
        //console.log('spot1', spot)
        return spot;
    }
}

export const removeSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(remove(spotId))
    }
};

export const updateSpot = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(update(spot));
        return spot;
    }
};

export const addImageToSpot = (spot, payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}/images`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const newImage = await response.json();
        dispatch(addImage(spot, newImage));
        return response;
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
        case UPDATE:
            return {
                ...state,
                [action.spot.id]: action.spot
            }
        case REMOVE:
            delete newState[action.spotId]
            return newState;
        case ADD_IMAGE:
            let newImage = {
                ...state[action.spot.id]
            };
            newImage.SpotImages = [
                ...newImage.SpotImages,
                action.payload
            ]
            return {
                ...state,
                [action.spot.id]: newImage
            }
        default:
            return state
    };
}

export default spotsReducer;
