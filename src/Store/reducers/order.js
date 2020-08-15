import * as actionTypes from "../actions/actions";
import { updateObject } from "../../Shared/utility";

const initialState = {
  loading: false,
  orders: [],
  purchased: false,
};
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};
const fetchOrderSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.order,
    loading: false,
    error: "",
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.FETCH_ORDER_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDER_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action);
    default:
      return state;
  }
};
export default reducer;
