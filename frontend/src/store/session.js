// frontend/src/store/session.js
import { csrfFetch } from './csrf';

// this needs to be refactored. Might be able to delete this part since App.js is getting geodata already.
const getLocationPromise = new Promise((resolve, reject) => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude
          const lng = position.coords.longitude

          resolve({lat, lng})
      })

  } else {
      reject('No geolocation data.')
  }
})

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const LOAD_USER_LOCATION = '/loadUserLocation';


const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

const loadUserLocation = (location) => {
  return {
      type: LOAD_USER_LOCATION,
      location
  }
}

//thunk action creators
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const logout = () => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
}

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};


export const userLocation = () => async (dispatch) => {
  const location = await getLocationPromise;
  dispatch(loadUserLocation(location));
}


const initialState = { user: null, userLocation: {} };
//reducer
const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case LOAD_USER_LOCATION: {
      newState = { ...state };
      newState.userLocation = action.location;
      return newState;
    };
    default:
      return state;
  }
};

export default sessionReducer;
