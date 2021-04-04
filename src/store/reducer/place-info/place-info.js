import {ActionType} from "../../action-type";

const initialState = {
  placeInfo: null,
  isPlaceInfoLoaded: false
};

export const placeInfo = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_PLACE_INFO:
      return ({
        ...state,
        placeInfo: action.payload,
        isPlaceInfoLoaded: true
      });

    case ActionType.RESET_PLACE_INFO:
      return ({
        ...state,
        isPlaceInfoLoaded: false
      });

    default:
      return state;
  }
};
