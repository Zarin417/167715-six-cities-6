import React from "react";
import {render} from "@testing-library/react";
import configureStore from "redux-mock-store";
import SortList from "./sort-list";
import {SortType} from "../../const";
import {Provider} from "react-redux";

const mockStore = configureStore({});

describe(`Test 'SortList'`, () => {
  it(`SortList should render correctly`, () => {
    const store = mockStore({
      SORT: {sortType: SortType.POPULAR}
    });

    const {container} = render(
        <Provider store={store}>
          <SortList />
        </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
