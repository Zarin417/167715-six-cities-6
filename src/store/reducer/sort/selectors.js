import {createSelector} from "reselect";
import {NameSpace} from "../root-reducer";
import {getActiveCityPlaces} from "../offers/selectors";
import {SortType} from "../../../const";
import {sortOffersByRating, sortOffersHighToLowPrice, sortOffersLowToHighPrice} from "../../../utils";

export const getSortType = (state) => state[NameSpace.SORT].sortType;

export const getSortedPlaces = createSelector(
    [getActiveCityPlaces, getSortType],
    (offers, sortType) => {
      let sortedList = offers.slice();

      switch (sortType) {
        case SortType.TOP_RATED:
          sortOffersByRating(sortedList);
          break;

        case SortType.PRICE_HIGHT_TO_LOW:
          sortOffersHighToLowPrice(sortedList);
          break;

        case SortType.PRICE_LOW_TO_HIGHT:
          sortOffersLowToHighPrice(sortedList);
          break;

        default:
          break;
      }

      return sortedList;
    }
);
