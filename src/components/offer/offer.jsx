import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import FavoriteButton from "../favorite-button/favorite-button";
import {formatString, ratingToPercents} from "../../utils";
import {offerProp} from "../../prop-types/offer.prop";
import {ButtonName, CardName} from '../../const';

const CardSettings = {
  [CardName.FAVORITES]: {
    cardClass: `favorites__card`,
    imgSize: {
      width: 150,
      height: 110,
    },
    cardInfoClass: `favorites__card-info`,
    buttonName: ButtonName.FAVORITE
  },
  [CardName.CITIES]: {
    cardClass: `cities__place-card`,
    imgSize: {
      width: 260,
      height: 200,
    },
    cardInfoClass: ``,
    buttonName: ButtonName.PLACE_CARD,
  },
  [CardName.NEAR_PLACES]: {
    cardClass: `near-places__card`,
    imgSize: {
      width: 260,
      height: 200,
    },
    cardInfoClass: ``,
    buttonName: ButtonName.NEAR_PLACE,
  }
};

const Offer = ({place, cardName, onMouseEnter, onMouseLeave}) => {
  const {title, price, previewImage, type, isFavorite, isPremium, rating} = place;

  const addPremiumMark = () => {
    return (
      <div className="place-card__mark">
        <span>Premium</span>
      </div>
    );
  };

  return (
    <article
      onMouseEnter={() => {
        if (onMouseEnter) {
          onMouseEnter(place);
        }
      }}

      onMouseLeave={() => {
        if (onMouseLeave) {
          onMouseLeave();
        }
      }}

      className={
        `${CardSettings[cardName].cardClass} place-card`
      }
    >
      {isPremium && addPremiumMark()}
      <div className={`${cardName}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={CardSettings[cardName].imgSize.width}
            height={CardSettings[cardName].imgSize.height}
            alt="Place image"
          />
        </a>
      </div>
      <div className={`${CardSettings[cardName].cardInfoClass} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <FavoriteButton
            isFavorite={isFavorite}
            buttonName={CardSettings[cardName].buttonName}
            placeId={place.id}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingToPercents(rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${place.id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{formatString(type)}</p>
      </div>
    </article>
  );
};

Offer.propTypes = {
  place: PropTypes.shape(offerProp),
  cardName: PropTypes.oneOf(
      [CardName.CITIES, CardName.FAVORITES, CardName.NEAR_PLACES]
  ).isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default Offer;
