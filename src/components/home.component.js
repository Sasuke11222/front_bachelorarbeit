import React, { Component } from "react";

import UserService from "../services/user.service";
import SpinnerKraftwerk from "./spinner/SpinnerKraftwerk";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {

    const loginbox = {
      maxHeight: "75%",
      background: "#59841d",
      marginTop: "5%",
      height: "400px",
      color: "#FFF",
      borderRadius: "8px"
    }

    const text = {
      color: "#FFF",
      marginTop: "5%"
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col" lg={12} style={loginbox}>
            <div>
              <p style={text}>
                Bitte wählen sie einen Standort aus:
              </p>
              <div>
                <SpinnerKraftwerk/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
