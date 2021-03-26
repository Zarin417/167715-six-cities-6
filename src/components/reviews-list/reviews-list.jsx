import React from "react";
import PropTypes from "prop-types";
import ReviewsItem from "../reviews-item/reviews-item";
import reviewProp from "../reviews-item/reviews-item.prop";

const ReviewsList = ({reviews}) => {
  return (
    <ul className="reviews__list">
      {reviews.map((comment) => <ReviewsItem key={comment.id} review={comment} />)}
    </ul>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProp)
};

export default ReviewsList;
