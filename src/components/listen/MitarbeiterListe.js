import React, { Component } from "react";
import MitarbeiterDataService from "../../services/mitarbeiter.service";
import {Row, Container, Button, CloseButton, Form} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import KraftwerkDataService from "../../services/kraftwerk.service";
import AuthService from "../../services/auth.service";



//Seite für Generierung der Mitarbeiterliste
export default class MitarbeiterListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveMitarbeiter = this.retrieveMitarbeiter.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeNachname = this.ChangeNachname.bind(this);
        this.ChangeVorname = this.ChangeVorname.bind(this);
        this.ChangeAbteilung = this.ChangeAbteilung.bind(this);
        this.ChangeTelefon = this.ChangeTelefon.bind(this);
        this.ChangeMail = this.ChangeMail.bind(this);
        this.ChangeKraftwerk = this.ChangeKraftwerk.bind(this);
        this.setActiveMitarbeiter = this.setActiveMitarbeiter.bind(this);

        this.state = {
            mitarbeiter: [],
            aktuellerMitarbeiter: null,
            currentStandort: undefined,
            currentIndex: -1,
            mitarbeiter_id: null,
            showPopup: false,
            kraftwerke: [],
            disabled: true,
        };
    }

    componentDidMount() {
        const kraftwerk = KraftwerkDataService.getCurrentKraftwerk();

        if (kraftwerk) {
            this.setState({
                currentStandort: kraftwerk.kraftwerk_name,
            });
        }

        const user = AuthService.getCurrentUser();

        if (!user) {
            this.setState({
                currentUser: null,
                disabled: true,
            });
        } else {
            this.setState({
                currentUser: user,
                disabled: !user.roles.includes("ROLE_ADMIN") && !user.roles.includes("ROLE_MODERATOR"),
            });
        }

        this.retrieveMitarbeiter();
        this.refreshKraftwerk();
    }

    handleView(mitarbeiter, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuellerMitarbeiter: mitarbeiter
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    deleteMitarbeiter(mitarbeiter_id) {
        MitarbeiterDataService.delete(mitarbeiter_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateMitarbeiter = () => {
        fetch(`http://localhost:8080/api/mitarbeiter/${this.state.aktuellerMitarbeiter.mitarbeiter_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nachname: this.state.aktuellerMitarbeiter.nachname,
                vorname: this.state.aktuellerMitarbeiter.vorname,
                abteilung: this.state.aktuellerMitarbeiter.abteilung,
                telefon: this.state.aktuellerMitarbeiter.telefon,
                mail: this.state.aktuellerMitarbeiter.mail,
                kw_id: this.state.aktuellerMitarbeiter.kw_id,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                this.refreshList();
                this.setState({ viewMode: false });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    ChangeNachname(e) {
        const nachname = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellerMitarbeiter: {
                    ...prevState.aktuellerMitarbeiter,
                    nachname: nachname
                }
            };
        });
    }

    ChangeVorname(e) {
        const vorname = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellerMitarbeiter: {
                    ...prevState.aktuellerMitarbeiter,
                    vorname: vorname
                }
            };
        });
    }

    ChangeAbteilung(e) {
        const abteilung = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellerMitarbeiter: {
                    ...prevState.aktuellerMitarbeiter,
                    abteilung: abteilung
                }
            };
        });
    }

    ChangeTelefon(e) {
        const telefon = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellerMitarbeiter: {
                    ...prevState.aktuellerMitarbeiter,
                    telefon: telefon
                }
            };
        });
    }

    ChangeMail(e) {
        const mail = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellerMitarbeiter: {
                    ...prevState.aktuellerMitarbeiter,
                    mail: mail
                }
            };
        });
    }

    ChangeKraftwerk(e) {
        const { name, value } = e.target;
        if (name === 'kw_id'){
            const selectedKraftwerk = this.state.kraftwerke.find(kraftwerk => kraftwerk.kraftwerk_name === value);
            this.setState(prevState => ({
                aktuellerMitarbeiter: {
                    ...prevState.aktuellerMitarbeiter,
                    kw_id:{
                        ...prevState.mitarbeiter.kw_id,
                        kw_id: selectedKraftwerk.kw_id,
                        kraftwerk_name: selectedKraftwerk.kraftwerk_name,
                        kraftwerksleiter: selectedKraftwerk.kraftwerksleiter,
                        zoneninstanzbesitzer: selectedKraftwerk.zoneninstanzbesitzer,
                        systemkoordinator: selectedKraftwerk.systemkoordinator,
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                mitarbeiter: {
                    ...prevState.mitarbeiter,
                    [name]: value,
                }
            })));
        }
    }


    retrieveMitarbeiter() {
        MitarbeiterDataService.getAll()
            .then(response => {
                this.setState({
                    mitarbeiter: response.data,
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
            });
        } else {
            this.setState({
                aktuellerMitarbeiter: mitarbeiter,
                mitarbeiter_id: mitarbeiter_id,
                currentIndex: index,
            });
        }
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

    render() {
        const { mitarbeiter, aktuellerMitarbeiter, currentIndex, currentStandort, kraftwerke, disabled} = this.state;

        const h3 = {
            marginTop: "2%",
            marginBottom: "1%"
        }

        const text = {
            color: "#000"
        }

        const container = {
            maxHeight: "75%"
        }

        const button = {
            marginTop: "5%",
            marginLeft: "2%"
        }

        const button1 = {
            marginTop: "5%",
            marginLeft: "2%"
        }

        return (
            <div >
                <Container style={container}>
                    {currentStandort ? (
                        <>
                            <div className="col-md-8">
                                <h3 style={h3}>Mitarbeiterliste: {currentStandort}</h3>
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
                                                    <strong>Nachname: </strong> {aktuellerMitarbeiter.nachname}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Vorname: </strong> {aktuellerMitarbeiter.vorname}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Abteilung: </strong> {aktuellerMitarbeiter.abteilung}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Telefon: </strong> {aktuellerMitarbeiter.telefon}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>E-Mail: </strong> {aktuellerMitarbeiter.mail}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Standort: </strong> {aktuellerMitarbeiter.kw_id.kraftwerk_name}
                                                </label>
                                            </div>
                                            <div>
                                                <Button style={button1} variant="success" disabled={disabled}
                                                        onClick={() => this.handleView(aktuellerMitarbeiter)}
                                                >
                                                    <BsGearFill/>
                                                </Button>

                                                <Button style={button} variant="danger" disabled={disabled}
                                                        onClick={() => this.deleteMitarbeiter(aktuellerMitarbeiter.mitarbeiter_id, currentIndex)}
                                                >
                                                    <FaTrashAlt/>
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <br />
                                            <p>Bitte wähle ein Mitarbeiter aus...</p>
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
                                        <div className="modal-header"
                                             style={{ display: 'block', position: 'initial' }}
                                        >
                                            <CloseButton className="modal-header" onClick={(e) => this.handleCancel(e)}/>
                                        </div>
                                        <div>
                                            <h3>Mitarbeiterdaten</h3>
                                        </div>
                                        <label>
                                            <strong>Nachname:</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nachname"
                                            value={this.state.aktuellerMitarbeiter.nachname}
                                            onChange={this.ChangeNachname}
                                        />
                                        <label>
                                            <strong>Vorname:</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="vorname"
                                            value={this.state.aktuellerMitarbeiter.vorname}
                                            onChange={this.ChangeVorname}
                                        />
                                        <label>
                                            <strong>Abteilung:</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="abteilung"
                                            value={this.state.aktuellerMitarbeiter.abteilung}
                                            onChange={this.ChangeAbteilung}
                                        />
                                        <label>
                                            <strong>Telefon:</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="telefon"
                                            value={this.state.aktuellerMitarbeiter.telefon}
                                            onChange={this.ChangeTelefon}
                                        />
                                        <label>
                                            <strong>E-Mail:</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="mail"
                                            value={this.state.aktuellerMitarbeiter.mail}
                                            onChange={this.ChangeMail}
                                        />
                                        <label>
                                            <strong>Standort: </strong>
                                        </label>
                                        <Form.Control as="select" name="kw_id" value={aktuellerMitarbeiter.kw_id.kraftwerk_name} onChange={this.ChangeKraftwerk}>
                                            <option value="">Standorte</option>
                                            {
                                                kraftwerke.map((kw) => (
                                                <option key={kw.kw_id} value={kw.kraftwerk_name}>
                                                    {kw.kraftwerk_name}
                                                </option>
                                            ))
                                            }
                                        </Form.Control>
                                        <Button style={button1}
                                                onClick={this.updateMitarbeiter}
                                        >
                                            Speichern
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (<div>Hallo</div>)}
                </Container>
            </div>
        );
    }
}
