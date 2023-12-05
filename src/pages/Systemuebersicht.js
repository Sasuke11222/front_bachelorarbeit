import React from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import SListe from "../components/listen/SListe";

class Systemuebersicht extends React.Component {

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


        const button2 = {
            width:"300px",
            background: "#0067ac",
            hover:{
                backgroundColor:'#54616c'
            },
            marginBottom: "1%",
            marginLeft: "45%"
        }

        const link ={
            color: '#FFF',
            textDecoration: "none"
        }



        return (
            <div className="systemuebersicht">
                <Container style={container1}>
                    <Row>
                        <Col lg={12} style={hauptbox}>
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