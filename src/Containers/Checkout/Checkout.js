import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {
  onCheckoutCanceled = () => {
    this.props.history.goBack();
  };
  onCheckoutContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary=<Redirect  to='/'/>
    if(this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            onCheckoutCanceled={this.onCheckoutCanceled}
            onCheckoutContinue={this.onCheckoutContinue}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};
export default connect(mapStateToProps)(Checkout);
