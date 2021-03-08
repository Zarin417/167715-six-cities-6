import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MainScreen from '../main-screen/main-screen';
import LoginScreen from "../login-screen/login-screen";
import FavoriteScreen from "../favorites-screen/favorites-screen";
import OfferScreen from "../offer-screen/offer-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";

const App = (props) => {
  const {cardsAmount} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainScreen cardsAmount={cardsAmount} />
        </Route>
        <Route exact path="/login">
          <LoginScreen />
        </Route>
        <Route exact path="/favorites">
          <FavoriteScreen />
        </Route>
        <Route exact path="/offer/:id">
          <OfferScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  cardsAmount: PropTypes.number.isRequired
};

export default App;
