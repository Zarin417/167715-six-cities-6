import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import {reviewProp} from "../../prop-types/review.prop";
import {ratingToPercents} from "../../utils";

const ReviewsItem = ({review}) => {
  const {comment, date, rating, user} = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
        {
          user.isPro && (
            <span className="property__user-status">Pro</span>
          )
        }
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: ratingToPercents(rating)}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date.slice(0, 10)}>{dayjs(date).format(`MMMM D`)}</time>
      </div>
    </li>
  );
};

ReviewsItem.propTypes = {
  review: PropTypes.shape(reviewProp)
};

export default ReviewsItem;
