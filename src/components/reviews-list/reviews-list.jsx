import React from "react";
import PropTypes from "prop-types";
import ReviewsItem from "../reviews-item/reviews-item";
import {reviewProp} from "../../prop-types/review.prop";
import {sortReviewsByDate} from '../../utils';

const MAX_REVIEWS_AMOUNT = 10;

const ReviewsList = ({reviews}) => {
  const reviewsCopy = reviews.slice();
  sortReviewsByDate(reviewsCopy);

  return (
    <ul className="reviews__list">
      {
        reviewsCopy
          .slice(0, MAX_REVIEWS_AMOUNT)
          .map((review) => {
            return (
              <ReviewsItem key={review.id} review={review} />
            );
          })
      }
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape(reviewProp)
  ).isRequired,
};

export default ReviewsList;
