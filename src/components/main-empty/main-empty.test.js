import React from "react";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import MainEmpty from "./main-empty";

const mockStore = configureStore({});

it(`MainEmpty should render correctly`, () => {
  const store = mockStore({
    OFFER: {activeCity: `Amsterdam`}
  });

  const {container} = render(
      <Provider store={store}>
        <MainEmpty />
      </Provider>
  );

  expect(container).toMatchSnapshot();
});
