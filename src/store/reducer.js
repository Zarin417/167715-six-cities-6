import {ActionType} from "./action";
import offers from "../mocks/offers";

const initialState = {
  currentCity: `Paris`,
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
