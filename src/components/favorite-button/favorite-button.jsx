import React, {useState} from "react";
import PropTypes from "prop-types";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorite, fetchFavoritePlaces, fetchNearPlaces} from "../../store/api-actions";
import {AppRoute, ButtonName} from "../../const";
import {changeFavoriteStatus} from "../../store/reducer/offers/action";
import {loadPlaceInfo} from "../../store/reducer/place-info/action";


const ButtonSettings = {
  [ButtonName.PROPERTY]: {
    iconSize: {
      width: 31,
      height: 33
    },
    className: ButtonName.PROPERTY
  },
  [ButtonName.PLACE_CARD]: {
    iconSize: {
      width: 18,
      height: 19
    },
    className: ButtonName.PLACE_CARD
  },
  [ButtonName.FAVORITE]: {
    iconSize: {
      width: 18,
      height: 19
    },
    className: ButtonName.PLACE_CARD
  },
  [ButtonName.NEAR_PLACE]: {
    iconSize: {
      width: 18,
      height: 19
    },
    className: ButtonName.PLACE_CARD
  }
};

const FavoriteButton = ({isFavorite, buttonName, placeId}) => {
  const {placeInfo} = useSelector((state) => state.PLACE_INFO);
  const {isLoggedIn} = useSelector((state) => state.USER);
  const [favorite, setFavorite] = useState(!isFavorite);
  const history = useHistory();
  const dispatch = useDispatch();

  const favoriteStatus = Number(favorite);

  const handleFavoriteButtonClick = () => {
    if (!isLoggedIn) {
      history.push(AppRoute.LOGIN);
      return;
    }

    if (buttonName === ButtonName.PROPERTY) {
      dispatch(addToFavorite(placeId, favoriteStatus))
        .then((data) => dispatch(loadPlaceInfo(data)));
    }

    if (buttonName === ButtonName.PLACE_CARD) {
      dispatch(addToFavorite(placeId, favoriteStatus))
        .then((data) => dispatch(changeFavoriteStatus(data)));
    }

    if (buttonName === ButtonName.FAVORITE) {
      dispatch(addToFavorite(placeId, favoriteStatus))
        .then(() => dispatch(fetchFavoritePlaces()));
    }

    if (buttonName === ButtonName.NEAR_PLACE) {
      dispatch(addToFavorite(placeId, favoriteStatus))
        .then(() => dispatch(fetchNearPlaces(placeInfo.id)));
    }

    setFavorite(!favorite);
  };

  return (
    <button
      className={`${ButtonSettings[buttonName].className}__bookmark-button
      ${isFavorite
      ? `${ButtonSettings[buttonName].className}__bookmark-button--active`
      : ``} button`
      }
      type="button"
      onClick={handleFavoriteButtonClick}
    >
      <svg
        className={`${ButtonSettings[buttonName].className}__bookmark-icon`}
        width={ButtonSettings[buttonName].iconSize.width}
        height={ButtonSettings[buttonName].iconSize.height}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  buttonName: PropTypes.string.isRequired,
  placeId: PropTypes.number.isRequired,
};

export default FavoriteButton;
