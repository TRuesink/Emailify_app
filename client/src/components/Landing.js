import React, { Component } from "react";
import { connect } from "react-redux";

class Landing extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Emailify!</h1>
        Collect feedback from your users
      </div>
    );
  }
}

export default Landing;
