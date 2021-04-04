import React, {useEffect} from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import FavoritesEmpty from "../favorites-empty/favorites-empty";
import FavoritesScreen from "../favorites-screen/favorites-screen";
import Loader from "../loader/loader";
import {fetchFavoritePlaces} from "../../store/api-actions";
import {useDispatch, useSelector} from "react-redux";
import {resetFavorites} from "../../store/reducer/favorites/action";

const Favorites = () => {
  const dispatch = useDispatch();
  const {favorites, isFavoritesLoaded} = useSelector(
      (state) => state.FAVORITE
  );

  useEffect(() => {
    if (!isFavoritesLoaded) {
      dispatch(fetchFavoritePlaces());
    }
    return () => dispatch(resetFavorites());
  }, []);

  if (!isFavoritesLoaded) {
    return <Loader />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            favorites.length
              ? <FavoritesScreen />
              : <FavoritesEmpty />
          }
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;
