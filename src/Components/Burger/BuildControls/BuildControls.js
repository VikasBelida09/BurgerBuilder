import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
];
const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          type={ctrl.type}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientremoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        disabled={!props.purchasable}
        className={classes.OrderButton}
        onClick={props.ordered}
      >
        {props.isAuthenticated ? "ORDER" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
