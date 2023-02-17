import { csrfFetch } from './csrf';

const LOAD = 'wishes/GET';
const CREATE = 'wishes/CREATE'
const REMOVE = 'wishes/REMOVE'

const load = (wishes) => ({
    type: LOAD,
    wishes
});

const create = (wish) => ({
    type: CREATE,
    wish
});


const remove = (wishId, userId) => {
    return {
        type: REMOVE,
        wishId,
        userId
    }
}


//thunk action creators
export const getWishesOfCurrent = () => async dispatch => {
    const response = await csrfFetch('/api/wishes/current');
    if(response.ok) {
        const wishes = await response.json();
        // console.log('reducer----------reviews',response)
        dispatch(load(wishes.Wishes))
        // console.log('reducer----------reviews',reviews)
        return wishes;
    }
};


export const createWishOfSpot = (id, payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/wishes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const wish = await response.json();
        dispatch(create(wish));
        return wish;
    }
};

export const removeWish = (id) => async dispatch => {
    const response = await csrfFetch(`/api/wishes/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(remove(id))
    }
};



//reducers
const wishesReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD:
            let newState = {};
            // console.log('load---', action.reviews)
            action.wishes.forEach(wish => newState[wish.id] = wish);
            // console.log('new state---------', newState)
            return newState;
        case CREATE:
            return Object.assign({...state}, {[action.wish.id]: action.wish});
        case REMOVE:
            let newOne = {...state}
            delete newOne[action.wishId]
            return newOne;
        default:
            return state;
    }
}

export default wishesReducer;
