import React, { Component } from "react";
import Aux from "../../HOC/Auxxxx";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler";
import { connect } from "react-redux";
import * as burger from "../../Store/actions/index";
class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    showLoading: false,
  };
  componentDidMount() {
    this.props.onInitIngredients();
  }
  purchaseHandler = () => {
    if (!this.props.token) {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
      console.log("i am inside the purchase handler.");
    } else {
      this.setState({
        purchasing: true,
      });
    }
  };
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push({
      pathname: "/checkout",
    });
  };
  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = <Spinner />;
    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientremoved={this.props.onIngredientRemove}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuthenticated={this.props.token}
          />
        </Aux>
      );
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    token: state.auth.token,
  };
};
const mapDispatchTOProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(burger.addIngredient(ingName)),
    onIngredientRemove: (ingName) => dispatch(burger.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burger.initIngredients()),
    onInitPurchase: () => dispatch(burger.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(burger.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchTOProps
)(withErrorHandler(BurgerBuilder, axios));
