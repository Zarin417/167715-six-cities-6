import React from "react";
import {Route, Switch} from "react-router-dom";
import {AppRoute} from "../../const";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "../../store/api-actions";
import MainScreen from "../main-screen/main-screen";
import LoginScreen from "../login-screen/login-screen";
import Favorites from "../favorites/favorites";
import OfferScreen from "../offer-screen/offer-screen";
import NotFoundScreen from "../not-found-screen/not-found-screen";
import PrivateRoute from "../private-route/private-route";
import Loader from "../loader/loader";
import Popup from "../popup/popup";


const App = () => {
  const {isError} = useSelector((state) => state.OFFER);
  const {isAuthChecked} = useSelector((state) => state.USER);
  const dispatch = useDispatch();

  if (!isAuthChecked) {
    dispatch(checkAuth());
  }

  if (!isAuthChecked) {
    return <Loader />;
  }

  return (
    <>
      {isError && <Popup />}
      <Switch>
        <Route path={AppRoute.ROOT} exact>
          <MainScreen />
        </Route>

        <Route path={AppRoute.LOGIN} exact>
          <LoginScreen />
        </Route>

        <PrivateRoute path={AppRoute.FAVORITES} exact render={() => <Favorites />} />

        <Route path={AppRoute.CITY}>
          <MainScreen />
        </Route>

        <Route path={AppRoute.OFFER}>
          <OfferScreen />
        </Route>

        <Route path={AppRoute.ERROR}>
          <NotFoundScreen />
        </Route>

        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </>
  );
};

export default App;
