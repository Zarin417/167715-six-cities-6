import React from "react";
import {render} from "@testing-library/react";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import {Router} from "react-router";
import {CardsListName} from "../../const";
import {Provider} from "react-redux";
import OffersList from "./offers-list";

const mockStore = configureStore({});

describe(`Test 'OffersList '`, () => {
  it(`OffersList  should render correctly`, () => {
    const history = createMemoryHistory();
    const places = [{
      title: `Nice, cozy, warm big bed apartment`,
      price: 129,
      previewImage: ``,
      type: `room`,
      isFavorite: false,
      isPremium: false,
      rating: 3,
      id: 17,
      bedrooms: 1,
      description: ``,
      maxAdults: 1,
      location: {},
      images: [``],
      host: {id: 25, name: `Angelina`, isPro: false, avatarUrl: `img/avatar-angelina.jpg`},
      goods: [`Washer`],
      city: {name: `Amsterdam`, location: {}},
    }];

    const store = mockStore({
      PLACE_INFO: {placeInfo: places[0]},
      USER: {isLoggedIn: true}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <OffersList
              places={places}
              placesListName={CardsListName.NEAR_PLACES_LIST}
            />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
