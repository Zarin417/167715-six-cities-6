import React from "react";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import OfferReview from "./offer-review";
import {createAPI} from "../../services/api";
import thunk from "redux-thunk";

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);

describe(`Test 'OfferReview'`, () => {
  it(`OfferReview should render empty review list if reviews are missing`, () => {
    const store = mockStore({
      REVIEW: {isReviewsLoaded: true, placeReviews: []},
      USER: {isLoggedIn: true}
    });

    const {container} = render(
        <Provider store={store}>
          <OfferReview
            placeId={`24`}
          />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`OfferReview should render 'Loader' if data is loading`, () => {
    const store = mockStore({
      REVIEW: {isReviewsLoaded: false},
      USER: {isLoggedIn: true}
    });

    const {container} = render(
        <Provider store={store}>
          <OfferReview
            placeId={`44`}
          />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`OfferReview should render correctly`, () => {
    const store = mockStore({
      USER: {isLoggedIn: true},
      REVIEW: {
        isReviewsLoaded: true,
        placeReviews: [
          {
            comment: ``,
            date: `2020-04-23T08:04:28.647Z`,
            id: 2,
            rating: 4,
            user: {
              avatarUrl: ``,
              id: 8,
              isPro: true,
              name: `Aretha`,
            }
          }
        ]
      }
    });

    const {container} = render(
        <Provider store={store}>
          <OfferReview placeId={`53`}/>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
