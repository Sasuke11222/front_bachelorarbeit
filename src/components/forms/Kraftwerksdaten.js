import React, {Component} from "react";
import {Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import KraftwerkeDataService from "../../services/kraftwerk.service";



class Kraftwerksdaten extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentStandort: undefined,
        };
    }

    componentDidMount() {
        const kraftwerk = KraftwerkeDataService.getCurrentKraftwerk();

        if (kraftwerk) {
            this.setState({
                currentStandort: kraftwerk,
            });
        }

    }
    render() {
        const hauptbox = {
            maxWidth: "200%",
            marginBottom: "50px",
            background: "#59841d",
            color: "#FFF",
            borderRadius: "8px",
        }


        const container1 = {
            marginTop: "100px",
            height: "800px"
        }



        const h3 = {
            marginTop: "3px",
            marginLeft: "10px"
        }

        const link ={
            color: '#FFF',
            textDecoration: "none"
        }

        const button2 = {
            width:"300px",
            background: "#0067ac",
            marginTop: "10px",
            marginLeft: "50%"
        }

        const button3 = {
            width:"300px",
            background: "#0067ac",
            marginTop: "10px",
            marginLeft: "5%"
        }

        const { currentStandort} = this.state;



        return (
            <>
                <div>
                    <Container style={container1}>
                        <Row>
                            <Col style={hauptbox}>
                                {currentStandort ? (
                                    <>
                                        <div>
                                            <h3 style={h3}>Kraftwerksdaten {currentStandort.kraftwerk_name}</h3>
                                        </div>
                                        <Form >
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <label htmlFor="kraftwerksleiter">Kraftwerksleiter:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="kraftwerksleiter"
                                                    value={currentStandort.kraftwerksleiter}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <label htmlFor="zoneninstanzbesitzer">Zoneninstanzbesitzer:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="zoneninstanzbesitzer"
                                                    value={currentStandort.zoneninstanzbesitzer}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <label htmlFor="systemkoordinator">Systemkoordinator:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="systemkoordinator"
                                                    value={currentStandort.systemkoordinator}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </>
                                ) : (
                                    <div>Hallo</div>
                                )}
                            </Col>
                            <Container>
                                <ButtonGroup>
                                    <Button style={button2}>
                                        <Link
                                            style={link}
                                            className="navbar-link"
                                            to={"/updatekraftwerksdaten"}>
                                            Bearbeiten
                                        </Link>
                                    </Button>{' '}
                                    <Button style={button3}>
                                        <Link
                                            style={link}
                                            className="navbar-link"
                                            to={"/hauptseite"}>
                                            Abbruch
                                        </Link>
                                    </Button>{' '}
                                </ButtonGroup>
                            </Container>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default Kraftwerksdaten