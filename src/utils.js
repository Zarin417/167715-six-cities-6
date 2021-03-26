import {SORT_TYPE} from "./const";

export const ratingToPercents = (rating) => {
  return Math.floor(rating) * 20 + `%`;
};

export const firstCharUppercase = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const getOffersByCity = (allOffers, currentCity) => {
  return allOffers.filter((offer) => offer.city.name === currentCity);
};

export const getOffersBySortType = (offers, sortType) => {
  switch (sortType) {
    case SORT_TYPE.PRICE_LOW_TO_HIGH:
      return offers.sort((a, b) => (a.price - b.price));
    case SORT_TYPE.PRICE_HIGH_TO_LOW:
      return offers.sort((a, b) => (b.price - a.price));
    case SORT_TYPE.TOP_RATED:
      return offers.sort((a, b) => (b.rating - a.rating));
    default:
      return offers;
  }
};
