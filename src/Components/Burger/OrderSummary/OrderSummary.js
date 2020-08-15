import React from "react";
import Aux from "../../../HOC/Auxxxx";
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.module.css";
const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => (
    <li key={igKey}>
      <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
      {props.ingredients[igKey]}
    </li>
  ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue To checkout?</p>
      <p>
        <strong>Total Price:</strong>
        {props.price.toFixed(2)}
      </p>
      <div className={classes.buttons}>
        <Button btnType="Danger" clicked={props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </div>
    </Aux>
  );
};

export default OrderSummary;
