import React from "react";
import PropTypes from "prop-types";
import offerProp from "../offer/offer.prop";
import {OFFERS_CARD_TYPE} from "../../const";
import Offer from "../offer/offer";

const FavoritesLocation = ({city, offers}) => {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => <Offer key={offer.id} offer={offer} cardType={OFFERS_CARD_TYPE.FAVORITE_SCREEN_CARD} />)}
      </div>
    </li>
  );
};

FavoritesLocation.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerProp).isRequired
};

export default FavoritesLocation;
