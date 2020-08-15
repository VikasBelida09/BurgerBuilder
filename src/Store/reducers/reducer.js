import * as actionTypes from "../actions/actions";
import { updateObject } from "../../Shared/utility";
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
const addIngredients = (state, action) => {
  const updatedIngredient = {
    [action.ingredients]: state.ingredients[action.ingredients] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredients],
    building: true,
  };
  return updateObject(state, updatedState);
};
const removeIngredients = (state, action) => {
  const updatedIngredient = {
    [action.ingredients]: state.ingredients[action.ingredients] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredients],
    building: true,
  };
  return updateObject(state, updatedState);
};
const setIngredients = (state, action) => {
  const updatedState = {
    ingredients: action.ingredients,
    totalPrice: 4,
    building: false,
  };
  return updateObject(state, updatedState);
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredients(state, action);
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredients(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    default:
      return state;
  }
};
export default reducer;
