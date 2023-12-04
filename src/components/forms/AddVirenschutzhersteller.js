import React, { Component } from 'react';
import {Button, ButtonGroup, Container, Form} from "react-bootstrap";
import VirenschutzherstellerDataService from "../../services/virenschutzhersteller.service";
import {withRouter} from "../../common/with-router";
import {Link} from "react-router-dom";

class AddVirenschutzhersteller extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            virenschutzhersteller: {
                herstellername: "",
                version: ""
            },
        };
    }

    //achtet auf Veränderungen in der Maske
    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState => ({
            virenschutzhersteller: {
                ...prevState.virenschutzhersteller,
                [name]: value,
            }
        })));
    }

    //Methode zum Abschicken des Formulares
    handleSubmit(e) {
        e.preventDefault();
        const { herstellername, version } = this.state.virenschutzhersteller;
        VirenschutzherstellerDataService.create(herstellername, version)
            .then(response => {
                this.setState({
                    herstellername: "",
                    version: ""
                });
                this.props.router.navigate("/");
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { virenschutzhersteller } = this.state;

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
                <h2>Neuer Virenschutzhersteller</h2>
                <Form style={formular} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="herstellername">
                        <Form.Label><strong>Herstellername:</strong></Form.Label>
                        <Form.Control style={eingabe} type="text" name="herstellername" value={virenschutzhersteller.herstellername} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="version">
                        <Form.Label><strong>Version:</strong></Form.Label>
                        <Form.Control style={eingabe} type="text" name="version" value={virenschutzhersteller.version} onChange={this.handleChange} />
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

export default withRouter(AddVirenschutzhersteller);