import React from "react";
import {render} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NotFoundScreen from "./not-found-screen";

const mockStore = configureStore({});
let history;

describe(`Test NotFoundScreen`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`NotFoundScreen should render correctly, when user is logged`, () => {
    const store = mockStore({
      USER: {isLoggedIn: true, usersEmail: `test@gmail.com`}
    });
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <NotFoundScreen />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });


  it(`NotFoundScreen should render correctly, when user is not logged`, () => {
    const store = mockStore({
      USER: {isLoggedIn: false, usersEmail: null}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <NotFoundScreen />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});

