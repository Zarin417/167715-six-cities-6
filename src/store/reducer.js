import {ActionType} from "./action";
import {CITIES} from "../const";
import offers from "../mocks/offers";

const initialState = {
  currentCity: CITIES[0],
  offers
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        currentCity: action.payload
      };
    default:
      return state;
  }
};

export {reducer};
