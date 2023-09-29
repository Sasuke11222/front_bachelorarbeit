import React from "react";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Kraftwerkform from "../components/forms/Kraftwerksdaten";
import KraftwerkeDataService from "../services/kraftwerk.service";
import SpinnerKraftwerk from "../components/spinner/SpinnerKraftwerk";


class Kraftwerksdaten extends React.Component {
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



        return (
            <div className="kraftwerksdaten">
                <Container style={container1}>
                    <Row>
                        <Col lg={12} style={hauptbox}>
                            <div>
                                <Kraftwerkform/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Kraftwerksdaten