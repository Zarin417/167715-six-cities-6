import React from "react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import Offer from "../offer/offer";
import {offerProp} from "../../prop-types/offer.prop";
import {CardName, CardsListName} from "../../const";
import {resetCardHover, setCardHover} from "../../store/reducer/card/action";

const OffersList = ({places, placesListName}) => {
  const dispatch = useDispatch();
  let cardName = CardName.CITIES;

  if (placesListName === CardsListName.NEAR_PLACES_LIST) {
    cardName = CardName.NEAR_PLACES;
  }

  const handleCardMouseEnter = (place) => {
    if (cardName === CardName.CITIES) {
      dispatch(setCardHover(place.id));
    }
  };

  const handleCardMouseLeave = () => {
    if (cardName === CardName.CITIES) {
      dispatch(resetCardHover());
    }
  };

  return (
    <div className={`${placesListName} places__list`}>
      {
        places.map((place) => {
          return (
            <Offer
              key={place.id}
              place={place}
              cardName={cardName}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            />
          );
        })
      }
    </div>
  );
};

OffersList.propTypes = {
  places: PropTypes.arrayOf(
      PropTypes.shape(offerProp)
  ).isRequired,
  placesListName: PropTypes.string.isRequired,
};

export default OffersList;
