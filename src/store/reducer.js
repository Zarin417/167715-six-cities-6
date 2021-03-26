import {ActionType} from "./action";
import {CITIES, SORT_TYPE} from "../const";
import offers from "../mocks/offers";

const initialState = {
  currentCity: CITIES[0],
  currentSortType: SORT_TYPE.POPULAR,
  offers
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        currentCity: action.payload
      };
    case ActionType.CHANGE_SORT:
      return {
        ...state,
        currentSortType: action.payload
      };
    default:
      return state;
  }
};

export {reducer};
