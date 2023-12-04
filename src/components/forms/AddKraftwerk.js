import React, { Component } from 'react';
import MitarbeiterDataService from "../../services/mitarbeiter.service";
import  KraftwerkDataService from "../../services/kraftwerk.service";
import {Button, Container, Form} from "react-bootstrap";
import {withRouter} from "../../common/with-router";

class AddKraftwerk extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            kraftwerk: {
                kraftwerk_name: "",
                kraftwerksleiter: "",
                zoneninstanzbesitzer: "",
                systemkoordinator: ""
            },
        };
    }


    //achtet auf Veränderungen in der Maske
    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState => ({
            kraftwerk: {
                ...prevState.kraftwerk,
                [name]: value,
            }
        })));
    }

    //Methode zum Abschicken des Formulares
    handleSubmit(e) {
        e.preventDefault();
        const { kraftwerk_name, kraftwerksleiter, zoneninstanzbesitzer, systemkoordinator } = this.state.kraftwerk;
        KraftwerkDataService.create(kraftwerk_name, kraftwerksleiter, zoneninstanzbesitzer, systemkoordinator)
            .then(response => {
                this.setState({
                    kraftwerk_name: "",
                    kraftwerksleiter: "",
                    zoneninstanzbesitzer: "",
                    systemkoordinator: "",
                });
                this.props.router.navigate("/");
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { kraftwerk } = this.state;

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

        return (
            <Container style={hauptbox}>
                <h2>Neuer Standort</h2>
                <Form style={formular} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="kraftwerk_name">
                        <Form.Label><strong>Standortname:</strong> </Form.Label>
                        <Form.Control style={eingabe} type="text" name="kraftwerk_name" value={kraftwerk.kraftwerk_name} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="kraftwerksleiter">
                        <Form.Label><strong>Kraftwerksleiter:</strong> </Form.Label>
                        <Form.Control style={eingabe} type="text" name="kraftwerksleiter" value={kraftwerk.kraftwerksleiter} onChange={this.handleChange}  required/>
                    </Form.Group>
                    <Form.Group controlId="zoneninstanzbesitzer">
                        <Form.Label><strong>Zoneninstanzbesitzer:</strong> </Form.Label>
                        <Form.Control style={eingabe} type="text" name="zoneninstanzbesitzer" value={kraftwerk.zoneninstanzbesitzer} onChange={this.handleChange}  required/>
                    </Form.Group>
                    <Form.Group controlId="systemkoordinator">
                        <Form.Label><strong>Systemkoordinator:</strong> </Form.Label>
                        <Form.Control style={eingabe} type="text" name="systemkoordinator" value={kraftwerk.systemkoordinator} onChange={this.handleChange}  required/>
                    </Form.Group>
                    <Button style={button} type="submit">
                        Hinzufügen
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default withRouter(AddKraftwerk);