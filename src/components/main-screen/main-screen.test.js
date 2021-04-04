import React from "react";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {createMemoryHistory} from "history";
import {Provider} from "react-redux";
import MainScreen from "./main-screen";
import {Router} from "react-router";
import thunk from "redux-thunk";
import {createAPI} from "../../services/api";
import TestWrapper from "../../services/test-wrapper/test-wrapper";

const api = createAPI(() => {});
const mockStore = configureStore([thunk.withExtraArgument(api)]);
let history;

describe(`Test 'MainScreen'`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`MainScreen should render 'Loader' when data is loading`, () => {
    const store = mockStore({
      OFFER: {isOffersLoaded: false, offers: []}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <MainScreen />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`MainScreen should render empty page if there are no offers`, () => {
    const store = mockStore({
      OFFER: {isOffersLoaded: true, offers: []},
      USER: {isLoggedIn: false},
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <MainScreen />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`MainScreen should render correctly`, () => {
    const {container} = render(
        <TestWrapper>
          <MainScreen />
        </TestWrapper>
    );

    expect(container).toMatchSnapshot();
  });
});
