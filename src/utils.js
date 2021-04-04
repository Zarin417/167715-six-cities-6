const MAX_RATING_STARS_AMOUNT = 5;

export const ratingToPercents = (rating) => {
  return `${Math.round(rating) / MAX_RATING_STARS_AMOUNT * 100}%`;
};

export const firstCharToUppercase = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const getCitiesList = (offers) => {
  const cities = [];
  offers.forEach((place) => cities.push(place.city.name));
  return Array.from(new Set(cities));
};

export const formatString = (string) => {
  const strings = string.split(` `);
  return strings.map((it) => firstCharToUppercase(it)).join(` `);
};

export const formatReviewDate = (date) => {
  const reviewDate = new Date(date);

  return reviewDate.toLocaleDateString(`en-US`, {year: `numeric`, month: `long`});
};

export const formatReviewDateTime = (date) => {
  return new Date(date).toLocaleDateString(`en-US`);
};

export const getCityPlaces = (places, city) => {
  return places.filter((place) => place.city.name === city);
};

export const sortReviewsByDate = (reviews) => {
  reviews.sort((review1, review2) => {
    return new Date(review2.date) - new Date(review1.date);
  });
};

export const updateOffers = (offers, offerItem) => {
  const index = offers.findIndex((offer) => offer.id === offerItem.id);

  if (index === -1) {
    return offers;
  }

  return [
    ...offers.slice(0, index),
    offerItem,
    ...offers.slice(index + 1)
  ];
};

export const sortOffersByRating = (offers) => {
  offers.sort((a, b) => {
    return b.rating - a.rating;
  });
};

export const sortOffersLowToHighPrice = (offers) => {
  offers.sort((a, b) => {
    return a.price - b.price;
  });
};

export const sortOffersHighToLowPrice = (offers) => {
  offers.sort((a, b) => {
    return b.price - a.price;
  });
};
