import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import offerProp from "../offer/offer.prop";
import Header from "../header/header";
import OffersList from "../offers-list/offers-list";
import CitiesList from "../cities-list/cities-list";
import MainEmpty from "../main-empty/main-empty";
import Map from "../map/map";
import {getOffersByCity} from "../../utils";

const MainScreen = ({offers, currentCity}) => {
  return (
    <div className="page page--gray page--main">
      <Header isMainScreen />

      <main className={`page__main page__main--index ${offers.length === 0 && `page__main--index-empty`}`}>
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>

        <div className="cities">
          {offers.length !== 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>

                <b className="places__found">{offers.length} places to stay in {currentCity}</b>

                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by </span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select" />
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex="0">Popular</li>
                    <li className="places__option" tabIndex="0">Price: low to high</li>
                    <li className="places__option" tabIndex="0">Price: high to low</li>
                    <li className="places__option" tabIndex="0">Top rated first</li>
                  </ul>
                </form>

                <OffersList offers={offers} />

              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={offers} location={offers[0].location} />
                </section>
              </div>
            </div>
          ) : (
            <MainEmpty currentCity={currentCity} />
          )}
        </div>
      </main>
    </div>
  );
};

MainScreen.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  currentCity: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  offers: getOffersByCity(state.offers, state.currentCity)
});

export {MainScreen};
export default connect(mapStateToProps)(MainScreen);
