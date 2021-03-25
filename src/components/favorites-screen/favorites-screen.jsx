import React from "react";
import PropTypes from "prop-types";
import offerProp from "../offer/offer.prop";
import FavoritesLocation from "../favorites-location/favorite-location";
import {CITIES} from "../../const";
import Header from "../header/header";

const FavoriteScreen = ({favoriteOffers}) => {
  const favoriteLocations = CITIES.filter((city) => favoriteOffers.some((offer) => offer.city.name === city));

  const offersFilteredByCity = (city) => {
    return favoriteOffers.filter((offer) => offer.city.name === city);
  };

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteLocations.map((city, i) => <FavoritesLocation key={`${city}-${i}`} city={city} offers={offersFilteredByCity(city)} />)}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </a>
      </footer>
    </div>
  );
};

FavoriteScreen.propTypes = {
  favoriteOffers: PropTypes.arrayOf(offerProp).isRequired
};

export default FavoriteScreen;
