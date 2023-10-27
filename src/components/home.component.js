import React, { Component } from "react";

import UserService from "../services/user.service";
import SpinnerKraftwerk from "./spinner/SpinnerKraftwerk";
import {Button, ButtonGroup, DropdownButton} from "react-bootstrap";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";

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
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            menuOpen: !prevState.menuOpen // Menüstatus umkehren
        }));
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

        const button = {
            marginBottom: "5%",
            marginLeft: "95%"
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
                            {this.state.menuOpen && ( // Menü basierend auf dem Menüstatus anzeigen oder ausblenden
                                <div>
                                    {// Hier können Sie Ihren Menüinhalt einfügen
                                    }
                                    <p>Menüinhalt</p>
                                </div>
                            )}
                            <div>
                                <Button style={button} onClick={this.toggleMenu}>
                                    {// onClick-Funktion hinzufügen, um den Menüstatus zu ändern
                                    }
                                    <BsGearFill/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}