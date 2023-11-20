import React, { Component } from 'react';
import MitarbeiterDataService from "../../services/mitarbeiter.service";
import {Button, Container} from "react-bootstrap";
import {withRouter} from "../../common/with-router";

class AddMitarbeiter extends Component {
    constructor(props) {
        super(props);
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
        this.fetchKraftwerke();
    }

    //Ruft alle Kraftwerke aus der Datenbank auf und zeigt sie im Auswahlmenü an
    fetchKraftwerke() {
        fetch('http://localhost:8080/api/kraftwerke')
            .then(response => response.json())
            .then(data => { this.setState({ kraftwerke: data, }); })
            .catch(error => { console.error('Fehler beim Abrufen der Kraftwerke:', error); });
    }

    //achtet auf Veränderungen in der Maske
    handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'kw_id') {
            const selectedKraftwerk = this.state.kraftwerke.find(kraftwerk => kraftwerk.kraftwerk_name === value);
            this.setState(prevState => ({
                mitarbeiter: {
                    ...prevState.mitarbeiter,
                    kw_id: {
                        ...prevState.mitarbeiter.kw_id,
                        kw_id: selectedKraftwerk.kw_id,
                        kraftwerk_name: selectedKraftwerk.kraftwerk_name,
                        kraftwerksleiter: selectedKraftwerk.kraftwerksleiter,
                        zoneninstanzbesitzer: selectedKraftwerk.zoneninstanzbesitzer,
                        systemkoordinator: selectedKraftwerk.systemkoordinator,
                    },
                }
            }));
        } else {
            this.setState(prevState => ({
                mitarbeiter: {
                    ...prevState.mitarbeiter,
                    // Entferne "mitarbeiter_id" aus dem Objekt
                    [name]: value,
                }
            }));
        }
    }

    //Methode zum Abschicken des Formulares
    handleSubmit = (event) => {
        event.preventDefault();
        // Hier der Code, um den Mitarbeiter in die Datenbank einzutragen
        //Konstanten für alle Mitarbeitereigenschaften, da die CreateMitarbeiter einzelne Parameter benötigt
        const { nachname, vorname, abteilung, telefon, mail, kw_id } = this.state.mitarbeiter;
        MitarbeiterDataService.createMitarbeiter(nachname, vorname, abteilung, telefon, mail, kw_id);
        this.props.router.navigate("/mitarbeiter"); // Hier erfolgt die Weiterleitung zu den Mitarbeitern
        window.location.reload();
    }

    render() {
        const { mitarbeiter, kraftwerke } = this.state;

        const button ={
            marginTop: "3%",
            marginBottom: "1%",
            width: "90%"
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

        const eingabe1 = {
            marginTop: "5%",
            marginLeft: "1%",
            width: "75%"
        }

        const eingabe2 = {
            marginTop: "1%",
            marginLeft: "1%",
            width: "75%"
        }

        const auswahl = {
            marginTop: "1%",
            marginLeft: "1%",
            width: "75%"
        }

        return (
            <Container style={hauptbox}>
                <form style={formular} onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input
                            style={eingabe1}
                            type="text"
                            name="nachname"
                            value={mitarbeiter.nachname}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Vorname:
                        <input
                            style={eingabe2}
                            type="text"
                            name="vorname"
                            value={mitarbeiter.vorname}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Abteilung:
                        <input
                            style={eingabe2}
                            type="text"
                            name="abteilung"
                            value={mitarbeiter.abteilung}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Mail:
                        <input
                            style={eingabe2}
                            type="text"
                            name="mail"
                            value={mitarbeiter.mail}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Telefon:
                        <input
                            style={eingabe2}
                            type="text"
                            name="telefon"
                            value={mitarbeiter.telefon}
                            onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Kraftwerk:
                        <select style={auswahl} name="kw_id" value={mitarbeiter.kw_id.kraftwerk_name} onChange={this.handleChange}>
                            <option value="">Bitte auswählen</option>
                            {kraftwerke.map(kraftwerk => (
                                <option key={kraftwerk.kw_id} value={kraftwerk.kraftwerk_name}>{kraftwerk.kraftwerk_name}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <Button variant="primary" type="submit" style={button}>
                        Speichern
                    </Button>
                </form>
            </Container>

        );
    }
}

export default withRouter(AddMitarbeiter);