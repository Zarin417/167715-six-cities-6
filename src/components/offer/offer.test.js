import React from "react";
import {render} from "@testing-library/react";
import {createMemoryHistory} from "history";
import configureStore from "redux-mock-store";
import {Router} from "react-router";
import Offer from "./offer";
import {CardName} from "../../const";
import {Provider} from "react-redux";

const mockStore = configureStore({});

describe(`Test 'Offer'`, () => {
  it(`Offer should render correctly`, () => {
    const history = createMemoryHistory();
    const place = {
      title: `The house among olive`,
      price: 169,
      previewImage: ``,
      type: `hotel`,
      isFavorite: true,
      isPremium: true,
      rating: 5,
      id: 15,
      bedrooms: 2,
      description: ``,
      maxAdults: 2,
      location: {},
      images: [``],
      host: {id: 25, name: `Maria`, isPro: true, avatarUrl: `img/avatar-angelina.jpg`},
      goods: [`Breakfast`],
      city: {name: `Berlin`, location: {}},
    };

    const store = mockStore({
      PLACE_INFO: {placeInfo: place},
      USER: {isLoggedIn: true}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Offer
              place={place}
              cardName={CardName.CITIES}
            />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
