import React, {Component, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../services/auth.service";
import {Button, Dropdown, Offcanvas} from "react-bootstrap";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";


class Menue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
            disabled: true,
            show: false
        };

        this.setShow = this.setShow.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (!user) {
            this.setState({
                currentUser: null,
                disabled: true,
            });
        } else {
            this.setState({
                currentUser: user,
                disabled: !user.roles.includes("ROLE_ADMIN"),
            });
        }
    }


    setShow(e) {
        this.setState({
            show: true,
        });
        e.preventDefault();
    }

    handleCancel(e) {
        this.setState({
            show: false,
        });
        //e.preventDefault();
    }

    render() {
        const { currentUser, show, disabled} = this.state;

        const button = {
            align: "end",
            marginTop: "80px",
            marginLeft: "95%"
        }

        return (
            <div>
                {currentUser ? (
                    <div>
                        <Button style={button} onClick={this.setShow} disabled={disabled}
                        >
                            <BsGearFill />
                        </Button>
                        <Offcanvas show={show} onHide={this.handleCancel} placement={"end"}>
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
                    </div>
                ) : (
                    <Button style={button} disabled={disabled}
                    >
                        <BsGearFill />
                    </Button>
                )}
            </div>
        );
    }
}

export default Menue;
