import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {changeCity, resetCity, resetOffers} from "../../store/reducer/offers/action";
import Header from "../header/header";
import CitiesList from "../cities-list/cities-list";
import OffersContainer from "../offers-container/offers-container";
import MainEmpty from "../main-empty/main-empty";
import Loader from "../loader/loader";
import {CITIES} from "../../const";
import {fetchOffersList} from "../../store/api-actions";
import {getActiveCityPlaces} from "../../store/reducer/offers/selectors";


const MainScreen = () => {
  const dispatch = useDispatch();
  const activeCityPlaces = useSelector(
      (state) => getActiveCityPlaces(state)
  );
  const {isOffersLoaded} = useSelector((state) => state.OFFER);

  let {city} = useParams();

  useEffect(() => {
    if (!isOffersLoaded) {
      dispatch(fetchOffersList());
    }

    return () => dispatch(resetOffers());
  }, []);

  useEffect(() => {
    if (!city) {
      dispatch(resetCity());
      return;
    }

    dispatch(changeCity(city));
  }, [isOffersLoaded, city]);

  if (!isOffersLoaded) {
    return (
      <Loader />
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${(!activeCityPlaces.length) && `page__main--index-empty`}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={CITIES} />
          </section>
        </div>
        <div className="cities">
          {
            (activeCityPlaces.length)
              ? <OffersContainer />
              : <MainEmpty />
          }
        </div>
      </main>
    </div>
  );
};

export default MainScreen;
