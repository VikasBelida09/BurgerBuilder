import React, { Component } from "react";
import Aux from "../Auxxxx";
import classes from "./Layout.module.css";
import Toolbar from "../../Components/UI/Navigation/ToolBar/Toolbar";
import SideDrawer from "../../Components/UI/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  handleSideDrawer = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          toggleSideDrawer={this.handleSideDrawer}
          isAuthenticated={this.props.token}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuthenticated={this.props.token}
        />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(mapStateToProps, null)(Layout);
