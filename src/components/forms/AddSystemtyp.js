import React, { Component } from 'react';
import {Button, ButtonGroup, Container, Form} from "react-bootstrap";
import SystemtypDataService from "../../services/systemtyp.service";
import {withRouter} from "../../common/with-router";
import {Link} from "react-router-dom";

class AddSystemtyp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            systemtyp: {
                systemtyp_name: "",
            },
        };
    }

    //achtet auf Veränderungen in der Maske
    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState => ({
            systemtyp: {
                ...prevState.systemtyp,
                [name]: value,
            }
        })));
    }

    //Methode zum Abschicken des Formulares
    handleSubmit(e) {
        e.preventDefault();
        const { systemtyp_name } = this.state.systemtyp;
        SystemtypDataService.create(systemtyp_name)
            .then(response => {
                this.setState({
                    status: "",
                });
                this.props.router.navigate("/");
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { systemtyp } = this.state;

        const button ={
            marginTop: "3%",
            marginBottom: "1%",
            width: "75%"
        }

        const hauptbox = {
            maxHeight: "80%",
            marginBottom: "50px",
            background: "#59841d",
            color: "#FFF",
            borderRadius: "8px",
        }

        const formular = {
            marginLeft: "5%",
            marginTop: "5%",
            color: "#FFF",
        }

        const eingabe = {
            marginTop: "1%",
            width: "75%"
        }

        const link ={
            color: '#FFF',
            textDecoration: "none"
        }

        return (
            <Container style={hauptbox}>
                <h2>Neuer Systemtyp</h2>
                <Form style={formular} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="status">
                        <Form.Label><strong>Systemtypbezeichnung:</strong></Form.Label>
                        <Form.Control style={eingabe} type="text" name="systemtyp_name" value={systemtyp.systemtyp_name} onChange={this.handleChange} required />
                    </Form.Group>
                    <Button style={button} type="submit">
                        Speichern
                    </Button>
                    <br/>
                    <ButtonGroup>
                        <Button variant="danger" style={button}>
                            <Link
                                style={link}
                                className="navbar-link"
                                to={"/Systemtyp"}>
                                Abbruch
                            </Link>
                        </Button>{' '}
                        <Button style={button}>
                            <Link
                                style={link}
                                className="navbar-link"
                                to={"/"}>
                                Startseite
                            </Link>
                        </Button>{' '}
                    </ButtonGroup>
                </Form>
            </Container>
        );
    }
}

export default withRouter(AddSystemtyp);