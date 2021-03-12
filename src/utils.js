export const ratingToPercents = (rating) => {
  return Math.floor(rating) * 20 + `%`;
};

export const firstCharUppercase = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};
