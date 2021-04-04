import React from "react";
import {render} from "@testing-library/react";
import FavoritesEmpty from "./favorites-empty";

it(`FavoritesEmpty should render correctly`, () => {
  const {container} = render(
      <FavoritesEmpty />
  );

  expect(container).toMatchSnapshot();
});
