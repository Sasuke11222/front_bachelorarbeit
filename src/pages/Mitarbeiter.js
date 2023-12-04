import React from "react";
import {Link} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";
import MitarbeiterListe from "../components/listen/MitarbeiterListe";


class Mitarbeiter extends React.Component {
    render() {
        const hauptbox = {
            maxHeight: "80%",
            marginBottom: "50px",
            background: "#59841d",
            color: "#FFF",
            borderRadius: "8px",
        }

        const container1 = {
            marginTop: "100px",
        }

        const button = {
            width:"300px",
            background: "#0067ac",
            marginTop: "1%",
            marginLeft: "40%"
        }

        const button2 = {
            width:"300px",
            background: "#0067ac",
            marginLeft: "40%"
        }

        const link ={
            color: '#FFF',
            textDecoration: "none"
        }



        return (
            <div className="mitarbeiter">
                <Container style={container1}>
                    <Row>
                        <Col lg={12} style={hauptbox}>
                            <div>
                                <MitarbeiterListe/>
                            </div>
                        </Col>
                        <Container>
                                <Button style={button2} >
                                    <Link
                                        style={link}
                                        className="navbar-link"
                                        to={"/addMitarbeiter"}>
                                        Hinzufügen
                                    </Link>
                                </Button>{' '}
                            <Button style={button}>
                                <Link
                                    style={link}
                                    className="navbar-link"
                                    to={"/hauptseite"}>
                                    Hauptseite
                                </Link>
                            </Button>{' '}
                        </Container>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Mitarbeiter