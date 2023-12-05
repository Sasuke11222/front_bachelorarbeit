import React, {Component, useState} from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import {Link} from "react-router-dom";
import {Button, Dropdown, Offcanvas} from "react-bootstrap";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import StandortSelect from "./spinner/StandortSelect";

function Menue({name, ...props}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const button = {
        align: "end",
        marginTop: "80px",
        marginLeft: "95%"
    }

    return(
        <>
            <Button style={button} onClick={handleShow}>
                <BsGearFill/>
            </Button>
            <Offcanvas show={show} onHide={handleClose} {...props} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Adminbereich</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Dropdown.Item  href={"/register"}>Registrieren</Dropdown.Item>

                    <Dropdown.Item  href={"/addKraftwerk"}>Standort hinzufügen</Dropdown.Item>
                    <Dropdown.Item  href={"/Kraftwerk"}>Standorte verwalten</Dropdown.Item>

                    <Dropdown.Item  href={"/addVirenschutzhersteller"}>Virenschutzhersteller hinzufügen</Dropdown.Item>
                    <Dropdown.Item  href={"/Virenschutzhersteller"}>Virenschutzhersteller verwalten</Dropdown.Item>

                    <Dropdown.Item  href={"/addUSB"}>USB-Status hinzufügen</Dropdown.Item>
                    <Dropdown.Item  href={"/USB"}>USB-Status verwalten</Dropdown.Item>

                    <Dropdown.Item  href={"/addFirewall"}>Firewall-Status hinzufügen</Dropdown.Item>
                    <Dropdown.Item  href={"/Firewall"}>Firewall-Status verwalten</Dropdown.Item>

                    <Dropdown.Item  href={"/addRJ45"}>RJ45-Status hinzufügen</Dropdown.Item>
                    <Dropdown.Item  href={"/RJ45"}>RJ45-Status verwalten</Dropdown.Item>

                    <Dropdown.Item  href={"/addVirenschutz"}>Virenschutz-Status hinzufügen</Dropdown.Item>
                    <Dropdown.Item  href={"/Virenschutz"}>Virenschutz-Status verwalten</Dropdown.Item>

                    <Dropdown.Item href={"/addSystemtyp"}>Systemtyp hinzufügen</Dropdown.Item>
                    <Dropdown.Item href={"/Systemtyp"}>Systemtyp verwalten</Dropdown.Item>

                    <Dropdown.Item href={"/addSystemeinheit"}>Systemeinheit hinzufügen</Dropdown.Item>
                    <Dropdown.Item href={"/Systemeinheit"}>Systemeinheit verwalten</Dropdown.Item>

                    <Dropdown.Item href={"/addOffice"}>Office hinzufügen</Dropdown.Item>
                    <Dropdown.Item href={"/Office"}>Office verwalten</Dropdown.Item>

                    <Dropdown.Item href={"/addZone"}>Zone hinzufügen</Dropdown.Item>
                    <Dropdown.Item href={"/Zone"}>Zone verwalten</Dropdown.Item>

                    <Dropdown.Item href={"/addKrit"}>Kritikalität hinzufügen</Dropdown.Item>
                    <Dropdown.Item href={"/Krit"}>Kritikalität verwalten</Dropdown.Item>

                    <Dropdown.Item href={"/addKontotyp"}>Kontotyp hinzufügen</Dropdown.Item>
                    <Dropdown.Item href={"/Kontotyp"}>Kontotyp verwalten</Dropdown.Item>

                    <Dropdown.Item href={"/addKontoart"}>Kontoart hinzufügen</Dropdown.Item>
                    <Dropdown.Item href={"/Kontoart"}>Kontoart verwalten</Dropdown.Item>

                    <Dropdown.Item href={"/addBetriebssystem"}>Betriebssystem hinzufügen</Dropdown.Item>
                    <Dropdown.Item href={"/Betriebssystem"}>Betriebssystem verwalten</Dropdown.Item>

                    <Dropdown.Item href={"/addSystem"}>System hinzufügen</Dropdown.Item>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default class BoardAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
            currentStandort:"",
            content: ""
        };
    }

    componentDidMount() {
        UserService.getAdminBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    render() {
        const { currentUser} = this.state;
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
            <>
                {currentUser ? (
                    <div>
                        <a>Test</a>

                    </div>
                ) : (
                    <div className="container">
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
                    </div>
                )}
            </>
        );
    }
}