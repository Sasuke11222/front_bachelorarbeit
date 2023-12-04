import React, { Component } from 'react';
import {Button, ButtonGroup, Container, Form} from "react-bootstrap";
import VirenschutzDataService from "../../services/virenschutz.service";
import {withRouter} from "../../common/with-router";
import {Link} from "react-router-dom";

class AddVirenschutz extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            status_virenschutz: {
                status: "",
            },
        };
    }

    //achtet auf Veränderungen in der Maske
    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState => ({
            status_virenschutz: {
                ...prevState.status_virenschutz,
                [name]: value,
            }
        })));
    }

    //Methode zum Abschicken des Formulares
    handleSubmit(e) {
        e.preventDefault();
        const { status } = this.state.status_virenschutz;
        VirenschutzDataService.create(status)
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
        const { status_virenschutz } = this.state;

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
                <h2>Neuer Virenschutz-Sperrstatus</h2>
                <Form style={formular} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="status">
                        <Form.Label><strong>Bezeichnung:</strong></Form.Label>
                        <Form.Control style={eingabe} type="text" name="status" value={status_virenschutz.status} onChange={this.handleChange} required />
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
                                to={"/Virenschutz"}>
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

export default withRouter(AddVirenschutz);