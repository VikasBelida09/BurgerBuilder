import * as actionTypes from "../actions/actions";
const initialState = {
  ingredients: null,
  totalPrice: 4,
  building: false,
};
const INGREDIENTS_PRICES = {
  salad: 1,
  cheese: 2,
  meat: 3,
  bacon: 0.5,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredients]: state.ingredients[action.ingredients] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredients],
        building: true,
      };
    case actionTypes.REMOVE_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredients]: state.ingredients[action.ingredients] - 1,
        },
        building: true,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredients],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        building: false,
      };
    default:
      return state;
  }
};
export default reducer;
