import React from "react";
import PropTypes from "prop-types";
import offerProp from "../offer/offer.prop";
import Offer from "../offer/offer";
import {OFFERS_CARD_TYPE} from "../../const";

const OffersList = ({offers}) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Offer key={offer.id} offer={offer} cardType={OFFERS_CARD_TYPE.MAIN_SCREEN_CARD}/>)}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired
};

export default OffersList;
