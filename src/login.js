import React, { Component } from "react";
import ReactDom from "react-dom";
import "./login.less";
import logo from "./images/logo.jpg";

class Login extends Component {
  render() {
    return (
      <div className="wrap">
        <img src={logo} />
        Login
      </div>
    );
  }
}

ReactDom.render(<Login />, document.getElementById("root"));
