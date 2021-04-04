import React from "react";
import {render} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import Header from "./header";

const mockStore = configureStore({});
let history;

describe(`Test Header`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`Header should render correctly, when user is logged`, () => {
    const store = mockStore({
      USER: {isLoggedIn: true, usersEmail: `test@gmail.com`}
    });
    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Header />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it(`Header should render correctly, when user is not logged`, () => {
    const store = mockStore({
      USER: {isLoggedIn: false, usersEmail: null}
    });

    const {container} = render(
        <Provider store={store}>
          <Router history={history}>
            <Header />
          </Router>
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
