import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import KraftwerkDataService from "../../services/kraftwerk.service";

class StandortSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: '',
            locations: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getAllLocations();
    }

    getAllLocations() {
        KraftwerkDataService.getAll()
            .then(response => {
                this.setState({
                    locations: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleChange(e) {
        this.setState({
            selectedLocation: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        KraftwerkDataService.get(this.state.selectedLocation)
            .then(response => {
            //console.log("Kraftwerk neu: " + sessionStorage.getItem('kraftwerk'));
            window.location.href = '/hauptseite';
        })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const button = {
            marginTop: "5%",
            marginBottom: "1%",
            width: "90%",
            backgroundColor: "#0067ac",
            color: "#FFF"
        }


        const formular = {
            marginLeft: "5%",
            width: "90%",
            marginTop: "2%",
            color: "#000",
        }

        return (
            <div>
                <Form style={formular} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="location">
                        <Form.Control as="select" value={this.state.selectedLocation} onChange={this.handleChange}>
                            <option value="">Standorte</option>
                            {this.state.locations.map((location, index) => (
                                <option key={index} value={location.kw_id}>{location.kraftwerk_name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button style={button} variant="primary" type="submit">Start</Button>
                </Form>
            </div>
        );
    }
}

export default StandortSelect;