import React from "react";
import FavoritesLocation from "../favorites-location/favorite-location";
import {getCitiesList, getCityPlaces} from "../../utils";
import {useSelector} from "react-redux";

const FavoritesScreen = () => {
  const {favorites} = useSelector((state) => state.FAVORITE);
  const favoriteCities = getCitiesList(favorites);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {
          favoriteCities.map((city) => {
            const favoriteCityPlaces = getCityPlaces(favorites, city);

            return (
              <FavoritesLocation key={city} places={favoriteCityPlaces} city={city} />
            );
          })
        }
      </ul>
    </section>
  );
};

export default FavoritesScreen;
