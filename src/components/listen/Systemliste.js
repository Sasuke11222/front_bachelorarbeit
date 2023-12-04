import React, { Component } from "react";
import SystemDataService from "../../services/system.service";
import {Row, Container, Button, ButtonGroup, CloseButton, Form} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import KraftwerkDataService from "../../services/kraftwerk.service";
import SystemtypDataService from "../../services/systemtyp.service";
import KritikalitaetDataService from "../../services/kritikalitaet.service";
import ZoneDataService from "../../services/zone.service";
import MitarbeiterDataService from "../../services/mitarbeiter.service";
import Col from "react-bootstrap/Col";



//Seite für Generierung der Systemliste
export default class SystemListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveKomponente = this.retrieveKomponente.bind(this);
        this.refreshTabelle = this.refreshTabelle.bind(this);
        this.ChangeName = this.ChangeName.bind(this);
        this.ChangeBeschreibung = this.ChangeBeschreibung.bind(this);
        this.ChangeSystemtyp = this.ChangeSystemtyp.bind(this);
        this.ChangeKrit = this.ChangeKrit.bind(this);
        this.ChangeZone = this.ChangeZone.bind(this);
        this.ChangeMitarbeiter = this.ChangeMitarbeiter.bind(this);
        this.ChangeBuerozugang = this.ChangeBuerozugang.bind(this);
        this.ChangeFernzugang = this.ChangeFernzugang.bind(this);
        this.ChangeErrichter = this.ChangeErrichter.bind(this);
        this.ChangePDN = this.ChangePDN.bind(this);
        this.ChangeZugangsart = this.ChangeZugangsart.bind(this);
        this.ChangePDNDate = this.ChangePDNDate.bind(this);
        this.ChangeKSP_A = this.ChangeKSP_A.bind(this);
        this.ChangeKSP_B = this.ChangeKSP_B.bind(this);
        this.ChangeKSP_Y = this.ChangeKSP_Y.bind(this);
        this.ChangeBOX_N = this.ChangeBOX_N.bind(this);
        this.ChangeBOX_P = this.ChangeBOX_P.bind(this);
        this.ChangeBOX_Q = this.ChangeBOX_Q.bind(this);
        this.ChangeBOX_R = this.ChangeBOX_R.bind(this);
        this.ChangeBOX_Y = this.ChangeBOX_Y.bind(this);
        this.ChangeJEA_A = this.ChangeJEA_A.bind(this);
        this.ChangeJEA_B = this.ChangeJEA_B.bind(this);
        this.ChangeJEA_C = this.ChangeJEA_C.bind(this);
        this.ChangeJEA_D = this.ChangeJEA_D.bind(this);
        this.ChangeJEA_E = this.ChangeJEA_E.bind(this);
        this.ChangeJEA_F = this.ChangeJEA_F.bind(this);
        this.ChangeJEA_Y = this.ChangeJEA_Y.bind(this);
        this.ChangeLIP_R = this.ChangeLIP_R.bind(this);
        this.ChangeLIP_S = this.ChangeLIP_S.bind(this);
        this.ChangeLIP_Y = this.ChangeLIP_Y.bind(this);
        this.ChangeISMS_Relevant = this.ChangeISMS_Relevant.bind(this);
        this.ChangeISMS_Reduzierung = this.ChangeISMS_Reduzierung.bind(this);
        this.ChangeISMS_Auswirkung = this.ChangeISMS_Auswirkung.bind(this);
        this.ChangeISMS_Begruendung = this.ChangeISMS_Begruendung.bind(this);
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
            filteredSysteme: [],
        };
        /*
        <Button style={button1}
                onClick={() => this.handleView(aktuelleKomponente)}>
            <BsGearFill/>
        </Button>
         */
    }

    componentDidMount() {
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
                        filteredSysteme: response.data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }else {
            this.setState({
                filteredSysteme: filteredsystem.length,
            });
        }

        this.retrieveKomponente();
        this.refreshKraftwerk();
        this.refreshSystemtyp();
        this.refreshKritikalitaet();
        this.refreshZone();
        this.refreshMitarbeiter();
    }

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

    ChangeBuerozugang(e) {
        const buerozugang = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    buerozugang: buerozugang
                }
            };
        });
    }

    ChangeFernzugang(e) {
        const fernzugang = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    fernzugang: fernzugang
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

    ChangePDN(e) {
        const pdn = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    pdn: pdn
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

    ChangeKSP_A(e) {
        const ksp_a = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    ksp_a: ksp_a
                }
            };
        });
    }

    ChangeKSP_B(e) {
        const ksp_b = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    ksp_b: ksp_b
                }
            };
        });
    }

    ChangeKSP_Y(e) {
        const ksp_y = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    ksp_y: ksp_y
                }
            };
        });
    }

    ChangeBOX_N(e) {
        const box_n = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    box_n: box_n
                }
            };
        });
    }

    ChangeBOX_P(e) {
        const box_p = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    box_p: box_p
                }
            };
        });
    }

    ChangeBOX_Q(e) {
        const box_q = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    box_q: box_q
                }
            };
        });
    }

    ChangeBOX_R(e) {
        const box_r = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    box_r: box_r
                }
            };
        });
    }

    ChangeBOX_Y(e) {
        const box_y = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    box_y: box_y
                }
            };
        });
    }

    ChangeJEA_A(e) {
        const jea_a = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    jea_a: jea_a
                }
            };
        });
    }

    ChangeJEA_B(e) {
        const jea_b = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    jea_b: jea_b
                }
            };
        });
    }

    ChangeJEA_C(e) {
        const jea_c = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    jea_c: jea_c
                }
            };
        });
    }

    ChangeJEA_D(e) {
        const jea_d = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    jea_d: jea_d
                }
            };
        });
    }

    ChangeJEA_E(e) {
        const jea_e = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    jea_e: jea_e
                }
            };
        });
    }

    ChangeJEA_F(e) {
        const jea_f = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    jea_f: jea_f
                }
            };
        });
    }

    ChangeJEA_Y(e) {
        const jea_y = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    jea_y: jea_y
                }
            };
        });
    }

    ChangeLIP_R(e) {
        const lip_r = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    lip_r: lip_r
                }
            };
        });
    }

    ChangeLIP_S(e) {
        const lip_s = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    lip_s: lip_s
                }
            };
        });
    }

    ChangeLIP_Y(e) {
        const lip_y = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    lip_y: lip_y
                }
            };
        });
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

    deleteKomponente(system_id) {
        SystemDataService.delete(system_id)
            .then(response => {
                console.log(response);
                this.refreshTabelle();
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    }

    convertToDatabaseValue(boolValue) {
        return boolValue ? 1 : 0;
    }

    convertFromDatabaseValue(intValue) {
        return intValue ? true : false;
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
                systemverantwortlicher_id: this.state.aktuellesSystem.systemverantwortlicher_id,
                buerozugang: this.state.aktuellesSystem.buerozugang, // Ternary-Operator für korrekten Wert
                fernzugang: this.state.aktuellesSystem.fernzugang,
                errichter: this.state.aktuellesSystem.errichter,
                pdn: this.state.aktuellesSystem.pdn,
                zugangsart: this.state.aktuellesSystem.zugangsart,
                pdndate: this.state.aktuellesSystem.pdndate,
                ksp_a: this.convertToDatabaseValue(this.state.aktuellesSystem.ksp_a),
                ksp_b: this.convertToDatabaseValue(this.state.aktuellesSystem.ksp_b),
                ksp_y: this.convertToDatabaseValue(this.state.aktuellesSystem.ksp_y),
                box_n: this.convertToDatabaseValue(this.state.aktuellesSystem.box_n),
                box_p: this.convertToDatabaseValue(this.state.aktuellesSystem.box_p),
                box_q: this.convertToDatabaseValue(this.state.aktuellesSystem.box_q),
                box_r: this.convertToDatabaseValue(this.state.aktuellesSystem.box_r),
                box_y: this.convertToDatabaseValue(this.state.aktuellesSystem.box_y),
                jae_a: this.convertToDatabaseValue(this.state.aktuellesSystem.jae_a),
                jae_b: this.convertToDatabaseValue(this.state.aktuellesSystem.jae_b),
                jae_c: this.convertToDatabaseValue(this.state.aktuellesSystem.jae_c),
                jae_d: this.convertToDatabaseValue(this.state.aktuellesSystem.jae_d),
                jae_e: this.convertToDatabaseValue(this.state.aktuellesSystem.jae_e),
                jae_f: this.convertToDatabaseValue(this.state.aktuellesSystem.jae_f),
                jae_y: this.convertToDatabaseValue(this.state.aktuellesSystem.jae_y),
                lip_r: this.convertToDatabaseValue(this.state.aktuellesSystem.lip_r),
                lip_s: this.convertToDatabaseValue(this.state.aktuellesSystem.lip_s),
                lip_y: this.convertToDatabaseValue(this.state.aktuellesSystem.lip_y),
                isms_Relevant: this.state.aktuellesSystem.isms_Relevant,
                isms_Auswirkung: this.state.aktuellesSystem.isms_Auswirkung,
                isms_Reduzierung: this.state.aktuellesSystem.isms_Reduzierung,
                isms_Begruendung: this.state.aktuellesSystem.isms_Begruendung
            }),
        })
            .then((response) => response.json())
            .then(() => {
                this.refreshTabelle();
                this.setState({ viewMode: false });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    handleChange(e) {
        const { name, value } = e.target;

        this.setState((prevState => ({
            aktuellesSystem: {
                ...prevState.aktuellesSystem,
                [name]: value,
            }
        })));

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

    ChangeMitarbeiter(e) {
        const { name, value } = e.target;
        if (name === 'mitarbeiter_id'){
            const selectedMitarbeiter = this.state.mitarbeiter.find(mit => mit.nachname === value);
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
        }else {
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
            const selectedKrit = this.state.kritikalitaeten.find(systemtyp => systemtyp.kritikalitaet_name === value);
            this.setState(prevState => ({
                aktuellesSystem: {
                    ...prevState.aktuellesSystem,
                    kritikalitaet_id:{
                        ...prevState.systeme.kritikalitaet_id,
                        kritikalitaet_id: selectedKrit.kritikalitaet_id,
                        kritikalitaet_name: selectedKrit.kritikalitaet_name
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
                        zone: selectedZone.zone
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


    retrieveKomponente() {
        SystemDataService.getAll()
            .then(response => {
                this.setState({
                    systeme: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshTabelle() {
        this.retrieveKomponente();
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


    render() {
        const { systeme, aktuellesSystem, currentIndex, filteredSysteme, currentStandort, kraftwerke, systemtypen, kritikalitaeten, zonen, mitarbeiter, counter} = this.state;

        //const totalSysteme = filteredSysteme.length;
        if (filteredSysteme === 0) return null;

        const hauptbox = {
            height: "700px",
            maxHeight: "80%",
            marginBottom: "50px",
            background: "#59841d",
            color: "#FFF",
            borderRadius: "8px",
        }

        const h3 = {
            marginTop: "3px",
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

        const button2 = {
            width:"100px",
            background: "#0067ac",
            marginTop: "5px"
        }

        const moral= {
            color: "#000"
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

        const check = {
            marginLeft: "5%"
        }

        const check1 = {
            marginLeft: "3%",
        }

        return (
            <div style={hauptbox}>
                <Container style={container}>
                    {currentStandort ? (
                        <>
                            <div className="col-md-8">
                                <h3 style={h3}>Systemübersicht: {currentStandort}</h3>
                            </div>
                            {filteredSysteme ? (
                                <>
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
                                                        {aktuellesSystem.jae_a === 1 ? "Block A" :  null} {aktuellesSystem.jae_b === 1 ? "Block B" :  null} {aktuellesSystem.jae_c === 1 ? "Block C" :  null} {aktuellesSystem.jae_d === 1 ? "Block N" :  null} {aktuellesSystem.jae_e === 1 ? "Block E" :  null} {aktuellesSystem.jae_f === 1 ? "Block F" :  null} {aktuellesSystem.jae_y === 1 ? "Y0" :  null}
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
                                                    <div>
                                                        <Button variant="danger" style={button}
                                                                onClick={() => this.deleteKomponente(aktuellesSystem.system_id, currentIndex)}
                                                        >
                                                            <FaTrashAlt/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <br />
                                                    <p>Bitte wähle ein System aus...</p>
                                                </div>
                                            )}

                                        </div>
                                    </Row>
                                </>
                            ):(
                                <div>
                                    <h1>Test</h1>
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
                                        <Form.Control as="select" name="systemtyp_id" value={aktuellesSystem.systemtyp_id.systemtyp_name} onChange={this.ChangeSystemtyp}>
                                            <option value="">Systemtypen</option>
                                            {systemtypen.map((systemtyp) => (
                                                <option key={systemtyp.systemtyp_id} value={systemtyp.systemtyp_name}>
                                                    {systemtyp.systemtyp_name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <label>
                                            <strong>Kritikalität: </strong>
                                        </label>
                                        <Form.Control as="select" name="kritikalitaet_id" value={aktuellesSystem.kritikalitaet_id.kritikalitaet_name} onChange={this.ChangeKrit}>
                                            <option value="">Kritikalitäten</option>
                                            {kritikalitaeten.map((kritikalität) => (
                                                <option key={kritikalität.kritikalitaet_id} value={kritikalität.kritikalitaet_name}>
                                                    {kritikalität.kritikalitaet_name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <label>
                                            <strong>Zone: </strong>
                                        </label>
                                        <Form.Control as="select" name="zonen_id" value={aktuellesSystem.zonen_id.zone} onChange={this.ChangeZone}>
                                            <option value="">Zone</option>
                                            {zonen.map((zone) => (
                                                <option key={zone.zonen_id} value={zone.zone}>
                                                    {zone.zone}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <label>
                                            <strong>Standort: </strong>
                                        </label>
                                        <Form.Control as="select" name="kw_id" value={aktuellesSystem.kw_id.kraftwerk_name} onChange={this.ChangeKraftwerk}>
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
                                        <Form.Control as="select" name="mitarbeiter_id" value={aktuellesSystem.mitarbeiter_id.nachname} onChange={this.ChangeMitarbeiter}>
                                            <option value="">Mitarbeiter</option>
                                            {mitarbeiter.map((mitarbeiter) => (
                                                <option key={mitarbeiter.mitarbeiter_id} value={mitarbeiter.nachname}>
                                                    {mitarbeiter.vorname + " " + mitarbeiter.nachname}
                                                </option>
                                            ))}
                                        </Form.Control>
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
                                            <strong>Einbindung ins PDN:</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="pdndate"
                                            value={this.state.aktuellesSystem.pdndate}
                                            onChange={this.ChangePDNDate}
                                        />
                                        <div>
                                            <label>
                                                <strong>ISMS Relevant:</strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="isms_Relevant"
                                                value={this.state.aktuellesSystem.isms_Relevant}
                                                onChange={this.ChangeISMS_Relevant}
                                            />
                                        </div>
                                        <div>
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
                                        </div>
                                        <div>
                                            <label>
                                                <strong>ISMS-Reduzierung (in %): </strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="isms_Reduzierung"
                                                value={this.state.aktuellesSystem.isms_Reduzierung}
                                                onChange={this.ChangeISMS_Reduzierung}
                                            />

                                        </div>
                                        <div>
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
                                        </div>
                                        <Button style={button1}
                                                onClick={this.updateSystem}
                                        >
                                            Speichern
                                        </Button>
                                    </div>
                                </div>
                            )}
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
                            <div>
                                <h4>
                                    <strong>{filteredSysteme}</strong> Systeme
                                </h4>
                            </div>
                        </>
                    ) : (
                        <div>Hallo</div>
                    )}
                </Container>
            </div>
        );
    }
}
