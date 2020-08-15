import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  return (
    <div>
      <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(" ")}
        onClick={props.clicked}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
