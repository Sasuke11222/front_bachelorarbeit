import React, {Component} from "react";
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import KraftwerkeDataService from "../services/kraftwerk.service";
import {withRouter} from "../common/with-router";
import ITElementMitFilterUndDetails from "../components/tables/ITElementMitFilterUndDetails";



class Komponentenuebersicht extends Component {

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
                currentStandort: kraftwerk.kraftwerk_name,
            });
        }

    }
    render() {
        const hauptbox = {
            height: "750px",
            marginBottom: "50px",
            background: "#59841d",
            color: "#FFF",
            borderRadius: "8px",
        }


        const container1 = {
            marginTop: "50px",
            maxHeight: "100%",
        }



        const h3 = {
            marginTop: "3px",
            marginLeft: "10px"
        }


        const button2 = {
            width:"300px",
            background: "#0067ac",
            marginLeft: "20px",
            marginBottom: "1%"
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
                        <div>
                            <div style={hauptbox}>
                                {currentStandort ? (
                                    <>
                                        <div>
                                            <h3 style={h3}>Komponentenübersicht: {currentStandort}</h3>
                                        </div>
                                        <Container>
                                            <ITElementMitFilterUndDetails/>
                                        </Container>
                                    </>
                                ) : (
                                    <div>Hallo</div>
                                )}
                            </div>
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
                        </div>
                    </Container>
                </div>
            </>
        );
    }
}

export default withRouter(Komponentenuebersicht);