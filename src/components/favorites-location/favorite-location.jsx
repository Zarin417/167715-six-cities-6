import React from "react";
import PropTypes from "prop-types";
import Offer from "../offer/offer";
import {CardName} from "../../const";
import {offerProp} from "../../prop-types/offer.prop";

const FavoritesLocation = ({places, city}) => {
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
        {
          places.map((place) => {
            return (
              <Offer key={place.id} place={place} cardName={CardName.FAVORITES} />
            );
          })
        }
      </div>
    </li>
  );
};

FavoritesLocation.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(offerProp)
  ).isRequired,
  city: PropTypes.string.isRequired,
};

export default FavoritesLocation;
