import React, {useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import offerProp from "../offer/offer.prop";
import Header from "../header/header";
import OffersList from "../offers-list/offers-list";
import CitiesList from "../cities-list/cities-list";
import SortList from "../sort-list/sort-list";
import MainEmpty from "../main-empty/main-empty";
import Map from "../map/map";
import {getOffersByCity, getOffersBySortType} from "../../utils";

const MainScreen = ({offers, currentCity, currentSortType}) => {
  const [focusedOfferId, setFocusedOfferId] = useState(null);
  const sortedOffers = getOffersBySortType(offers, currentSortType);

  const handleFocusedOffer = (offerId) => {
    setFocusedOfferId(offerId);
  };

  const handleUnfocusedOffer = () => {
    setFocusedOfferId(null);
  };

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

                <SortList />

                <OffersList offers={sortedOffers} onMouseEnter={handleFocusedOffer} onMouseLeave={handleUnfocusedOffer} />

              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={offers} location={offers[0].location} focusedOfferId={focusedOfferId} />
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
  currentCity: PropTypes.string.isRequired,
  currentSortType: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  currentSortType: state.currentSortType,
  offers: getOffersByCity(state.offers, state.currentCity)
});

export {MainScreen};
export default connect(mapStateToProps)(MainScreen);
