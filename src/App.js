import React, { Component } from "react";
import Layout from "./HOC/Layout/Layout.js";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder.js";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Logout from "./Containers/Auth/Logout/Logout.js";
import { connect } from "react-redux";
import * as actions from "./Store/actions/index";
import asyncComponent from "./HOC/asyncComponents/asyncComponent.js";
const asyncCheckout = asyncComponent(() => {
  return import("./Containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
  return import("./Containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
  return import("./Containers/Auth/Auth");
});
class App extends Component {
  componentDidMount() {
    this.props.onAutoSignIn();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignIn: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
