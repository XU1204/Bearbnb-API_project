import { csrfFetch } from './csrf';

const LOAD = 'reviews/GET';
const CREATE = 'reviews/CREATE'

const load = (reviews) => ({
    type: LOAD,
    reviews
});

const create = (review) => ({
    type: CREATE,
    review
})


//thunk action creators
export const getReviewsOfCurrent = () => async dispatch => {
    const response = await csrfFetch('/api/reviews/current');
    if(response.ok) {
        const reviews = await response.json();
        console.log('reviews of getreviews of current', reviews.Reviews)
        dispatch(load(reviews.Reviews))
        //return reviews;
    }
};

export const getReviewsOfSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);
    if(response.ok) {
        const reviews = await response.json();
        console.log('reviews of single spot', reviews.Reviews)
        dispatch(load(reviews.Reviews))
        //return reviews;
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
        const review = await response.json();
        dispatch(create(review));
        return review;
    }
}


//reducers
const reviewsReducer = (state = {}, action) => {

    switch(action.type) {
        case LOAD:
            let newState = {};
            console.log('reviews of load', action.reviews)
            action.reviews.forEach(review => newState[review.id] = review);
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer;
