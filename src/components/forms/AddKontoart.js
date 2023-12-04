import React, { Component } from 'react';
import {Button, ButtonGroup, Container, Form} from "react-bootstrap";
import KontoartDataService from "../../services/kontoart.service";
import {withRouter} from "../../common/with-router";
import {Link} from "react-router-dom";

class AddKontoart extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            kontoarte: {
                kontoart: "",
            },
        };
    }

    //achtet auf Veränderungen in der Maske
    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState => ({
            kontoarte: {
                ...prevState.kontoarte,
                [name]: value,
            }
        })));
    }

    //Methode zum Abschicken des Formulares
    handleSubmit(e) {
        e.preventDefault();
        const { kontoart } = this.state.kontoarte;
        KontoartDataService.create(kontoart)
            .then(response => {
                this.setState({
                    kontoarte: "",
                });
                this.props.router.navigate("/");
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { kontoarte } = this.state;

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
                <h2>Neue Kontoart</h2>
                <Form style={formular} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="status">
                        <Form.Label><strong>Bezeichnung:</strong></Form.Label>
                        <Form.Control style={eingabe} type="text" name="kontoart" value={kontoarte.kontoart} onChange={this.handleChange} required />
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
                                to={"/Firewall"}>
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

export default withRouter(AddKontoart);