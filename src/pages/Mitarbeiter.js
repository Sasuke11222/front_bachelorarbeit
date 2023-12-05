import React from "react";
import {Link} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";
import MitarbeiterListe from "../components/listen/MitarbeiterListe";
import AuthService from "../services/auth.service";


class Mitarbeiter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
        };
    }

    componentDidMount(){

        const user = AuthService.getCurrentUser();

        if (!user) {
            this.setState({
                currentUser: null,
                disabled: true,
            });
        } else {
            this.setState({
                currentUser: user,
                disabled: !user.roles.includes("ROLE_ADMIN") && !user.roles.includes("ROLE_MODERATOR"),
            });
        }
    }
    render() {
        const {disabled} = this.state;

        const hauptbox = {
            height: "800px",
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
            marginLeft: "40%",
            marginTop: "3%"
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
                            <Button style={button2} disabled={disabled}>
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
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Mitarbeiter