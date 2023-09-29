import React, { Component } from "react";
import MitarbeiterDataService from "../../services/mitarbeiter.service";
import {Row, Container, Button} from "react-bootstrap";
import KraftwerkeDataService from "../../services/kraftwerk.service";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";

//Seite für Generierung der Mitarbeiterliste
export default class Mitarbeiterliste extends Component {
    constructor(props) {
        super(props);
        this.retrieveMitarbeiter = this.retrieveMitarbeiter.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMitarbeiter = this.setActiveMitarbeiter.bind(this);

        this.state = {
            mitarbeiter: [], //erstellt Array mit allen Mitarbeitern
            aktuellerMitarbeiter: null, //setzt aktuellen Mitarbeiter auf Null, da man erst auswählen muss
            currentIndex: -1,
            currentStandort: undefined,
        };
    }

    componentDidMount() {
        const krafwerk = KraftwerkeDataService.getCurrentKraftwerk();

        if (krafwerk) {
            this.setState({
                currentStandort: krafwerk.kraftwerk_name,
            });
        }

        this.retrieveMitarbeiter();
    }

    deleteMitarbeiter(mitarbeiter_id) {
        MitarbeiterDataService.deleteMitarbeiterByID(mitarbeiter_id)
            .then(response => {
                // Handle success
                console.log(response);
                window.location.reload();
            })
            .catch(error => {
                // Handle error
                console.log(error);
            });

    }

    retrieveMitarbeiter() {
        MitarbeiterDataService.getAll()
            .then(response => {
                this.setState({
                    mitarbeiter: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveMitarbeiter();
        this.setState({
            aktuellerMitarbeiter: null,
            currentIndex: -1
        });
    }

    setActiveMitarbeiter(system, index) {
        this.setState({
            aktuellerMitarbeiter: system,
            currentIndex: index
        });
    }

    render() {
        const {mitarbeiter, aktuellerMitarbeiter, currentIndex, currentStandort } = this.state;


        const h3 = {
            marginTop: "3px",
        }

        const container = {
            maxHeight: "75%"
        }


        return (
            <div>
                <Container style={container}>
                    {currentStandort ? (
                        <>
                            <div className="col-md-8">
                                <h3 style={h3}>Mitarbeiter: {currentStandort}</h3>
                            </div>
                            <Row>
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        {mitarbeiter &&
                                        mitarbeiter.map((mitarbeiter, index) => (
                                            <li
                                                className={
                                                    "list-group-item " +
                                                    (index === currentIndex ? "active" : "")
                                                }
                                                onClick={() => this.setActiveMitarbeiter(mitarbeiter, index)}
                                                key={index}
                                            >
                                                {mitarbeiter.vorname + " " + mitarbeiter.nachname}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className="col-md-6">
                                    {aktuellerMitarbeiter ? (
                                        <div>
                                            <h4>Mitarbeiter</h4>
                                            <div>
                                                <label>
                                                    <strong>Name:</strong>
                                                </label>{" "}
                                                {aktuellerMitarbeiter.nachname}
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Vorname:</strong>
                                                </label>{" "}
                                                {aktuellerMitarbeiter.vorname}
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Abteilung:</strong>
                                                </label>{" "}
                                                {aktuellerMitarbeiter.abteilung}
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Telefon:</strong>
                                                </label>{" "}
                                                {aktuellerMitarbeiter.telefon}
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>E-Mail:</strong>
                                                </label>{" "}
                                                {aktuellerMitarbeiter.mail}
                                            </div>

                                            <Button
                                                onClick={this.deleteMitarbeiter}
                                            >
                                                <FaTrashAlt/>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <br />
                                            <p>Bitte wähle einen Mitarbeiter aus...</p>
                                        </div>
                                    )}
                                </div>
                            </Row>
                        </>
                        ) : (
                        <div>Hallo</div>
                    )}
                </Container>
            </div>
        );
    }
}
