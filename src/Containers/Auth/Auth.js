import React, { Component } from "react";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { checkValidity } from "../../Shared/utility";
class Auth extends Component {
  state = {
    controls: {
      emails: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email ID",
        },
        value: "",
        validation: {
          requred: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          requred: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };
  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }
  inputHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.emails.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };
  SignUpModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };
  render() {
    const formEleArray = [];
    for (let key in this.state.controls) {
      formEleArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formEleArray.map((formElement) => (
      <Input
        key={formElement.id}
        invalid={!formElement.config.valid}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        shoudlValidate={formElement.config.validation}
        value={formElement.config.value}
        touched={formElement.config.touched}
        changed={(event) => {
          this.inputHandler(event, formElement.id);
        }}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMessage = "";
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    return (
      <div className={classes.Auth}>
        {this.props.token ? (
          <Redirect to={this.props.authRedirectPath} />
        ) : null}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">Sign In</Button>
        </form>
        <Button btnType="Danger" clicked={this.SignUpModeHandler}>
          Switch to {this.state.isSignUp ? `SIGN IN` : `SIGN UP`}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    token: state.auth.token,
    building: state.burgerBuilder.building,
    path: state.auth.authRedirectPath,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
