import React, { Component } from 'react';
import MitarbeiterDataService from "../../services/mitarbeiter.service";
import  KraftwerkDataService from "../../services/kraftwerk.service";
import {Button, Container, Form} from "react-bootstrap";
import {withRouter} from "../../common/with-router";

class AddMitarbeiter extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            mitarbeiter: {
                nachname: "",
                vorname: "",
                abteilung: "",
                telefon: "",
                mail: "",
                kw_id: {
                    kw_id: "",
                    kraftwerk_name: "",
                    kraftwerksleiter: "",
                    zoneninstanzbesitzer: "",
                    systemkoordinator: "",
                }
            },
            kraftwerke: [],
        };
    }

    componentDidMount() {
        //this.fetchKraftwerke();
        this.refreshKraftwerk();
    }

    refreshKraftwerk() {

        KraftwerkDataService.getAll()
            .then(response => {
                this.setState({
                    kraftwerke: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    //Ruft alle Kraftwerke aus der Datenbank auf und zeigt sie im Auswahlmenü an
    fetchKraftwerke() {
        fetch('http://localhost:8080/api/kraftwerke')
            .then(response => response.json())
            .then(data => { this.setState({ kraftwerke: data, }); })
            .catch(error => { console.error('Fehler beim Abrufen der Kraftwerke:', error); });
    }

    //achtet auf Veränderungen in der Maske
    handleChange(e) {
        const { name, value } = e.target;
        if (name === 'kw_id'){
            const selectedKraftwerk = this.state.kraftwerke.find(kraftwerk => kraftwerk.kraftwerk_name === value);
            this.setState(prevState => ({
                mitarbeiter: {
                    ...prevState.mitarbeiter,
                    kw_id:{
                        ...prevState.mitarbeiter.kw_id,
                        kw_id: selectedKraftwerk.kw_id,
                        kraftwerk_name: selectedKraftwerk.kraftwerk_name,
                        kraftwerksleiter: selectedKraftwerk.kraftwerksleiter,
                        zoneninstanzbesitzer: selectedKraftwerk.zoneninstanzbesitzer,
                        systemkoordinator: selectedKraftwerk.sys,
                    },
                }
            }));
        }else {
            this.setState((prevState => ({
                mitarbeiter: {
                    ...prevState.mitarbeiter,
                    [name]: value,
                }
            })));
        }
    }

    //Methode zum Abschicken des Formulares
    handleSubmit(e) {
        e.preventDefault();
        const { nachname, vorname, abteilung, telefon, mail, kw_id } = this.state.mitarbeiter;
        MitarbeiterDataService.createMitarbeiter(nachname, vorname, abteilung, telefon, mail, kw_id)
            .then(response => {
                this.setState({
                    nachname: "",
                    vorname: "",
                    abteilung: "",
                    telefon: "",
                    mail: "",
                    kw_id: {
                        kw_id: "",
                        kraftwerk_name: "",
                        kraftwerksleiter: "",
                        zoneninstanzbesitzer: "",
                        systemkoordinator: "",
                    }
                });
                this.props.router.navigate("/mitarbeiter");
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { kraftwerke, mitarbeiter } = this.state;

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
            color: "#000",
        }

        const eingabe = {
            marginTop: "1%",
            width: "75%"
        }

        const auswahl = {
            marginTop: "1%",
            width: "75%"
        }

        return (
            <Container style={hauptbox}>
                <h2>Neuer Mitarbeiter</h2>
                <Form style={formular} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="nachname">
                        <Form.Label>Nachname: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="nachname" value={mitarbeiter.nachname} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="vorname">
                        <Form.Label>Vorname: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="vorname" value={mitarbeiter.vorname} onChange={this.handleChange}  required/>
                    </Form.Group>
                    <Form.Group controlId="abteilung">
                        <Form.Label>Abteilung: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="abteilung" value={mitarbeiter.abteilung} onChange={this.handleChange}  required/>
                    </Form.Group>
                    <Form.Group controlId="telefon">
                        <Form.Label>Telefon: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="telefon" value={mitarbeiter.telefon} onChange={this.handleChange}  required/>
                    </Form.Group>
                    <Form.Group controlId="mail">
                        <Form.Label>E-Mail: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="mail" value={mitarbeiter.mail} onChange={this.handleChange}  required/>
                    </Form.Group>
                    <Form.Group controlId="kw_id">
                        <Form.Label>Standort:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="kw_id" value={mitarbeiter.kw_id.kraftwerk_name} onChange={this.handleChange}>
                            <option value="">Standorte</option>
                            {kraftwerke.map((kw) => (
                                <option key={kw.kw_id} value={kw.kraftwerk_name}>
                                    {kw.kraftwerk_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button style={button} variant="primary" type="submit">
                        Hinzufügen
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default withRouter(AddMitarbeiter);