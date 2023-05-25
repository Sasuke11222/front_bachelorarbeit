import React, {Component} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Komponentenbericht from "../components/tables/Komponentenbericht";
import KraftwerkeDataService from "../services/kraftwerk.service";



class Komponentenuebersicht extends Component {

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
                currentStandort: krafwerk.kraftwerk_name,
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


        const button2 = {
            width:"300px",
            background: "#0067ac",
            hover:{
                backgroundColor:'#54616c'
            },
            marginLeft: "20px"
        }

        const link ={
            color: '#FFF',
            textDecoration: "none"
        }

        const button3 = {
            width:"300px",
            background: "#0067ac",
            hover:{
                backgroundColor:'#7ab929'
            },
            marginTop: "10px",
            marginLeft: "5%"
        }

        const { currentStandort} = this.state;



        return (
            <>
                <div className="komponentenuebersicht">
                    <Container style={container1}>
                        <Row>
                            <Col style={hauptbox}>
                                {currentStandort ? (
                                    <>
                                        <div>
                                            <h3 style={h3}>Komponentenübersicht: {currentStandort}</h3>
                                        </div>
                                        <Container>
                                            <Komponentenbericht/>
                                        </Container>
                                    </>
                                ) : (
                                    <div>Hallo</div>
                                )}
                            </Col>
                            <Container>
                                <Button style={button2}>
                                    <Link
                                        style={link}
                                        className="navbar-link"
                                        to={"/addKomponente"}>
                                        Neuer Datensatz
                                    </Link>
                                </Button>{' '}
                                <Button style={button2} disabled>
                                    <Link
                                        style={link}
                                        className="navbar-link"
                                    >
                                        Checkliste downloaden
                                    </Link>
                                </Button>{' '}
                                <Button style={button3}>
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
            </>
        );
    }
}

export default Komponentenuebersicht