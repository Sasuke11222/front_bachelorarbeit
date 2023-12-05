import React, {Component, useState} from "react";

import UserService from "../services/user.service";

import StandortSelect from "./spinner/StandortSelect";
import Menue from "./Menue";


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            menuOpen: false // Zustand für den Menüstatus hinzufügen
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
        UserService.getAdminBoard().then(
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

        UserService.getModeratorBoard().then(
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
            maxHeight: "100%",
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
                                <StandortSelect />
                            </div>
                            <div>
                                <Menue/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}