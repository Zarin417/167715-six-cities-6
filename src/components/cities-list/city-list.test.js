import React from "react";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import {createMemoryHistory} from "history";
import {Provider} from "react-redux";
import {Router} from "react-router";
import CitiesList from "./cities-list";

const mockStore = configureStore({});
const cities = [`London`, `Paris`, `Berlin`, `Odence`, `Venice`, `Copenhagen`];

it(`CitiesList should render correctly`, () => {
  const history = createMemoryHistory();
  const store = mockStore({
    OFFER: {activeCity: `Copenhagen`}
  });
  const {container} = render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesList
            cities={cities}
          />
        </Router>
      </Provider>
  );

  expect(container).toMatchSnapshot();
});
