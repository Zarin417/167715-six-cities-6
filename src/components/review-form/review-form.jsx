import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {sendPlaceReview} from "../../store/api-actions";

const MAX_SYMBOLS_AMOUNT = 300;
const MIN_SYMBOLS_AMOUNT = 50;
const ESTIMATIONS = [`perfect`, `good`, `not-bad`, `badly`, `terribly`];


const ReviewForm = ({placeId}) => {
  const [commentForm, setCommentForm] = useState({
    rating: null,
    comment: ``
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const {placeReviews} = useSelector((state) => state.REVIEW);
  const dispatch = useDispatch();

  useEffect(() => {
    if ((commentForm.comment.length > MIN_SYMBOLS_AMOUNT) && commentForm.rating) {
      setIsBtnDisabled(false);
    }
  }, [commentForm]);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    setIsDisabled(true);
    setIsBtnDisabled(true);

    dispatch(sendPlaceReview(placeId, commentForm))
      .then(() => {
        setCommentForm({
          ...commentForm,
          rating: null,
          comment: ``,
        });
      })
      .then(() => {
        setIsDisabled(false);
      });
  };

  const handleInputChange = (evt) => {
    const {name, value} = evt.target;
    setCommentForm({...commentForm, [name]: value});
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div key={placeReviews.length} className="reviews__rating-form form__rating" onChange={handleInputChange} >
        {
          ESTIMATIONS.map((estimation, index) => {
            const starsCount = ESTIMATIONS.length - index;
            return (
              <Fragment key={`${estimation} - ${isDisabled}`}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={starsCount}
                  id={`${starsCount}-stars`}
                  type="radio"
                  disabled={isDisabled}
                />
                <label
                  htmlFor={`${starsCount}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={estimation}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star" />
                  </svg>
                </label>
              </Fragment>
            );
          })
        }
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={commentForm.comment}
        onChange={handleInputChange}
        maxLength={MAX_SYMBOLS_AMOUNT}
        disabled={isDisabled}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">
            50 characters
          </b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isBtnDisabled}
        >Submit</button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  placeId: PropTypes.string.isRequired,
};

export default ReviewForm;
