import React, { Component } from "react";
import MitarbeiterDataService from "../../services/mitarbeiter.service";
import {Row, Container, Button} from "react-bootstrap";
import KraftwerkeDataService from "../../services/kraftwerk.service";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";


//Seite für Generierung der Mitarbeiterliste
export default class Mitarbeiterliste extends Component {
    constructor(props) {
        super(props);
        this.retrieveMitarbeiter = this.retrieveMitarbeiter.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMitarbeiter = this.setActiveMitarbeiter.bind(this);
        this.deleteMitarbeiter = this.deleteMitarbeiter.bind(this);
        this.updateMitarbeiter = this.updateMitarbeiter.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleView = this.handleView.bind(this);
        this.ChangeNachname = this.ChangeNachname.bind(this);
        this.ChangeVorname = this.ChangeVorname.bind(this);
        this.ChangeAbteilung = this.ChangeAbteilung.bind(this);
        this.ChangeTelefon = this.ChangeTelefon.bind(this);
        this.ChangeMail = this.ChangeMail.bind(this);
        this.updateMitarbeiter = this.updateMitarbeiter.bind(this);

        this.state = {
            mitarbeiter: [], //erstellt Array mit allen Mitarbeitern
            aktuellerMitarbeiter: null, //setzt aktuellen Mitarbeiter auf Null, da man erst auswählen muss
            currentIndex: -1,
            currentStandort: undefined,
            mitarbeiter_id: null,
            aktuelleKraftwerk: null,
            kraftwerke: [],
            kw_id: {
                kw_id: "",
                kraftwerk_name: "",
                kraftwerksleiter: "",
                zoneninstanzbesitzer: "",
                systemkoordinator: "",
            },
        };
    }

    componentDidMount() {
        const kraftwerk = KraftwerkeDataService.getCurrentKraftwerk();

        if (kraftwerk) {
            this.setState({
                currentStandort: kraftwerk.kraftwerk_name,
            });
        }
        this.retrieveMitarbeiter();
        this.fetchKraftwerke();
    }

    handleView(index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
        });
    }

    handleCancel(e) {
        this.setState({
            currentIndex: -1,
            viewMode: false,
            aktuellerMitarbeiter: {}
        });
        e.preventDefault();
    }

    deleteMitarbeiter(mitarbeiter_id, index) {
        MitarbeiterDataService.deleteMitarbeiterByID(mitarbeiter_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des Mitarbeiters
    updateMitarbeiter() {
        const { nachname, vorname, abteilung, telefon, mail, aktuellerMitarbeiter } = this.state;
        MitarbeiterDataService.update(aktuellerMitarbeiter.mitarbeiter_id, nachname, vorname, abteilung, telefon, mail)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    ChangeNachname(e) {
        const nachname = e.target.value;

        this.setState(prevState => ({
            aktuellerMitarbeiter: {
                ...prevState.aktuellerMitarbeiter,
                nachname: nachname
            }
        }));
    }

    ChangeVorname(e) {
        const vorname = e.target.value;

        this.setState(prevState => ({
            aktuellerMitarbeiter: {
                ...prevState.aktuellerMitarbeiter,
                vorname: vorname
            }
        }));
    }

    ChangeAbteilung(e) {
        const abteilung = e.target.value;

        this.setState(prevState => ({
            aktuellerMitarbeiter: {
                ...prevState.aktuellerMitarbeiter,
                abteilung: abteilung
            }
        }));
    }

    ChangeTelefon(e) {
        const telefon = e.target.value;

        this.setState(prevState => ({
            aktuellerMitarbeiter: {
                ...prevState.aktuellerMitarbeiter,
                telefon: telefon
            }
        }));
    }

    ChangeMail(e) {
        const mail = e.target.value;

        this.setState(prevState => ({
            aktuellerMitarbeiter: {
                ...prevState.aktuellerMitarbeiter,
                mail: mail
            }
        }));
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

    setActiveMitarbeiter(mitarbeiter, index) {
        const mitarbeiter_id = mitarbeiter.mitarbeiter_id;
        if (mitarbeiter.kw_id) {
            this.setState({
                aktuellerMitarbeiter: mitarbeiter,
                mitarbeiter_id: mitarbeiter_id,
                currentIndex: index,
                aktuelleKraftwerk: mitarbeiter.kw_id.kraftwerk_name
            });
        } else {
            this.setState({
                aktuellerMitarbeiter: mitarbeiter,
                mitarbeiter_id: mitarbeiter_id,
                currentIndex: index,
                aktuelleKraftwerk: null
            });
        }
    }

    fetchKraftwerke() {
        fetch('http://localhost:8080/api/kraftwerke')
            .then(response => response.json())
            .then(data => {
                // Finde den aktuellen Wert aus der Datenbank
                const selectedKraftwerk = data.find(kraftwerk => kraftwerk.kw_id === this.state.aktuelleKraftwerk.kraftwerk_name);
                console.log(this.state.mitarbeiter.kw_id.kraftwerk_name)

                this.setState({
                    kraftwerke: data,
                    // Setze den aktuellen Wert aus der Datenbank in den State
                    aktuelleKraftwerk: {
                        ...this.state.aktuelleKraftwerk,
                        kraftwerk_name: selectedKraftwerk.kraftwerk_name,
                        kraftwerksleiter: selectedKraftwerk.kraftwerksleiter,
                        zoneninstanzbesitzer: selectedKraftwerk.zoneninstanzbesitzer,
                        systemkoordinator: selectedKraftwerk.systemkoordinator,
                    },
                });
            })
            .catch(error =>
                console.error("Fehler beim Abrufen der Kraftwerke:", error)
            );
    }

    updateMitarbeiter = (event) => {
        event.preventDefault();
        // Hier der Code, um den Mitarbeiter in die Datenbank einzutragen
        //Konstanten für alle Mitarbeitereigenschaften, da die CreateMitarbeiter einzelne Parameter benötigt
        const { nachname, vorname, abteilung, telefon, mail, kw_id } = this.state.mitarbeiter;
        MitarbeiterDataService.update(nachname, vorname, abteilung, telefon, mail, kw_id);
        this.props.router.navigate("/mitarbeiter"); // Hier erfolgt die Weiterleitung zu den Mitarbeitern
        window.location.reload();
    }

    render() {
        const { mitarbeiter, aktuellerMitarbeiter, currentIndex, currentStandort, kraftwerke, aktuelleKraftwerk } = this.state;


        const h3 = {
            marginTop: "3px",
        }

        const text = {
            color: "#000"
        }

        const container = {
            maxHeight: "75%"
        }

        const button1 = {
            marginTop: "1%",
            marginLeft: "2%"
        }

        const button2 = {
            marginTop: "1%",
            marginLeft: "2%",
        }

        const auswahl = {
            marginTop: "1%",
            marginLeft: "1%",
            width: "75%"
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

                                            <Button style={button1}
                                                    onClick={() => this.handleView(currentIndex)}
                                            >
                                                <BsGearFill/>
                                            </Button>

                                            <Button variant="danger" style={button2}
                                                    onClick={() => this.deleteMitarbeiter(aktuellerMitarbeiter.mitarbeiter_id, currentIndex)}
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
                            {this.state.viewMode && (
                                <div
                                    className={
                                        "modal " + (this.state.viewMode ? "displayBlock" : "displayNone")
                                    }
                                >
                                    <div className="modal-content" style={text}>
                                        <div>
                                            <h3>Mitarbeiterdaten</h3>
                                        </div>
                                        <label>
                                            <strong>Name:</strong>
                                        </label>{" "}
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nachname"
                                            value={this.state.aktuellerMitarbeiter.nachname}
                                            onChange={this.ChangeNachname}
                                        />
                                        <label>
                                            <strong>Vorname:</strong>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="vorname"
                                                value={this.state.aktuellerMitarbeiter.vorname}
                                                onChange={this.ChangeVorname}
                                            />
                                        </label>{" "}
                                        <label>
                                            <strong>Abteilung:</strong>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="abteilung"
                                                value={this.state.aktuellerMitarbeiter.abteilung}
                                                onChange={this.ChangeAbteilung}
                                            />
                                        </label>{" "}
                                        <label>
                                            <strong>Telefon:</strong>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="telefon"
                                                value={this.state.aktuellerMitarbeiter.telefon}
                                                onChange={this.ChangeTelefon}
                                            />
                                        </label>{" "}
                                        <label>
                                            <strong>E-Mail:</strong>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="mail"
                                                value={this.state.aktuellerMitarbeiter.mail}
                                                onChange={this.ChangeMail}
                                            />
                                        </label>{" "}
                                        <label>
                                            <strong>Kraftwerk: {this.state.aktuellerMitarbeiter.kw_id.kraftwerk_name}</strong>
                                            <select style={auswahl} value={aktuelleKraftwerk.kraftwerk_name} onChange={e => this.setState({ aktuelleKraftwerk: { ...aktuelleKraftwerk, kraftwerk_name: e.target.value } })}>
                                                <option value="">Bitte auswählen</option>
                                                {kraftwerke.map(kraftwerk => (
                                                    <option value={kraftwerk.kraftwerk_name}>{kraftwerk.kraftwerk_name}</option>
                                                ))}
                                            </select>
                                        </label>{" "}
                                        <Button style={button1}
                                                onClick={this.updateMitarbeiter}>
                                            Speichern
                                        </Button>
                                        <Button style={button1} onClick={(e) => this.handleCancel(e)}>Schließen</Button>
                                    </div>
                                </div>
                            )}
                        </>
                        ) : (
                        <div>Hallo</div>
                    )}

                </Container>
            </div>
        );
    }
}
