import React from "react";
import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Kraftwerkform from "../components/forms/Kraftwerksdaten";
import KraftwerkeDataService from "../services/kraftwerk.service";
import SpinnerKraftwerk from "../components/spinner/SpinnerKraftwerk";


class Kraftwerksdaten extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentStandort: undefined,
        };
    }

    componentDidMount() {
        const krafwerk = KraftwerkeDataService.getCurrentKraftwerk();

        if (krafwerk) {
            this.setState({
                currentStandort: krafwerk,
            });
        }
    }
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


        const h3 = {
            marginTop: "3px",
            marginLeft: "10px"
        }


        const button2 = {
            width:"600px",
            background: "#0067ac",
            hover:{
                backgroundColor:'#54616c'
            },
            marginBottom: "1%",
            marginLeft: "30px"
        }

        const link ={
            color: '#FFF',
            textDecoration: "none"
        }

        const button = {
            width:"600px",
            background: "#0067ac",
            hover:{
                backgroundColor:'#54616c'
            },
            marginBottom: "1%",
            marginLeft: "10%"
        }


        const button3 = {
            width:"300px",
            background: "#0067ac",
            hover:{
                backgroundColor:'#7ab929'
            },
            marginTop: "10px",
            marginLeft: "40%"
        }

        const { currentStandort} = this.state;



        return (
            <div className="kraftwerksdaten">
                <Container style={container1}>
                    <Row>
                        <Col lg={12} style={hauptbox}>
                            <div>
                                <h3 style={h3}>Kraftwerksdaten</h3>
                            </div>
                            <div>
                                <Kraftwerkform/>
                                <ButtonGroup>
                                    <Button style={button} disabled>
                                        <Link
                                            style={link}
                                            className="navbar-link">
                                            bearbeiten
                                        </Link>
                                    </Button>{' '}
                                    <Button style={button2} disabled>
                                        <Link
                                            style={link}
                                            className="navbar-link">
                                            Speichern
                                        </Link>
                                    </Button>{' '}
                                </ButtonGroup>
                            </div>
                        </Col>
                        <Container>
                            <Button style={button3}>
                                <Link
                                    style={link}
                                    className="navbar-link"
                                    to={"/hauptseite"}>
                                    Abbruch
                                </Link>
                            </Button>{' '}
                        </Container>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Kraftwerksdaten