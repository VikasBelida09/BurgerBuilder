import React from "react";
import classes from "./Order.module.css";
const Order = (props) => {
  const ingredients = [];
  for (let ingre in props.ingredients) {
    ingredients.push({
      name: props.ingredients,
      amount: props.ingredients[ingre],
    });
  }
  const ingreOutput = ingredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "captalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px",
          padding:'1px'
        }}
      >
      {JSON.stringify(ig.name)} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients:{ingreOutput}</p>
      <p>
        Price: <strong>USD:{props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
