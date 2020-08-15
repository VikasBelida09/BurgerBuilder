import * as actionTypes from "./actions";
import axios from "../../axios-orders";
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
  };
};
export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};
export const fetchOrdersSuccess = (order) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    order: order,
  };
};
export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: error,
  };
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};
export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get(`/orders.json${queryParams}`)
      .then((resp) => {
        const fetchedOrders = [];
        for (let key in resp.data) {
          fetchedOrders.push({ ...resp.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
