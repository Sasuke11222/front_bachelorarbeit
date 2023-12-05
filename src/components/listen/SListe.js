import React, { Component } from "react";
import {Row, Container, Button, CloseButton, Form, ButtonGroup} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import SystemDataService from "../../services/system.service";
import KraftwerkDataService from "../../services/kraftwerk.service";
import KritikalitaetDataService from "../../services/kritikalitaet.service";
import SystemtypDataService from "../../services/systemtyp.service";
import ZoneDataService from "../../services/zone.service";
import MitarbeiterDataService from "../../services/mitarbeiter.service";
import AuthService from "../../services/auth.service";
import Col from "react-bootstrap/Col";

//Seite für Generierung der Systemliste
export default class SListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveSysteme = this.retrieveSysteme.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeName = this.ChangeName.bind(this);
        this.ChangeBeschreibung = this.ChangeBeschreibung.bind(this);
        this.ChangeErrichter = this.ChangeErrichter.bind(this);
        this.ChangeZugangsart = this.ChangeZugangsart.bind(this);
        this.ChangePDNDate = this.ChangePDNDate.bind(this);
        this.ChangeISMS_Auswirkung = this.ChangeISMS_Auswirkung.bind(this);
        this.ChangeISMS_Relevant = this.ChangeISMS_Relevant.bind(this);
        this.ChangeISMS_Reduzierung = this.ChangeISMS_Reduzierung.bind(this);
        this.ChangeISMS_Begruendung = this.ChangeISMS_Begruendung.bind(this);
        this.ChangeKraftwerk = this.ChangeKraftwerk.bind(this);
        this.ChangeSystemtyp = this.ChangeSystemtyp.bind(this);
        this.ChangeKrit = this.ChangeKrit.bind(this);
        this.ChangeZone = this.ChangeZone.bind(this);
        this.ChangeMitarbeiter = this.ChangeMitarbeiter.bind(this);
        this.setActiveSystem = this.setActiveSystem.bind(this);

        this.state = {
            systeme: [],
            aktuellesSystem: null,
            currentStandort: undefined,
            currentIndex: -1,
            system_id: null,
            showPopup: false,
            kraftwerke: [],
            systemtypen: [],
            kritikalitaeten: [],
            zonen: [],
            mitarbeiter: [],
            disabled: true,
        };
    }

    componentDidMount() {

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

        this.retrieveSysteme();
        this.refreshSystemtyp();
        this.refreshKrit();
        this.refreshZone();
        this.refreshKraftwerk();
        this.refreshMitarbeiter();
    }

    handleView(systeme, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuellesSystem: systeme
        });
    }

    handleView2(systeme, index) {

        this.setState({
            currentIndex: index,
            viewMode2: true,
            aktuellesSystem: systeme
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    handleCancel2(e) {
        this.setState({
            viewMode2: false,
        });
        e.preventDefault();
    }

    deleteSystem(system_id) {
        SystemDataService.delete(system_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateSystem = () => {
        fetch(`http://localhost:8080/api/systeme/${this.state.aktuellesSystem.system_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                system_name: this.state.aktuellesSystem.system_name,
                beschreibung: this.state.aktuellesSystem.beschreibung,
                systemtyp_id: this.state.aktuellesSystem.systemtyp_id,
                kritikalitaet_id: this.state.aktuellesSystem.kritikalitaet_id,
                zonen_id: this.state.aktuellesSystem.zonen_id,
                kw_id: this.state.aktuellesSystem.kw_id,
                mitarbeiter_id: this.state.aktuellesSystem.mitarbeiter_id,
                errichter: this.state.aktuellesSystem.errichter,
                zugangsart: this.state.aktuellesSystem.zugangsart,
                pdndate: this.state.aktuellesSystem.pdndate,
                isms_Begruendung: this.state.aktuellesSystem.isms_Begruendung,
                isms_Reduzierung: this.state.aktuellesSystem.isms_Reduzierung,
                isms_Relevant: this.state.aktuellesSystem.isms_Relevant,
                isms_Auswirkung: this.state.aktuellesSystem.isms_Auswirkung,
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

    ChangeName(e) {
        const system_name = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    system_name: system_name
                }
            };
        });
    }

    ChangeBeschreibung(e) {
        const beschreibung = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    beschreibung: beschreibung
                }
            };
        });
    }

    ChangeErrichter(e) {
        const errichter = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    errichter: errichter
                }
            };
        });
    }

    ChangeZugangsart(e) {
        const zugangsart = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    zugangsart: zugangsart
                }
            };
        });
    }

    ChangePDNDate(e) {
        const pdndate = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    pdndate: pdndate
                }
            };
        });
    }

    ChangeISMS_Auswirkung(e) {
        const isms_Auswirkung = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    isms_Auswirkung: isms_Auswirkung
                }
            };
        });
    }

    ChangeISMS_Relevant(e) {
        const isms_Relevant = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    isms_Relevant: isms_Relevant
                }
            };
        });
    }

    ChangeISMS_Reduzierung(e) {
        const isms_Reduzierung = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    isms_Reduzierung: isms_Reduzierung
                }
            };
        });
    }

    ChangeISMS_Begruendung(e) {
        const isms_Begruendung = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    isms_Begruendung: isms_Begruendung
                }
            };
        });
    }

    ChangeKraftwerk(e) {
        const { name, value } = e.target;
        if (name === 'kw_id'){
            const selectedKraftwerk = this.state.kraftwerke.find(kraftwerk => kraftwerk.kraftwerk_name === value);
            this.setState(prevState => ({
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    kw_id:{
                        ...prevState.systeme.kw_id,
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
                systeme: {
                    ...prevState.systeme,
                    [name]: value,
                }
            })));
        }
    }

    ChangeSystemtyp(e) {
        const { name, value } = e.target;
        if (name === 'systemtyp_id'){
            const selectedSystemtyp = this.state.systemtypen.find(systemtyp => systemtyp.systemtyp_name === value);
            this.setState(prevState => ({
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    systemtyp_id:{
                        ...prevState.systeme.systemtyp_id,
                        systemtyp_id: selectedSystemtyp.systemtyp_id,
                        systemtyp_name: selectedSystemtyp.systemtyp_name,
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                systeme: {
                    ...prevState.systeme,
                    [name]: value,
                }
            })));
        }
    }

    ChangeKrit(e) {
        const { name, value } = e.target;
        if (name === 'kritikalitaet_id'){
            const selectedKrit = this.state.kritikalitaeten.find(kritikalitaet => kritikalitaet.kritikalitaet_name === value);
            this.setState(prevState => ({
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    kritikalitaet_id:{
                        ...prevState.systeme.kritikalitaet_id,
                        kritikalitaet_id: selectedKrit.kritikalitaet_id,
                        kritikalitaet_name: selectedKrit.kritikalitaet_name,
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                systeme: {
                    ...prevState.systeme,
                    [name]: value,
                }
            })));
        }
    }

    ChangeZone(e) {
        const { name, value } = e.target;
        if (name === 'zonen_id'){
            const selectedZone = this.state.zonen.find(zone => zone.zone === value);
            this.setState(prevState => ({
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    zonen_id:{
                        ...prevState.systeme.zonen_id,
                        zonen_id: selectedZone.zonen_id,
                        zone: selectedZone.zone,
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                systeme: {
                    ...prevState.systeme,
                    [name]: value,
                }
            })));
        }
    }

    ChangeMitarbeiter(e) {
        const { name, value } = e.target;
        if (name === 'mitarbeiter_id'){
            const selectedMitarbeiter = this.state.mitarbeiter.find(mitarbeiter => mitarbeiter.nachname === value);
            this.setState(prevState => ({
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    mitarbeiter_id:{
                        ...prevState.systeme.mitarbeiter_id,
                        mitarbeiter_id: selectedMitarbeiter.mitarbeiter_id,
                        nachname: selectedMitarbeiter.nachname,
                        vorname: selectedMitarbeiter.vorname,
                        abteilung: selectedMitarbeiter.abteilung,
                        telefon: selectedMitarbeiter.telefon,
                        mail: selectedMitarbeiter.mail,
                        kw_id: {
                            kw_id: selectedMitarbeiter.kw_id.kw_id,
                            kraftwerk_name: selectedMitarbeiter.kw_id.kraftwerk_name,
                            kraftwerksleiter: selectedMitarbeiter.kw_id.kraftwerksleiter,
                            zoneninstanzbesitzer: selectedMitarbeiter.kw_id.zoneninstanzbesitzer,
                            systemkoordinator: selectedMitarbeiter.kw_id.systemkoordinator,
                        },
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                systeme: {
                    ...prevState.systeme,
                    [name]: value,
                }
            })));
        }
    }


    retrieveSysteme() {

        const kraftwerk = KraftwerkDataService.getCurrentKraftwerk();

        if (kraftwerk) {
            this.setState({
                currentStandort: kraftwerk.kraftwerk_name,
            });
        }

        const filteredsystem = SystemDataService.getCurrentSystem();
        if (kraftwerk.kw_id === 13) {
            SystemDataService.getAll()
                .then(response => {
                    this.setState({
                        systeme: response.data,
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            this.setState({
                systeme: filteredsystem,
            });
        }
    }

    refreshList() {
        this.retrieveSysteme();
        this.setState({
            aktuellesSystem: null,
            currentIndex: -1
        });
    }


    setActiveSystem(systeme, index) {
        const system_id = systeme.system_id;
        if (systeme.kw_id) {
            this.setState({
                aktuellesSystem: systeme,
                system_id: system_id,
                currentIndex: index,
            });
        } else {
            this.setState({
                aktuellesSystem: systeme,
                system_id: system_id,
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

    refreshSystemtyp() {

        SystemtypDataService.getAll()
            .then(response => {
                this.setState({
                    systemtypen: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshKrit() {

        KritikalitaetDataService.getAll()
            .then(response => {
                this.setState({
                    kritikalitaeten: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshZone() {

        ZoneDataService.getAll()
            .then(response => {
                this.setState({
                    zonen: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshMitarbeiter() {

        MitarbeiterDataService.getAll()
            .then(response => {
                this.setState({
                    mitarbeiter: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { systeme, aktuellesSystem, currentIndex, currentStandort, kraftwerke, systemtypen, kritikalitaeten, zonen, mitarbeiter, disabled} = this.state;

        const totalSysteme = systeme.length;
        if (totalSysteme === 0) return null;

        const h3 = {
            marginTop: "3%",
            marginBottom: "3%"
        }

        const h4 = {
            marginLeft: "1%",
            marginTop: "1%",
        }

        const text = {
            color: "#000"
        }

        const container = {
            maxHeight: "75%"
        }

        const buttongroup = {
            width:"100px",
            marginTop: "5%",
            marginLeft: "30%",
        }

        const button = {
            marginLeft: "1%"
        }

        const button1 = {
            marginTop: "5%",
            marginLeft: "2%"
        }

        const button2 = {
            width:"100px",
            marginLeft: "30%",
            //background: "#0067ac",
            marginTop: "2%"
        }

        const moral= {
            color: "#000"
        }

        const row = {
            width: "45%",
            float: "left",
            marginLeft: "5px"
        }
        const row2 = {
            width: "45%",
            float: "left",
            marginLeft: "10%"
        }

        return (
            <div >
                <Container style={container}>
                    {currentStandort ? (
                        <>
                            <div className="col-md-8">
                                <h3 style={h3}>Systemübersicht: {currentStandort}</h3>
                            </div>
                            <Row>
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        {systeme &&
                                        systeme.map((systeme, index) => (
                                            <li
                                                className={
                                                    "list-group-item " +
                                                    (index === currentIndex ? "active" : "")
                                                }
                                                onClick={() => this.setActiveSystem(systeme, index)}
                                                key={index}
                                            >
                                                {systeme.system_name}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className="col-md-6">
                                    {aktuellesSystem ? (
                                        <div>
                                            <h4>System</h4>
                                            <div>
                                                <label>
                                                    <strong>Name: </strong> {aktuellesSystem.system_name}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Beschreibung: </strong> {aktuellesSystem.beschreibung}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Cluster gemäß IT-SIG/VGB S175: </strong> {aktuellesSystem.systemtyp_id.systemtyp_name}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Kritikalität: </strong> {aktuellesSystem.kritikalitaet_id.kritikalitaet_name}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Zone: </strong> {aktuellesSystem.zonen_id.zone}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Standort: </strong> {aktuellesSystem.kw_id.kraftwerk_name}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Mitarbeiter: </strong> {aktuellesSystem.mitarbeiter_id.vorname + " " + aktuellesSystem.mitarbeiter_id.nachname}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Bürozugang: </strong> {aktuellesSystem.buerozugang === 1 ? "ja" : "nein"}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Fernzugang: </strong> {aktuellesSystem.fernzugang === 1 ? "ja" : "nein"}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Errichter: </strong> {aktuellesSystem.errichter}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>(geplante) PDN: </strong> {aktuellesSystem.pdn === 1 ? "ja" : "nein"}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Zugangsart: </strong> {aktuellesSystem.zugangsart }
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Einbindung ins PDN: </strong> {aktuellesSystem.pdndate }
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Blöcke:</strong>
                                                </label>{""}
                                                {aktuellesSystem.ksp_a === 1 ? "Block A" : null } {aktuellesSystem.ksp_b === 1 ? "Block B" : null} {aktuellesSystem.ksp_y === 1 ? "Y0" : null}
                                                {aktuellesSystem.box_n === 1 ? "Block N" : null} {aktuellesSystem.box_p === 1 ? "Block P" : null} {aktuellesSystem.box_q === 1 ? "Block Q" :  null} {aktuellesSystem.box_r === 1 ? "Block R" :  null} {aktuellesSystem.box_y === 1 ? "Y0" : null}
                                                {aktuellesSystem.jea_a === 1 ? "Block A" :  null} {aktuellesSystem.jea_b === 1 ? "Block B" :  null} {aktuellesSystem.jea_c === 1 ? "Block C" :  null} {aktuellesSystem.jea_d === 1 ? "Block N" :  null} {aktuellesSystem.jea_e === 1 ? "Block E" :  null} {aktuellesSystem.jea_f === 1 ? "Block F" :  null} {aktuellesSystem.jea_y === 1 ? "Y0" :  null}
                                                {aktuellesSystem.lip_r === 1 ? "Block R" :  null} {aktuellesSystem.lip_s === 1 ? "Block S" :  null} {aktuellesSystem.lip_y === 1 ? "Y0" :  null}
                                            </div>
                                            <div>
                                                <Button
                                                    style={button2}
                                                    onClick={() => this.handleView2(aktuellesSystem)}
                                                >
                                                    ISMS
                                                </Button>
                                            </div>
                                            <ButtonGroup style={buttongroup}>
                                                <Button disabled={disabled}
                                                        variant="success"
                                                        onClick={() => this.handleView(aktuellesSystem)}
                                                >
                                                    <BsGearFill/>
                                                </Button>
                                                <div>
                                                    <Button variant="danger" disabled={disabled} style={button}
                                                            onClick={() => this.deleteSystem(aktuellesSystem.system_id, currentIndex)}
                                                    >
                                                        <FaTrashAlt/>
                                                    </Button>
                                                </div>
                                            </ButtonGroup>
                                        </div>
                                    ) : (
                                        <div>
                                            <br />
                                            <p>Bitte wähle ein System aus...</p>
                                        </div>
                                    )}

                                </div>
                            </Row>
                            {this.state.viewMode2 && (
                                <div
                                    className={
                                        "modal " + (this.state.viewMode2 ? "displayBlock" : "displayNone")
                                    }
                                >
                                    <div className="modal-content" style={moral}>

                                        <Row>
                                            <Col md={16} className="mb-2">
                                                <div>
                                                    <label>
                                                        <strong>ISMS Relevant:</strong>
                                                    </label>{" "}

                                                    {aktuellesSystem.isms_Relevant === null ? "nein" : aktuellesSystem.isms_Relevant}
                                                </div>
                                                <div>
                                                    <label>
                                                        <strong>ISMS-Auswirkung:</strong>
                                                    </label>{" "}

                                                    {aktuellesSystem.isms_Auswirkung}
                                                </div>
                                                <div>
                                                    <label>
                                                        <strong>ISMS-Reduzierung:</strong>
                                                    </label>{" "}
                                                    {aktuellesSystem.isms_Reduzierung} %
                                                </div>
                                                <div>
                                                    <label>
                                                        <strong>ISMS-Begründung:</strong>
                                                    </label>
                                                    {aktuellesSystem.isms_Begruendung}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Button onClick={(e) => this.handleCancel2(e)}>Schließen</Button>
                                    </div>
                                </div>
                            )}
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
                                            <h3>Systemdaten</h3>
                                        </div>
                                        <Row>
                                            <Col md={16} className="mb-2">
                                                <Form>
                                                    <Row style={row}>
                                                        <label>
                                                            <strong>Name:</strong>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="system_name"
                                                            value={this.state.aktuellesSystem.system_name}
                                                            onChange={this.ChangeName}
                                                        />
                                                        <label>
                                                            <strong>Beschreibung:</strong>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="beschreibung"
                                                            value={this.state.aktuellesSystem.beschreibung}
                                                            onChange={this.ChangeBeschreibung}
                                                        />
                                                        <label>
                                                            <strong>Systemtyp: </strong>
                                                        </label>
                                                        <Form.Control as="select" name="systemtyp_id" value={this.state.aktuellesSystem.systemtyp_id.systemtyp_name} onChange={this.ChangeSystemtyp}>
                                                            <option value="">Systemtyp</option>
                                                            {
                                                                systemtypen.map((systemtyp) => (
                                                                    <option key={systemtyp.systemtyp_id} value={systemtyp.systemtyp_name}>
                                                                        {systemtyp.systemtyp_name}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                        <label>
                                                            <strong>Kritikalität: </strong>
                                                        </label>
                                                        <Form.Control as="select" name="kritikalitaet_id" value={this.state.aktuellesSystem.kritikalitaet_id.kritikalitaet_id} onChange={this.ChangeKrit}>
                                                            <option value="">Kritikalität</option>
                                                            {
                                                                kritikalitaeten.map((kritikalitaet) => (
                                                                    <option key={kritikalitaet.kritikalitaet_id} value={kritikalitaet.kritikalitaet_id}>
                                                                        {kritikalitaet.kritikalitaet_id}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                        <label>
                                                            <strong>Zone: </strong>
                                                        </label>
                                                        <Form.Control as="select" name="zonen_id" value={this.state.aktuellesSystem.zonen_id.zone} onChange={this.ChangeZone}>
                                                            <option value="">Zonen</option>
                                                            {
                                                                zonen.map((zone) => (
                                                                    <option key={zone.zonen_id} value={zone.zone}>
                                                                        {zone.zone}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                        <label>
                                                            <strong>Standort: </strong>
                                                        </label>
                                                        <Form.Control as="select" name="kw_id" value={this.state.aktuellesSystem.kw_id.kraftwerk_name} onChange={this.ChangeKraftwerk}>
                                                            <option value="">Standorte</option>
                                                            {
                                                                kraftwerke.map((kw) => (
                                                                    <option key={kw.kw_id} value={kw.kraftwerk_name}>
                                                                        {kw.kraftwerk_name}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                        <label>
                                                            <strong>Mitarbeiter: </strong>
                                                        </label>
                                                        <Form.Control as="select" name="mitarbeiter_id" value={this.state.aktuellesSystem.mitarbeiter_id.nachname} onChange={this.ChangeMitarbeiter}>
                                                            <option value="">Mitarbeiter</option>
                                                            {
                                                                mitarbeiter.map((mitarbeiter) => (
                                                                    <option key={mitarbeiter.mitarbeiter_id} value={mitarbeiter.nachname}>
                                                                        {mitarbeiter.vorname + " " + mitarbeiter.nachname}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Row>
                                                    <Row style={row2}>
                                                        <label>
                                                            <strong>Errichter:</strong>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="errichter"
                                                            value={this.state.aktuellesSystem.errichter}
                                                            onChange={this.ChangeErrichter}
                                                        />
                                                        <label>
                                                            <strong>(geplante) Einbindung ins PDN:</strong>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="pdndate"
                                                            value={this.state.aktuellesSystem.pdndate}
                                                            onChange={this.ChangePDNDate}
                                                        />
                                                        <label>
                                                            <strong>Zugangsart:</strong>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="zugangsart"
                                                            value={this.state.aktuellesSystem.zugangsart}
                                                            onChange={this.ChangeZugangsart}
                                                        />
                                                        <label>
                                                            <strong>ISMS-Auswirkung:</strong>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="isms_Auswirkung"
                                                            value={this.state.aktuellesSystem.isms_Auswirkung}
                                                            onChange={this.ChangeISMS_Auswirkung}
                                                        />
                                                        <label>
                                                            <strong>ISMS-Relevant:</strong>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="isms_Relevant"
                                                            value={this.state.aktuellesSystem.isms_Relevant}
                                                            onChange={this.ChangeISMS_Relevant}
                                                        />
                                                        <label>
                                                            <strong>ISMS-Reduzierung:</strong>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="isms_Reduzierung"
                                                            value={this.state.aktuellesSystem.isms_Reduzierung}
                                                            onChange={this.ChangeISMS_Reduzierung}
                                                        />
                                                        <label>
                                                            <strong>ISMS-Begründung:</strong>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="isms_Begruendung"
                                                            value={this.state.aktuellesSystem.isms_Begruendung}
                                                            onChange={this.ChangeISMS_Begruendung}
                                                        />
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                        <Button style={button1}
                                                onClick={this.updateSystem}
                                        >
                                            Speichern
                                        </Button>
                                    </div>
                                </div>
                            )}
                            <div>
                                <h4 style={h4}>
                                    <strong>{totalSysteme}</strong> Systeme
                                </h4>
                            </div>
                        </>
                    ) : (<div>Hallo</div>)}
                </Container>
            </div>
        );
    }
}
