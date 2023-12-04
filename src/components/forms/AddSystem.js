import React, { Component } from 'react';
import MitarbeiterDataService from "../../services/mitarbeiter.service";
import  KraftwerkDataService from "../../services/kraftwerk.service";
import  SystemtypDataService from "../../services/systemtyp.service";
import  KritikalitaetDataService from "../../services/kritikalitaet.service";
import  SystemDataService from "../../services/system.service";
import  ZoneDataService from "../../services/zone.service";
import {Button, Container, Form, Row} from "react-bootstrap";
import {withRouter} from "../../common/with-router";
import Col from "react-bootstrap/Col";

class AddSystem extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.handleChangeKraftwerk = this.handleChangeKraftwerk.bind(this);
        this.handleChangeSystemtyp = this.handleChangeSystemtyp.bind(this);
        this.handleChangeZone = this.handleChangeZone.bind(this);
        this.handleChangeKrit = this.handleChangeKrit.bind(this);
        this.handleChangeMitarbeiter = this.handleChangeMitarbeiter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            system: {
                "system_id": "",
                "system_name": "",
                "beschreibung": "",
                "systemtyp_id": {
                    "systemtyp_id": "",
                    "systemtyp_name": ""
                },
                "kritikalitaet_id": {
                    "kritikalitaet_id": "",
                    "kritikalitaet_name": ""
                },
                "zonen_id": {
                    "zonen_id": "",
                    "zone": ""
                },
                "kw_id": {
                    "kw_id": "",
                    "kraftwerk_name": "",
                    "kraftwerksleiter": "",
                    "zoneninstanzbesitzer": "",
                    "systemkoordinator": ""
                },
                "mitarbeiter_id": {
                    "mitarbeiter_id": "",
                    "nachname": "",
                    "vorname": "",
                    "abteilung": "",
                    "telefon": "",
                    "mail": "",
                    "kw_id": {
                        "kw_id": "1",
                        "kraftwerk_name": "",
                        "kraftwerksleiter": "",
                        "zoneninstanzbesitzer": "",
                        "systemkoordinator": ""
                    }
                },
                "systemverantwortlicher_id": "",
                "buerozugang": false,
                "fernzugang": false,
                "errichter": "",
                "pdn": false,
                "zugangsart": "",
                "pdndate": "",
                "ksp_a": false,
                "ksp_b": false,
                "ksp_y": false,
                "box_n": false,
                "box_p": false,
                "box_q": false,
                "box_r": false,
                "box_y": false,
                "jae_a": false,
                "jae_b": false,
                "jae_c": false,
                "jae_d": false,
                "jae_e": false,
                "jae_f": false,
                "jae_y": false,
                "lip_r": false,
                "lip_s": false,
                "lip_y": false,
                "isms_Begruendung": "",
                "isms_Reduzierung": "",
                "isms_Relevant": "",
                "isms_Auswirkung": ""
            },
            kraftwerke: [],
            systemtypen: [],
            kritikalitaeten: [],
            zonen: [],
            mitarbeiter: [],
        };
    }

    componentDidMount() {
        this.refreshKraftwerk();
        this.refreshSystemtyp();
        this.refreshKritikalitaet();
        this.refreshZone();
        this.refreshMitarbeiter();
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

    refreshKritikalitaet() {

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

    handleChange(e) {
        const { name, value } = e.target;

            this.setState((prevState => ({
                system: {
                    ...prevState.system,
                    [name]: value,
                }
            })));

    }

    handleChangeCheck = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(prevState => ({
            system: {
                ...prevState.system,
                [name]: value
            }
        }));
    }

    handleChangeSystemtyp(e) {
        const { name, value } = e.target;
        if (name === 'systemtyp_id'){
            const selectedSystemtyp = this.state.systemtypen.find(systemtyp => systemtyp.systemtyp_name === value);
            this.setState(prevState => ({
                system: {
                    ...prevState.system,
                    systemtyp_id:{
                        ...prevState.system.systemtyp_id,
                        systemtyp_id: selectedSystemtyp.systemtyp_id,
                        systemtyp_name: selectedSystemtyp.systemtyp_name
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                system: {
                    ...prevState.system,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeMitarbeiter(e) {
        const { name, value } = e.target;
        if (name === 'mitarbeiter_id'){
            const selectedMitarbeiter = this.state.mitarbeiter.find(mit => mit.nachname === value);
            this.setState(prevState => ({
                system: {
                    ...prevState.system,
                    mitarbeiter_id:{
                        ...prevState.system.mitarbeiter_id,
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
        }else {
            this.setState((prevState => ({
                mitarbeiter: {
                    ...prevState.mitarbeiter,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeKrit(e) {
        const { name, value } = e.target;
        if (name === 'kritikalitaet_id'){
            const selectedKrit = this.state.kritikalitaeten.find(systemtyp => systemtyp.kritikalitaet_name === value);
            this.setState(prevState => ({
                system: {
                    ...prevState.system,
                    kritikalitaet_id:{
                        ...prevState.system.kritikalitaet_id,
                        kritikalitaet_id: selectedKrit.kritikalitaet_id,
                        kritikalitaet_name: selectedKrit.kritikalitaet_name
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                system: {
                    ...prevState.system,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeZone(e) {
        const { name, value } = e.target;
        if (name === 'zonen_id'){
            const selectedZone = this.state.zonen.find(zone => zone.zone === value);
            this.setState(prevState => ({
                system: {
                    ...prevState.system,
                    zonen_id:{
                        ...prevState.system.zonen_id,
                        zonen_id: selectedZone.zonen_id,
                        zone: selectedZone.zone
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                system: {
                    ...prevState.system,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeKraftwerk(e) {
        const { name, value } = e.target;
        if (name === 'kw_id'){
            const selectedKraftwerk = this.state.kraftwerke.find(kraftwerk => kraftwerk.kraftwerk_name === value);
            this.setState(prevState => ({
                system: {
                    ...prevState.system,
                    kw_id:{
                        ...prevState.system.kw_id,
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
                system: {
                    ...prevState.system,
                    [name]: value,
                }
            })));
        }
    }

    //Methode zum Abschicken des Formulares
    handleSubmit(e) {
        e.preventDefault();
        const {
            system_name,
            beschreibung,
            systemtyp_id,
            kritikalitaet_id,
            zonen_id,
            kw_id,
            mitarbeiter_id,
            systemverantwortlicher_id,
            buerozugang,
            fernzugang,
            errichter,
            pdn,
            zugangsart,
            pdndate,
            ksp_a,
            ksp_b,
            ksp_y,
            box_n,
            box_p,
            box_q,
            box_r,
            box_y,
            jae_a,
            jae_b,
            jae_c,
            jae_d,
            jae_e,
            jae_f,
            jae_y,
            lip_r,
            lip_s,
            lip_y,
            isms_Relevant,
            isms_Auswirkung,
            isms_Reduzierung,
            isms_Begruendung
        } = this.state.system;
        SystemDataService.createSystem(
            system_name,
            beschreibung,
            systemtyp_id,
            kritikalitaet_id,
            zonen_id,
            kw_id,
            mitarbeiter_id,
            systemverantwortlicher_id,
            buerozugang ? 1 : 0, // Ternary-Operator für korrekten Wert
            fernzugang ? 1 : 0,
            errichter,
            pdn ? 1 : 0,
            zugangsart,
            pdndate,
            ksp_a ? 1 : 0,
            ksp_b ? 1 : 0,
            ksp_y ? 1 : 0,
            box_n ? 1 : 0,
            box_p ? 1 : 0,
            box_q ? 1 : 0,
            box_r ? 1 : 0,
            box_y ? 1 : 0,
            jae_a ? 1 : 0,
            jae_b ? 1 : 0,
            jae_c ? 1 : 0,
            jae_d ? 1 : 0,
            jae_e ? 1 : 0,
            jae_f ? 1 : 0,
            jae_y ? 1 : 0,
            lip_r ? 1 : 0,
            lip_s ? 1 : 0,
            lip_y ? 1 : 0,
            isms_Relevant,
            isms_Auswirkung,
            isms_Reduzierung,
            isms_Begruendung
        )
            .then(response => {
                this.setState({
                    system_name: "",
                    beschreibung: "",
                    systemtyp_id: {
                        systemtyp_id: "",
                        systemtyp_name: ""
                    },
                    kritikalitaet_id: {
                        kritikalitaet_id: "",
                        kritikalitaet_name: ""
                    },
                    zonen_id: {
                        zonen_id: "",
                        zone: ""
                    },
                    kw_id: {
                        kw_id: "",
                        kraftwerk_name: "",
                        kraftwerksleiter: "",
                        zoneninstanzbesitzer: "",
                        systemkoordinator: ""
                    },
                    mitarbeiter_id: {
                        mitarbeiter_id: "",
                        nachname: "",
                        vorname: "",
                        abteilung: "",
                        telefon: "",
                        mail: "",
                        kw_id: {
                            kw_id: "1",
                            kraftwerk_name: "",
                            kraftwerksleiter: "",
                            zoneninstanzbesitzer: "",
                            systemkoordinator: ""
                        }
                    },
                    systemverantwortlicher_id: "",
                    buerozugang: "",
                    fernzugang: "",
                    errichter: "",
                    pdn: "",
                    zugangsart: "",
                    pdndate: "",
                    ksp_a: "",
                    ksp_b: "",
                    ksp_y: "",
                    box_n: "",
                    box_p: "",
                    box_q: "",
                    box_r: "",
                    box_y: "",
                    jae_a: "",
                    jae_b: "",
                    jae_c: "",
                    jae_d: "",
                    jae_e: "",
                    jae_f: "",
                    jae_y: "",
                    lip_r: "",
                    lip_s: "",
                    lip_y: "",
                    isms_Begruendung: "",
                    isms_Reduzierung: "",
                    isms_Relevant: "",
                    isms_Auswirkung: ""
                });
                this.props.router.navigate("/systemuebersicht");
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { kraftwerke, system, systemtypen, kritikalitaeten, zonen, mitarbeiter } = this.state;

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

        const check = {
            marginLeft: "5%"
        }

        const pumpe = {
            marginTop: "1%",
            marginLeft: "1.5%",
            background: "#54616c",
            borderRadius: "8px",
        }

        const box = {
            marginTop: "1%",
            marginLeft: "1%",
            marginRight: "1%",
            background: "#54616c",
            borderRadius: "8px",
        }

        const jae = {
            marginTop: "1%",
            marginRight: "1%",
            background: "#54616c",
            borderRadius: "8px",
        }

        const lip = {
            marginTop: "1%",
            marginRight: "5%",
            background: "#54616c",
            borderRadius: "8px",
        }

        return (
            <Container style={hauptbox}>
                <h2>Neues System</h2>
                <Form style={formular} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="system_name">
                        <Form.Label>Name: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="system_name" value={system.system_name} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="beschreibung">
                        <Form.Label>Beschreibung: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="beschreibung" value={system.beschreibung}  onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="systemtyp_id">
                        <Form.Label>Systemtyp:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="systemtyp_id" value={system.systemtyp_id.systemtyp_name} onChange={this.handleChangeSystemtyp}>
                            <option value="">Systemtypen</option>
                            {systemtypen.map((systemtyp) => (
                                <option key={systemtyp.systemtyp_id} value={systemtyp.systemtyp_name}>
                                    {systemtyp.systemtyp_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="kritikalitaet_id">
                        <Form.Label>Kritikalität:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="kritikalitaet_id" value={system.kritikalitaet_id.kritikalitaet_name} onChange={this.handleChangeKrit}>
                            <option value="">Kritikalitäten</option>
                            {kritikalitaeten.map((kritikalität) => (
                                <option key={kritikalität.kritikalitaet_id} value={kritikalität.kritikalitaet_name}>
                                    {kritikalität.kritikalitaet_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="zonen_id">
                        <Form.Label>Zone:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="zonen_id" value={system.zonen_id.zone} onChange={this.handleChangeZone}>
                            <option value="">Zone</option>
                            {zonen.map((zone) => (
                                <option key={zone.zonen_id} value={zone.zone}>
                                    {zone.zone}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="kw_id">
                        <Form.Label>Standort:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="kw_id" value={system.kw_id.kraftwerk_name} onChange={this.handleChangeKraftwerk}>
                            <option value="">Standorte</option>
                            {kraftwerke.map((kw) => (
                                <option key={kw.kw_id} value={kw.kraftwerk_name}>
                                    {kw.kraftwerk_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="mitarbeiter_id">
                        <Form.Label>Mitarbeiter:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="mitarbeiter_id" value={system.mitarbeiter_id.nachname} onChange={this.handleChangeMitarbeiter}>
                            <option value="">Mitarbeiter</option>
                            {mitarbeiter.map((mitarbeiter) => (
                                <option key={mitarbeiter.mitarbeiter_id} value={mitarbeiter.nachname}>
                                    {mitarbeiter.vorname + " " + mitarbeiter.nachname}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="buerozugang">
                        <Form.Label>Bürozugang:
                            <input
                                style={check}
                                id="buerozugang"
                                className="form-check-input"
                                type="checkbox"
                                name="buerozugang"
                                value={system.buerozugang}
                                onChange={this.handleChangeCheck}
                            />
                        </Form.Label>
                    </Form.Group>
                    <Form.Group controlId="fernzugang">
                        <Form.Label>Fernzugang:
                            <input
                                style={check}
                                id="fernzugang"
                                className="form-check-input"
                                type="checkbox"
                                name="fernzugang"
                                value={system.fernzugang}
                                onChange={this.handleChange}
                            />
                        </Form.Label>
                    </Form.Group>
                    <Form.Group controlId="errichter">
                        <Form.Label>Errichter: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="errichter" value={system.errichter}  onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="pdn">
                        <Form.Label>PDN:
                            <input
                                style={check}
                                id="pdn"
                                className="form-check-input"
                                type="checkbox"
                                name="pdn"
                                value={system.pdn}
                                onChange={this.handleChange}
                            />
                        </Form.Label>
                    </Form.Group>
                    <Form.Group controlId="zugangsart">
                        <Form.Label>Zugangsart: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="zugangsart" value={system.zugangsart}  onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="pdndate">
                        <Form.Label>Einbindung ins PDN: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="pdndate" value={system.pdndate} onChange={this.handleChange}/>
                    </Form.Group>
                    <Row>
                        <Col style={pumpe}>
                            <Form.Label>Schwarze Pumpe: </Form.Label>
                            <Form.Group controlId="ksp_a">
                                <Form.Label>A:
                                    <input
                                        style={check}
                                        id="ksp_a"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="ksp_a"
                                        value={system.ksp_a}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="ksp_b">
                                <Form.Label>B:
                                    <input
                                        style={check}
                                        id="ksp_b"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="ksp_b"
                                        value={system.ksp_b}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="ksp_y">
                                <Form.Label>Y:
                                    <input
                                        style={check}
                                        id="ksp_y"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="ksp_y"
                                        value={system.ksp_y}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </Col>
                        <Col style={box}>
                            <Form.Label>Boxberg: </Form.Label>
                            <Form.Group controlId="box_n">
                                <Form.Label>N:
                                    <input
                                        style={check}
                                        id="box_n"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="box_n"
                                        value={system.box_n}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="box_p">
                                <Form.Label>P:
                                    <input
                                        style={check}
                                        id="box_p"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="box_p"
                                        value={system.box_p}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="box_q">
                                <Form.Label>Q:
                                    <input
                                        style={check}
                                        id="box_q"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="box_q"
                                        value={system.box_q}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="box_r">
                                <Form.Label>R:
                                    <input
                                        style={check}
                                        id="box_r"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="box_r"
                                        value={system.box_r}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="box_y">
                                <Form.Label>Y:
                                    <input
                                        style={check}
                                        id="box_y"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="box_y"
                                        value={system.box_y}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </Col>
                        <Col style={jae}>
                            <Form.Label>Jänschwalde: </Form.Label>
                            <Form.Group controlId="jae_a">
                                <Form.Label>A:
                                    <input
                                        style={check}
                                        id="jae_a"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="jae_a"
                                        value={system.jae_a}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="jae_b">
                                <Form.Label>B:
                                    <input
                                        style={check}
                                        id="jae_b"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="jae_b"
                                        value={system.jae_b}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="jae_c">
                                <Form.Label>C:
                                    <input
                                        style={check}
                                        id="jae_c"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="jae_c"
                                        value={system.jae_c}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="jae_d">
                                <Form.Label>D:
                                    <input
                                        style={check}
                                        id="jae_d"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="jae_d"
                                        value={system.jae_d}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="jae_e">
                                <Form.Label>E:
                                    <input
                                        style={check}
                                        id="jae_e"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="jae_e"
                                        value={system.jae_e}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="jae_f">
                                <Form.Label>F:
                                    <input
                                        style={check}
                                        id="jae_f"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="jae_f"
                                        value={system.jae_f}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="jae_y">
                                <Form.Label>Y:
                                    <input
                                        style={check}
                                        id="jae_y"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="jae_y"
                                        value={system.jae_y}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </Col>
                        <Col style={lip}>
                            <Form.Label>Lippendorf: </Form.Label>
                            <Form.Group controlId="lip_r">
                                <Form.Label>R:
                                    <input
                                        style={check}
                                        id="lip_r"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="lip_r"
                                        value={system.lip_r}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="lip_s">
                                <Form.Label>S:
                                    <input
                                        style={check}
                                        id="lip_s"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="lip_s"
                                        value={system.lip_s}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group controlId="lip_y">
                                <Form.Label>Y:
                                    <input
                                        style={check}
                                        id="box_y"
                                        className="form-check-input"
                                        type="checkbox"
                                        name="lip_y"
                                        value={system.lip_y}
                                        onChange={this.handleChange}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="isms_Relevant">
                        <Form.Label>ISMS-Relevants: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="isms_Relevant" value={system.isms_Relevant}  onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="isms_Auswirkung">
                        <Form.Label>ISMS-Auswirkung: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="isms_Auswirkung" value={system.isms_Auswirkung}  onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="isms_Reduzierung">
                        <Form.Label>ISMS-Reduzierung: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="isms_Reduzierung" value={system.isms_Reduzierung}  onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="isms_Begruendung">
                        <Form.Label>ISMS-Begründung: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="isms_Begruendung" value={system.isms_Begruendung}  onChange={this.handleChange}/>
                    </Form.Group>
                    <Button style={button} variant="primary" type="submit">
                        Hinzufügen
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default withRouter(AddSystem);