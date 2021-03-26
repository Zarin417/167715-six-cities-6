export const ActionType = {
  CHANGE_CITY: `main/changeCity`,
  CHANGE_SORT: `main/changeSort`
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  }),
  changeSort: (sortType) => ({
    type: ActionType.CHANGE_SORT,
    payload: sortType
  })
};
