import React from "react";
import {render} from "@testing-library/react";
import {createMemoryHistory} from "history";
import Footer from "./footer";
import {Router} from "react-router";

it(`Footer should render correctly`, () => {
  const history = createMemoryHistory();
  const {container} = render(
      <Router history={history}>
        <Footer />
      </Router>
  );

  expect(container).toMatchSnapshot();
});
