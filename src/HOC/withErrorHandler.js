import React, { Component } from "react";
import Modal from "../Components/UI/Modal/Modal";
import Aux from "./Auxxxx";
const withErrorHandler = (WrappedCpmponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentDidMount() {
      this.requestInterceptor = axios.interceptors.request.use((req) => {
        this.setState({
          error: null,
        });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({
            error: error,
          });
        }
      );
    }
    componentWillMount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error?.message}
          </Modal>
          <WrappedCpmponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
