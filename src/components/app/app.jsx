import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainScreen from "../main-screen/main-screen";
import LoginScreen from "../login-screen/login-screen";
import FavoriteScreen from "../favorites-screen/favorites-screen";
import OfferScreen from "../offer-screen/offer-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";

const App = ({offers, reviews}) => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainScreen offers={offers}/>
        </Route>
        <Route exact path="/login">
          <LoginScreen />
        </Route>
        <Route exact path="/favorites">
          <FavoriteScreen favoriteOffers={favoriteOffers}/>
        </Route>
        <Route exact path="/offer/:id"
          render = {({location}) => {
            const id = parseInt(location.pathname.slice(7), 10);
            return <OfferScreen offer={offers.find((offer) => offer.id === id)} reviews={reviews.filter((review) => review.id === id)} />;
          }}
        />
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  offers: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired
};

export default App;
