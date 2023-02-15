import { csrfFetch } from './csrf';

const LOAD = 'spots/GET'
const DETAIL = 'spots/DETAIL'
const CREATE = 'spots/CREATE'
const REMOVE = 'spots/REMOVE'
const UPDATE = 'spots/UPDATE'
const ADD_IMAGE = 'spots/ADD_IMAGE'

const load = (spots) => ({
    type: LOAD,
    spots
})

const add = (spot) => {
    return {
        type: CREATE,
        spot
    }
}

const detail = (spot) => {
    return {
        type: DETAIL,
        spot
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

const addImage = (id, payload) => {
    return {
        type: ADD_IMAGE,
        id,
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
        const spots = await response.json();
        dispatch(load(spots))
    }
}

export const getDetails = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const spot = await response.json();
        //console.log('spot from getDetails',spot)
        dispatch(detail(spot))
        return spot;
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

        //11-16
        // const imageRes = await csrfFetch(`/api/spots/${spot.id}/images`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(payload)
        // })

        // if (response.ok) {
        //     const newImage = await imageRes.json();
        //     spot.previewImage = newImage.url

        // }

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

export const addImageToSpot = (id, payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/images`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const newImage = await response.json();
        dispatch(addImage(id, newImage));
        return response;
    }
}
//selectors
//const initialState = {}
const initialState = { allSpots: {}, singleSpot: {}}

//reducer
const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD:
            // // action.spots.Spots.forEach(spot => newState[spot.id] = spot);
            // action.spots.forEach(spot => newState[spot.id] = spot)
            // return newState;
            let newState = {allSpots: {}, singleSpot: {}};
            action.spots.Spots.forEach(spot => newState.allSpots[spot.id] = spot);
            return newState;
        case DETAIL:
            //console.log('action.spot', action)
            // return {
            //     [action.spot.id] : action.spot
            // }
            return {
                allSpots: {
                    ...state.allSpots
                },
                singleSpot: {
                    [action.spot.id]: action.spot
                }
            }
        case CREATE:
            // const newSpot =  {
            //     ...state,
            //     [action.payload.id]: action.payload
            // }
            const newSpot = {
                ...state,
                //allSpots: [...state.allSpots]
            }
            newSpot.allSpots[action.spot.id] = action.spot
            return newSpot;
        case UPDATE:
            return {
                ...state,
                allSpots: {
                    ...state.allSpots,
                    [action.spot.id]: action.spot
                }
            }
        case REMOVE:
            const newState2 = {...state}
            delete newState2.allSpots[action.spotId]
            return newState2;
        case ADD_IMAGE:
            // let newImage = {
            //     ...state[action.spot.id]
            // };
            // newImage.SpotImages = [
            //     ...newImage.SpotImages,
            //     action.payload
            // ]
            // return {
            //     ...state,
            //     [action.spot.id]: newImage
            // }
            let newImageState = {...state};
            newImageState.singleSpot[action.id].SpotImages.push(action.payload);
            console.log('newImageState:', newImageState)
            return newImageState;
        default:
            return state
    };
}

export default spotsReducer;
