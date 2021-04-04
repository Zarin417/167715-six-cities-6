import React, {useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import Header from "../header/header";
import Map from "../map/map";
import OffersList from "../offers-list/offers-list";
import Loader from "../loader/loader";
import OfferReview from "../offer-review/offer-review";
import FavoriteButton from "../favorite-button/favorite-button";
import {ratingToPercents, formatString} from "../../utils";
import {AppRoute, ButtonName, CardsListName} from "../../const";
import {fetchNearPlaces, fetchPlace} from "../../store/api-actions";
import {useDispatch, useSelector} from "react-redux";
import {resetPlaceInfo} from "../../store/reducer/place-info/action";
import {resetNearPlaces} from "../../store/reducer/near-places/action";

const MAX_IMAGES_AMOUNT = 6;

const OfferScreen = () => {
  const {placeInfo, isPlaceInfoLoaded} = useSelector(
      (state) => state.PLACE_INFO
  );
  const {nearPlaces, isNearPlacesLoaded} = useSelector(
      (state) => state.NEAR_PLACE
  );
  const dispatch = useDispatch();
  const history = useHistory();
  let {id} = useParams();

  useEffect(() => {
    if (!isPlaceInfoLoaded || placeInfo.id !== Number(id)) {
      dispatch(fetchPlace(id))
        .catch(() => history.push(AppRoute.ERROR));
    }

    return () => dispatch(resetPlaceInfo());
  }, [id]);

  useEffect(() => {
    if (!isNearPlacesLoaded || placeInfo.id !== Number(id)) {
      dispatch(fetchNearPlaces(id));
    }

    return () => dispatch(resetNearPlaces());
  }, [id]);

  if (!(isPlaceInfoLoaded && isNearPlacesLoaded)) {
    return (
      <Loader />
    );
  }

  const city = placeInfo.city.name;
  const {bedrooms, description, goods, host, images, isFavorite, isPremium, maxAdults, price, rating, title, type} = placeInfo;

  const addPremiumMark = () => {
    return (
      <div className="property__mark">
        <span>Premium</span>
      </div>
    );
  };


  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                images.slice(0, MAX_IMAGES_AMOUNT).map((image) => {
                  return (
                    <div key={image} className="property__image-wrapper">
                      <img className="property__image" src={image} alt={`Photo ${title}`} />
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && addPremiumMark()}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <FavoriteButton
                  isFavorite={isFavorite}
                  buttonName={ButtonName.PROPERTY}
                  placeId={placeInfo.id}
                />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: ratingToPercents(rating)}} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {formatString(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    goods.map((good) => {
                      return (
                        <li key={`${good}`} className="property__inside-item">
                          {good}
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper user__avatar-wrapper ${host.isPro && `property__avatar-wrapper--pro`}`}>
                    <img className="property__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <OfferReview placeId={id} />
            </div>
          </div>
          <section className="property__map map">
            <Map city={city} places={nearPlaces} placeInfo={placeInfo} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList places={nearPlaces} placesListName={CardsListName.NEAR_PLACES_LIST} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferScreen;
