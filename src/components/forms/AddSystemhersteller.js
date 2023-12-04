import React, { Component } from 'react';
import SystemherstellerDataService from "../../services/systemhersteller.service";
import {Button, Container, Form} from "react-bootstrap";
import {withRouter} from "../../common/with-router";

class AddSystemhersteller extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            systemhersteller: {
                herstellername: "",
            },
        };
    }

    //achtet auf Veränderungen in der Maske
    handleChange(e) {
        const { name, value } = e.target;
        this.setState((prevState => ({
            systemhersteller: {
                ...prevState.systemhersteller,
                [name]: value,
            }
        })));
    }

    //Methode zum Abschicken des Formulares
    handleSubmit(e) {
        e.preventDefault();
        const { herstellername } = this.state.systemhersteller;
        SystemherstellerDataService.create(herstellername)
            .then(response => {
                this.setState({
                    herstellername: "",
                });
                this.props.router.navigate("/systemhersteller");
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { systemhersteller } = this.state;

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
                <h2>Neuer Systemhersteller</h2>
                <Form style={formular} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="herstellername">
                        <Form.Label><strong>Herstellername:</strong></Form.Label>
                        <Form.Control style={eingabe} type="text" name="herstellername" value={systemhersteller.herstellername} onChange={this.handleChange} required />
                    </Form.Group>
                    <Button style={button} type="submit">
                        Hinzufügen
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default withRouter(AddSystemhersteller);