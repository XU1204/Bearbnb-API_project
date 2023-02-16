// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomepageIndex from "./components/Homepage";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";
import MyListings from "./components/MyListings/MyListings";
import MyReviews from "./components/MyReviews/MyReviews";
import MyBookings from "./components/Booking";
import BookingsOfSpot from "./components/Booking/BookingsOfSpot";
import MapContainer from "./components/Maps/MapContainer";
import { getGeoKey, getKey } from './store/maps';
import Footer from "./components/Footer/Footer";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // added 2/12/23
  const [query, setQuery] = useState({});
  const [center, setCenter] = useState({
    lat: 30.272111846938458,
    lng: -97.74064523000791,
  });
  const [userCenter, setUserCenter] = useState({});
  const key = useSelector((state) => state.mapState.key);
  const geoKey = useSelector((state) => state.mapState.geoKey);

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }

    if (!geoKey) {
      dispatch(getGeoKey());
    }
  }, [dispatch, key]);

  const successGeo = (position) => {
    setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
    setUserCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
  };

  const errorGeo = (error) => {
    console.error(error);
  };

  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successGeo, errorGeo, options);
  }, []);
  // added end

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  function PageNotFound() {
    return (
      <div>
        <h2>404 Page not found</h2>
      </div>
    );
  }

  return isLoaded && (
    <div className="page-container">
     <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <div className="app-hp-wrapper">
                <HomepageIndex setQuery={setQuery} query={query}/>
                <MapContainer setQuery={setQuery} setCenter={setCenter} center={center} />
            </div>
          </Route>
          <Route exact path='/spots/current'>
            <MyListings />
          </Route>
          <Route path='/spots/:id' exact={true}>
              <SpotDetails />
          </Route>
          <Route path='/spots/search' exact={true}>
              <SpotDetails />
          </Route>
          <Route path='/spots/:id/bookings' exact={true}>
            <BookingsOfSpot />
          </Route>
          <Route exact path='/spots'>
              <CreateSpotForm />
          </Route>
          <Route path='/reviews/current'>
            <MyReviews />
          </Route>
          <Route path='/bookings/current'>
            <MyBookings />
          </Route>
          <Route path='*'>
            {PageNotFound}
          </Route>
        </Switch>
      )}
      <Footer />
    </div>
  );
}

export default App;
