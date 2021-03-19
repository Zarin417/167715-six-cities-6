import React, {useState} from "react";
import PropTypes from "prop-types";
import offerProp from "../offer/offer.prop";
import Offer from "../offer/offer";

const OffersList = ({offers}) => {
  // eslint-disable-next-line no-unused-vars
  const [activeCard, setActiveCard] = useState(null);

  const handleOfferHover = (id) => {
    setActiveCard(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Offer key = {offer.id} offer={offer} onMouseEnter={handleOfferHover} />)}
    </div>
  );
};

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired
};

export default OffersList;
