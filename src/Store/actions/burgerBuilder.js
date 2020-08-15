import * as actionTypes from "./actions";
import axios from "../../axios-orders";
export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredients: ingName,
  };
};
export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredients: ingName,
  };
};
const setIngredients = (ingre) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingre,
  };
};
export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((resp) => {
        dispatch(setIngredients(resp.data));
      })
      .catch((errr) => console.log(errr));
  };
};
