import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../HOC/withErrorHandler";
import { purchaseBurger } from "../../../Store/actions/index";
import { checkValidity } from "../../../Shared/utility";
class ContactData extends Component {
  state = {
    orderData: {
      name: {
        elementType: "input",
        elementConfig: {
          text: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          requred: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          text: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          requred: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          text: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          requred: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      Coountry: {
        elementType: "input",
        elementConfig: {
          text: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          requred: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          text: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          requred: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { vallue: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true,
        touched: false,
      },
    },
    formIsValid: false,
  };
  orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (let key in this.state.orderData) {
      formData[key] = this.state.orderData[key].value;
    }
    const Order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(Order, this.props.token);
  };

  inputChangeHandler = (event, identifier) => {
    const updatedOrderForm = {
      ...this.state.orderData,
    };
    const updatedFormElement = {
      ...updatedOrderForm[identifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[identifier] = updatedFormElement;
    let formIsValid = true;
    for (let key in updatedOrderForm) {
      formIsValid = updatedOrderForm[key].valid && formIsValid;
    }
    this.setState({
      orderData: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };
  render() {
    const formEleArray = [];
    for (let key in this.state.orderData) {
      formEleArray.push({
        id: key,
        config: this.state.orderData[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formEleArray.map((formElement) => (
          <Input
            key={formElement.id}
            invalid={!formElement.config.valid}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            shoudlValidate={formElement.config.validation}
            value={formElement.config.value}
            touched={formElement.config.touched}
            changed={(event) => {
              this.inputChangeHandler(event, formElement.id);
            }}
          />
        ))}
        <Button
          disabled={!this.state.formIsValid}
          btnType="Success"
          clicked={this.orderHandler}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Address</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(purchaseBurger(orderData, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
