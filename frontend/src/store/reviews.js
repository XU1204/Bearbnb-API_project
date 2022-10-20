import { csrfFetch } from './csrf';

const LOAD = 'reviews/GET';
const CREATE = 'reviews/CREATE'
const UPDATE = 'reviews/UPDATE'
const REMOVE = 'reviews/REMOVE'

const load = (reviews) => ({
    type: LOAD,
    reviews
});

const create = (review) => ({
    type: CREATE,
    review
});

const update = (review) => ({
    type: UPDATE,
    review
});

const remove = (reviewId, userId) => {
    return {
        type: REMOVE,
        reviewId,
        userId
    }
}


//thunk action creators
export const getReviewsOfCurrent = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current');
    if(response.ok) {
        const reviews = await response.json();
        //console.log('reviews of getreviews of current', reviews.Reviews)
        dispatch(load(reviews.Reviews))
        //return reviews;
    }
};

export const getReviewsOfSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);
    if(response.ok) {
        const reviews = await response.json();
        //console.log('reviews of single spot', reviews.Reviews)
        dispatch(load(reviews.Reviews))
        return reviews;
    }
};

export const createReviewOfSpot = (id, payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        console.log('ok response', response)
        const review = await response.json();
        console.log('new review of spot:  ', review)
        dispatch(create(review));
        //return review;
    }
};

export const updateReview = (id, payload) => async dispatch => {
    const response = await (`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const review = await response.json();
        console.log('update review', review)
        dispatch(update(review));
        return review;
    }
};

export const removeReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(remove(id))
    }
};



//reducers
const reviewsReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD:
            let newState = {};
            //console.log('reviews of load', action.reviews)
            action.reviews.forEach(review => newState[review.id] = review);
            return newState;
        case CREATE:
            return Object.assign({...state}, {[action.review.id]: action.review});
        case UPDATE:
            const updateReviewObj = Object.assign({...state}, {[action.review.id]: action.review});
            console.log(('updateReviewObj', updateReviewObj));
            return updateReviewObj
        case REMOVE:
            let newOne = {...state}
            delete newOne[action.reviewId]
            return newOne;
        default:
            return state;
    }
}

export default reviewsReducer;
