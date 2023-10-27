import React, {Component} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import KraftwerkeDataService from "../services/kraftwerk.service";
import SpinnerKraftwerk from "../components/spinner/SpinnerKraftwerk";
class Hauptseite extends Component {
    constructor(props) {
    super(props);

    this.state = {
        currentStandort: undefined,
    };
}

/*
    componentWillUnmount() {
        localStorage.clear(); // Lokalen Speicher löschen
    }
 */

    componentDidMount() {
        const kraftwerk = KraftwerkeDataService.getCurrentKraftwerk();

        if (kraftwerk) {
            this.setState({
                currentStandort: kraftwerk,
            });
        }
    }
    render() {

        const { currentStandort} = this.state;

        const hauptbox = {
            height: "800px",
            maxHeight: "80%",
            marginBottom: "50px",
            background: "#59841d",
            color: "#FFF",
            borderRadius: "8px",
        }

        const container1 = {
            marginTop: "100px",
        }

        const container2 = {
            width: "300px",
            height: "750px",
            maxHeight: "95%",
            background: "#54616c",
            borderRadius: "6px",
            position: "absolute",
            left: "23%",
            color: "#000"
        }

        const container3 = {
            width: "300px",
            height: "750px",
            maxHeight: "750px",
            background: "#54616c",
            borderRadius: "6px",
            position: "absolute",
            left: "42%",
            color: "#000"
        }

        const container4 = {
            width: "300px",
            height: "750px",
            maxHeight: "750px",
            background: "#54616c",
            borderRadius: "6px",
            position: "absolute",
            left: "61%",
            color: "#000"
        }

        const container5 = {
            background: "#FFF"
        }

        const h3 = {
            marginTop: "3px",
            marginLeft: "10px"
        }

        const button = {
            width:"250px",
            background: "#57616c",
            marginTop: "15px",
            marginLeft: "3px",
            borderColor: '#FFF',
            hover:{
                backgroundColor:'#7ab929'
            }
        }

        const button2 = {
            width:"300px",
            background: "#0067ac",
            hover:{
                backgroundColor:'#7ab929'
            },
            position: "absolute",
            left: "42%",
            top: "100%"
        }

        const button3 = {
            width:"250px",
            background: "#57616c",
            marginTop: "95%",
            marginLeft: "3px",
            borderColor: '#FFF',
            hover:{
                backgroundColor:'#7ab929'
            }
        }

        const link ={
            color: '#FFF',
            textDecoration: "none"
        }

        return (
            <>
                <div className="hauptseite">
                    <Container style={container1}>
                        <Row>
                            <Col lg={16} style={hauptbox}>
                                {currentStandort ? (
                                <>
                                    <div className="navbar-nav ml-auto">
                                        <div>
                                            <h3 style={h3}>Standort {currentStandort.kraftwerk_name}</h3>
                                        </div>
                                        <div>
                                            <Container style={container2}>
                                                <h5 style={h3}>Datenpflege</h5>
                                                <Button style={button}>
                                                    <Link
                                                        style={link}
                                                        className="navbar-link"
                                                        to={"/systemuebersicht"}
                                                        >
                                                        Systeme
                                                    </Link>
                                                </Button>{' '}
                                                <Button style={button}>
                                                    <Link
                                                        style={link}
                                                        className="navbar-link"
                                                        to={"/komponentenuebersicht"}
                                                        onClick={this.forceUpdate}>
                                                        Komponenten
                                                    </Link>
                                                </Button>{' '}
                                                <Button style={button} disabled>Nutzerverwaltung</Button>{' '}
                                                <Button style={button3} disabled>Checkliste einlesen</Button>{' '}
                                            </Container>
                                            <Container style={container3}>
                                                <h5 style={h3} >Stammdaten</h5>
                                                <Button style={button}>
                                                    <Link
                                                        style={link}
                                                        className="navbar-link"
                                                        to={"/kraftwerksdaten"}>
                                                        Kraftwerksdaten
                                                    </Link>
                                                </Button>{' '}
                                                <Button style={button} >
                                                    <Link
                                                        style={link}
                                                        className="navbar-link"
                                                        to={"/mitarbeiter"}>
                                                        Mitarbeiter
                                                    </Link>
                                                </Button>{' '}
                                                <Button style={button} >
                                                    <Link
                                                        style={link}
                                                        className="navbar-link"
                                                        to={"/systemhersteller"}>
                                                        Systemhersteller
                                                    </Link>
                                                </Button>{' '}
                                            </Container>
                                            <Container style={container4}>
                                                <h5 style={h3}>Übersicht drucken</h5>
                                                <Button style={button} disabled>Systemübersicht</Button>{' '}
                                                <Button style={button} disabled>Komponentenübersicht</Button>{' '}
                                                <Button style={button} disabled>Komopnentenstatus</Button>{' '}
                                                <Button style={button} disabled>Lizenzübersicht</Button>{' '}
                                                <Button style={button} disabled>Nutzerübersicht</Button>{' '}
                                                <Button style={button} disabled>Hersteller/Model</Button>{' '}
                                            </Container>
                                        </div>
                                    </div>
                                    <div>
                                        <Container style={container5}>
                                            <Button style={button2}>
                                                <Link
                                                    style={link}
                                                    className="navbar-link"
                                                    to={"/"}>
                                                    Startseite
                                                </Link>
                                            </Button>{' '}
                                        </Container>
                                    </div>
                                </>
                                ) : (
                                    <>
                                        <SpinnerKraftwerk/>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default Hauptseite