import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {ratingToPercents, firstCharUppercase} from "../../utils";
import offerProp from "./offer.prop";
import {OFFERS_CARD_TYPE} from "../../const";

const Offer = ({offer, cardType}) => {
  // eslint-disable-next-line no-unused-vars
  const [activeCard, setActiveCard] = useState(null);
  const {isFavorite, isPremium, images, previewImage, price, rating, title, type, id} = offer;
  let cardClassName = ``;
  let imageClassName = ``;
  let infoClassName = ``;
  let imageWidth = 260;
  let imageHeight = 200;

  const handleOfferHover = () => {
    setActiveCard(id);
  };

  const handleOfferLeave = () => {
    setActiveCard(null);
  };

  switch (cardType) {
    case OFFERS_CARD_TYPE.MAIN_SCREEN_CARD:
      cardClassName = `cities__place-card`;
      imageClassName = `cities__image-wrapper`;
      break;
    case OFFERS_CARD_TYPE.FAVORITE_SCREEN_CARD:
      cardClassName = `favorites__card`;
      imageClassName = `favorites__image-wrapper`;
      infoClassName = `favorites__card-info`;
      imageWidth = 150;
      imageHeight = 110;
      break;
    case OFFERS_CARD_TYPE.NEAR_OFFER_CARD:
      cardClassName = `near-places__card`;
      imageClassName = `near-places__image-wrapper`;
      break;
  }

  return (
    <article className={`${cardClassName} place-card`} onMouseEnter={handleOfferHover} onMouseLeave={handleOfferLeave}>
      {(isPremium && cardType !== OFFERS_CARD_TYPE.FAVORITE_SCREEN_CARD) && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${imageClassName} place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={cardType === OFFERS_CARD_TYPE.FAVORITE_SCREEN_CARD ? previewImage : images[0]}
            width={imageWidth}
            height={imageHeight}
            alt={title} />
        </a>
      </div>
      <div className={`${infoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price} </b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite && `place-card__bookmark-button--active`}`} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingToPercents(rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{firstCharUppercase(type)}</p>
      </div>
    </article>
  );
};

Offer.propTypes = {
  offer: offerProp,
  cardType: PropTypes.string.isRequired
};

export default Offer;
