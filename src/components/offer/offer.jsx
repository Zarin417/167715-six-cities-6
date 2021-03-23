import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {ratingToPercents, firstCharUppercase} from "../../utils";
import offerProp from "./offer.prop";

const Offer = ({offer, onMouseEnter}) => {
  const {isFavorite, isPremium, images, price, rating, title, type, id} = offer;

  return (
    <article className="cities__place-card place-card" onMouseEnter={() => onMouseEnter(id)}>
      {isPremium
        ? <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ``
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={images[0]} width={260} height={200} alt={title} />
        </a>
      </div>
      <div className="place-card__info">
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
  onMouseEnter: PropTypes.func.isRequired
};

export default Offer;
