import React, { Component } from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../HOC/withErrorHandler";
import { connect } from "react-redux";
import * as orderAction from "../../Store/actions/order";
import Spinner from "../../Components/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount() {
    this.props.onInitOrders(this.props.token, this.props.userId);
  }
  render() {
    let order = <Spinner />;
    if (!this.props.loading) {
      order = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    }
    return order;
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitOrders: (token, userId) =>
      dispatch(orderAction.fetchOrders(token, userId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
