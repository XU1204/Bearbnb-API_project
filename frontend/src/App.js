// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomepageIndex from "./components/Homepage";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";
import MyListings from "./components/MyListings/MyListings";
import MyReviews from "./components/MyReviews/MyReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
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
    <>
     <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomepageIndex />
          </Route>
          <Route exact path='/spots/current'>
            <MyListings />
          </Route>
          <Route path='/spots/:id'>
              <SpotDetails />
          </Route>
          <Route path='/spots'>
              <CreateSpotForm />
          </Route>
          <Route path='/reviews/current'>
            <MyReviews />
          </Route>
          <Route path='*'>
            {PageNotFound}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
