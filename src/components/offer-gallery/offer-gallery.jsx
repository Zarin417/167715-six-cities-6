import React from "react";
import PropTypes from "prop-types";

const OfferGallery = ({offerImages, type}) => {
  return (
    <div className="property__gallery">
      {offerImages.map((image, i) =>
        <div key={i} className="property__image-wrapper">
          <img className="property__image" src={image} alt={`Photo ${type}`}/>
        </div>
      )}
    </div>
  );
};

OfferGallery.propTypes = {
  offerImages: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

export default OfferGallery;
