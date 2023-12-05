import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import SListe from "../components/listen/SListe";

class Systemuebersicht extends React.Component {

    render() {

        const hauptbox = {
            height: "850px",
            marginBottom: "50px",
            background: "#59841d",
            color: "#FFF",
            borderRadius: "8px",
        }

        const container1 = {
            marginTop: "100px",
        }


        const button2 = {
            width:"300px",
            background: "#0067ac",
            position: "absolute",
            left: "41%",
            marginTop: "2%"
        }

        const link ={
            color: '#FFF',
            textDecoration: "none"
        }



        return (
            <div className="systemuebersicht" style={hauptbox}>
                <Container style={container1}>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <SListe/>
                            </div>
                        </Col>
                        <Container>
                            <Button style={button2}>
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

export default Systemuebersicht