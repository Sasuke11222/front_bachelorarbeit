import React, { Component } from 'react';
import KomponentDataService from "../../services/komponenten.service";
import VirenschutzherstellerDataService from "../../services/virenschutzhersteller.service";
import  KraftwerkDataService from "../../services/kraftwerk.service";
import  SystemeinheitDataService from "../../services/systemeinheit.service";
import  SystemDataService from "../../services/system.service";
import  USBDataService from "../../services/usb.service";
import  RJ45DataService from "../../services/rj45.service";
import  BetriebssystemDataService from "../../services/betriebssystem.service";
import  FirewallDataService from "../../services/firewall.service";
import  VirenschutzDataService from "../../services/virenschutz.service";
import  SystemherstellerDataService from "../../services/systemhersteller.service";
import  OfficeDataService from "../../services/office.service";
import {Button, Container, Form} from "react-bootstrap";
import {withRouter} from "../../common/with-router";

class AddElement extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeKraftwerk = this.handleChangeKraftwerk.bind(this);
        this.handleChangeSystemeinheit = this.handleChangeSystemeinheit.bind(this);
        this.handleChangeUSB = this.handleChangeUSB.bind(this);
        this.handleChangeSystem = this.handleChangeSystem.bind(this);
        this.handleChangeVirenschutzhersteller = this.handleChangeVirenschutzhersteller.bind(this);
        this.handleChangeRJ45 = this.handleChangeRJ45.bind(this);
        this.handleChangeBetriebssystem = this.handleChangeBetriebssystem.bind(this);
        this.handleChangeFirewall = this.handleChangeFirewall.bind(this);
        this.handleChangeVirenschutz = this.handleChangeVirenschutz.bind(this);
        this.handleChangeSystemhersteller = this.handleChangeSystemhersteller.bind(this);
        this.handleChangeOffice = this.handleChangeOffice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            element: {
                "it_element_id": "",
                "kw_id": {
                    "kw_id": "",
                    "kraftwerk_name": "",
                    "kraftwerksleiter": "",
                    "zoneninstanzbesitzer": "",
                    "systemkoordinator": ""
                },
                "kks": "",
                "kurztext": "",
                "systemeinheit_id": {
                    "systemeinheit_id": "",
                    "systemeinheit_name": ""
                },
                "system_id": {
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
                            "kw_id": "",
                            "kraftwerk_name": "",
                            "kraftwerksleiter": "",
                            "zoneninstanzbesitzer": "",
                            "systemkoordinator": ""
                        }
                    },
                    "systemverantwortlicher_id": "",
                    "buerozugang": "",
                    "fernzugang": "",
                    "errichter": "",
                    "pdn": "",
                    "zugangsart": "",
                    "pdndate": "",
                    "ksp_a": "",
                    "ksp_b": "",
                    "ksp_y": "",
                    "box_n": "",
                    "box_p": "",
                    "box_q": "",
                    "box_r": "",
                    "box_y": "",
                    "jae_a": "",
                    "jae_b": "",
                    "jae_c": "",
                    "jae_d": "",
                    "jae_e": "",
                    "jae_f": "",
                    "jae_y": "",
                    "lip_r": "",
                    "lip_s": "",
                    "lip_y": "",
                    "isms_Relevant": "",
                    "isms_Auswirkung": "",
                    "isms_Reduzierung": "",
                    "isms_Begruendung": ""
                },
                "status_usb_id": {
                    "status_usb_id": "",
                    "status": ""
                },
                "virenschutz_hersteller_id": {
                    "herstellername": "",
                    "version": "",
                    "virenschutzhersteller_id": ""
                },
                "status_rj45_id": {
                    "status_rj45_id": "",
                    "status": ""
                },
                "betriebssystem_id": {
                    "betriebssystem_id": "",
                    "betriebssystem_name": ""
                },
                "status_firewall_id": {
                    "status_firewall_id": "",
                    "status": ""
                },
                "status_virenschutz_id": {
                    "status_virenschutz_id": "",
                    "status": "-"
                },
                "systemhersteller_id": {
                    "systemhersteller_id": "",
                    "herstellername": ""
                },
                "modell": "",
                "firmwareversion": "",
                "office_id": {
                    "office_id": "",
                    "version": ""
                },
                "ibs_datum": "",
                "sonstige_sw": "",
                "checkliste": "",
                "backup": "",
                "backup_test": ""
            },
            kraftwerke: [],
            systemeinheiten: [],
            systeme: [],
            usb_status: [],
            vhersteller: [],
            rj45_status:[],
            betriebssysteme: [],
            firewall_status: [],
            virenschutz_status: [],
            shersteller: [],
            office: []
        };
    }

    componentDidMount() {
        this.refreshKraftwerk();
        this.refreshSystemeinheit();
        this.refreshSystem();
        this.refreshStatusUSB();
        this.refreshVirenschutzhersteller();
        this.refreshStatusRJ45();
        this.refreshBetriebssystem();
        this.refreshStatusFirewall();
        this.refreshStatusVirenschutz();
        this.refreshSystemhersteller();
        this.refreshOffice();
    }

    refreshStatusRJ45() {

        RJ45DataService.getAll()
            .then(response => {
                this.setState({
                    rj45_status: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshBetriebssystem() {

        BetriebssystemDataService.getAll()
            .then(response => {
                this.setState({
                    betriebssysteme: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshStatusFirewall() {

        FirewallDataService.getAll()
            .then(response => {
                this.setState({
                    firewall_status: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshStatusVirenschutz() {

        VirenschutzDataService.getAll()
            .then(response => {
                this.setState({
                    virenschutz_status: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshSystemhersteller() {

        SystemherstellerDataService.getAllSystemhersteller()
            .then(response => {
                this.setState({
                    shersteller: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
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

    refreshOffice() {

        OfficeDataService.getAll()
            .then(response => {
                this.setState({
                    office: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshSystemeinheit() {

        SystemeinheitDataService.getAll()
            .then(response => {
                this.setState({
                    systemeinheiten: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshSystem() {

        SystemDataService.getAll()
            .then(response => {
                this.setState({
                    systeme: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshStatusUSB() {

        USBDataService.getAll()
            .then(response => {
                this.setState({
                    usb_status: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshVirenschutzhersteller() {

        VirenschutzherstellerDataService.getAll()
            .then(response => {
                this.setState({
                    vhersteller: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState((prevState => ({
            element: {
                ...prevState.element,
                [name]: value,
            }
        })));

    }

    handleChangeRJ45(e) {
        const { name, value } = e.target;
        if (name === 'status_rj45_id'){
            const selectedRJ45 = this.state.rj45_status.find(rj45_status => rj45_status.status === value);
            this.setState(prevState => ({
                element: {
                    ...prevState.element,
                    status_rj45_id:{
                        ...prevState.element.status_rj45_id,
                        status_rj45_id: selectedRJ45.status_rj45_id,
                        status: selectedRJ45.status
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                element: {
                    ...prevState.element,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeBetriebssystem(e) {
        const { name, value } = e.target;
        if (name === 'betriebssystem_id'){
            const selectedBetriebssystem = this.state.betriebssysteme.find(betriebssystem => betriebssystem.betriebssystem_name === value);
            this.setState(prevState => ({
                element: {
                    ...prevState.element,
                    betriebssystem_id:{
                        ...prevState.element.betriebssystem_id,
                        betriebssystem_id: selectedBetriebssystem.betriebssystem_id,
                        betriebssystem_name: selectedBetriebssystem.betriebssystem_name
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                element: {
                    ...prevState.element,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeFirewall(e) {
        const { name, value } = e.target;
        if (name === 'status_firewall_id'){
            const selectedFirewall = this.state.firewall_status.find(status_firewall => status_firewall.status === value);
            this.setState(prevState => ({
                element: {
                    ...prevState.element,
                    status_firewall_id:{
                        ...prevState.element.status_firewall_id,
                        status_firewall_id: selectedFirewall.status_firewall_id,
                        status: selectedFirewall.status
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                element: {
                    ...prevState.element,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeVirenschutz(e) {
        const { name, value } = e.target;
        if (name === 'status_virenschutz_id'){
            const selectedVirenschutz = this.state.virenschutz_status.find(status_virenschutz => status_virenschutz.status === value);
            this.setState(prevState => ({
                element: {
                    ...prevState.element,
                    status_virenschutz_id:{
                        ...prevState.element.status_virenschutz_id,
                        status_virenschutz_id: selectedVirenschutz.status_virenschutz_id,
                        status: selectedVirenschutz.status
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                element: {
                    ...prevState.element,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeSystemhersteller(e) {
        const { name, value } = e.target;
        if (name === 'systemhersteller_id'){
            const selectedSystemhersteller = this.state.shersteller.find(systemhersteller => systemhersteller.herstellername === value);
            this.setState(prevState => ({
                element: {
                    ...prevState.element,
                    systemhersteller_id:{
                        ...prevState.element.systemhersteller_id,
                        systemhersteller_id: selectedSystemhersteller.systemhersteller_id,
                        herstellername: selectedSystemhersteller.herstellername
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                element: {
                    ...prevState.element,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeOffice(e) {
        const { name, value } = e.target;
        if (name === 'office_id'){
            const selectedOffice = this.state.office.find(office => office.version === value);
            this.setState(prevState => ({
                element: {
                    ...prevState.element,
                    office_id:{
                        ...prevState.element.office_id,
                        office_id: selectedOffice.office_id,
                        version: selectedOffice.version
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                element: {
                    ...prevState.element,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeSystemeinheit(e) {
        const { name, value } = e.target;
        if (name === 'systemeinheit_id'){
            const selectedSystemeinheit = this.state.systemeinheiten.find(systemeinheit => systemeinheit.systemeinheit_name === value);
            this.setState(prevState => ({
                element: {
                    ...prevState.element,
                    systemeinheit_id:{
                        ...prevState.element.systemeinheit_id,
                        systemeinheit_id: selectedSystemeinheit.systemeinheit_id,
                        systemeinheit_name: selectedSystemeinheit.systemeinheit_name
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                element: {
                    ...prevState.element,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeVirenschutzhersteller(e) {
        const { name, value } = e.target;
        if (name === 'virenschutz_hersteller_id'){
            const selectedVirenschutzhersteller = this.state.vhersteller.find(virenschutzhersteller => virenschutzhersteller.herstellername === value);
            this.setState(prevState => ({
                element: {
                    ...prevState.element,
                    virenschutz_hersteller_id:{
                        ...prevState.element.virenschutz_hersteller_id,
                        virenschutzhersteller_id: selectedVirenschutzhersteller.virenschutzhersteller_id,
                        herstellername: selectedVirenschutzhersteller.herstellername,
                        version: selectedVirenschutzhersteller.version,
                    },
                }
            }));
        }else {
            this.setState((prevState => ({
                vhersteller: {
                    ...prevState.vhersteller,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeSystem(e) {
        const { name, value } = e.target;
        if (name === 'system_id'){
            const selectedSystem = this.state.systeme.find(system => system.system_name === value);
            this.setState(prevState => ({
                element: {
                    ...prevState.element,
                    system_id:{
                        ...prevState.element.system_id,
                        system_id: selectedSystem.system_id,
                        system_name: selectedSystem.system_name,
                        beschreibung: selectedSystem.beschreibung,
                        systemtyp_id: {
                            systemtyp_id: selectedSystem.systemtyp_id.systemtyp_id,
                            systemtyp_name: selectedSystem.systemtyp_id.systemtyp_name
                        },
                        kritikalitaet_id: {
                            kritikalitaet_id: selectedSystem.kritikalitaet_id.kritikalitaet_id,
                            kritikalitaet_name: selectedSystem.kritikalitaet_id.kritikalitaet_name
                        },
                        zonen_id: {
                            zonen_id: selectedSystem.zonen_id.zonen_id,
                            zone: selectedSystem.zonen_id.zone
                        },
                        kw_id: {
                            kw_id: selectedSystem.kw_id.kw_id,
                            kraftwerk_name: selectedSystem.kw_id.kraftwerk_name,
                            kraftwerksleiter: selectedSystem.kw_id.kraftwerksleiter,
                            zoneninstanzbesitzer: selectedSystem.kw_id.zoneninstanzbesitzer,
                            systemkoordinator: selectedSystem.kw_id.systemkoordinator
                        },
                        mitarbeiter_id: {
                            mitarbeiter_id: selectedSystem.mitarbeiter_id.mitarbeiter_id,
                            nachname: selectedSystem.mitarbeiter_id.nachname,
                            vorname: selectedSystem.mitarbeiter_id.vorname,
                            abteilung: selectedSystem.mitarbeiter_id.abteilung,
                            telefon: selectedSystem.mitarbeiter_id.telefon,
                            mail:selectedSystem.mitarbeiter_id.mail,
                            kw_id: {
                                kw_id: selectedSystem.mitarbeiter_id.kw_id.kw_id,
                                kraftwerk_name: selectedSystem.mitarbeiter_id.kw_id.kraftwerk_name,
                                kraftwerksleiter: selectedSystem.mitarbeiter_id.kw_id.kraftwerksleiter,
                                zoneninstanzbesitzer: selectedSystem.mitarbeiter_id.kw_id.zoneninstanzbesitzer,
                                systemkoordinator: selectedSystem.mitarbeiter_id.kw_id.systemkoordinator
                            }
                        },
                        systemverantwortlicher_id: selectedSystem.systemverantwortlicher_id,
                        buerozugang: selectedSystem.buerozugang,
                        fernzugang: selectedSystem.fernzugang,
                        errichter: selectedSystem.errichter,
                        pdn: selectedSystem.pdn,
                        zugangsart: selectedSystem.zugangsart,
                        pdndate: selectedSystem.pdndate,
                        ksp_a: selectedSystem.ksp_a,
                        ksp_b: selectedSystem.ksp_b,
                        ksp_y: selectedSystem.ksp_y,
                        box_n: selectedSystem.box_n,
                        box_p: selectedSystem.box_p,
                        box_q: selectedSystem.box_q,
                        box_r: selectedSystem.box_r,
                        box_y: selectedSystem.box_y,
                        jae_a: selectedSystem.jae_a,
                        jae_b: selectedSystem.jae_b,
                        jae_c: selectedSystem.jae_c,
                        jae_d: selectedSystem.jae_d,
                        jae_e: selectedSystem.jae_e,
                        jae_f: selectedSystem.jae_f,
                        jae_y: selectedSystem.jae_y,
                        lip_r: selectedSystem.lip_r,
                        lip_s: selectedSystem.lip_s,
                        lip_y: selectedSystem.lip_y,
                        isms_Relevant: selectedSystem.isms_Relevant,
                        isms_Auswirkung: selectedSystem.isms_Auswirkung,
                        isms_Reduzierung: selectedSystem.isms_Reduzierung,
                        isms_Begruendung: selectedSystem.isms_Begruendung
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                element: {
                    ...prevState.element,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeUSB(e) {
        const { name, value } = e.target;
        if (name === 'status_usb_id'){
            const selectedUSB = this.state.usb_status.find(usb_status => usb_status.status === value);
            this.setState(prevState => ({
                element: {
                    ...prevState.element,
                    status_usb_id:{
                        ...prevState.element.status_usb_id,
                        status_usb_id: selectedUSB.status_usb_id,
                        status: selectedUSB.status
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                element: {
                    ...prevState.element,
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
                element: {
                    ...prevState.element,
                    kw_id:{
                        ...prevState.element.kw_id,
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
                element: {
                    ...prevState.element,
                    [name]: value,
                }
            })));
        }
    }

    //Methode zum Abschicken des Formulares
    handleSubmit(e) {
        e.preventDefault();
        const {
            kw_id,
            kks,
            kurztext,
            systemeinheit_id,
            system_id,
            status_usb_id,
            virenschutz_hersteller_id,
            status_rj45_id,
            betriebssystem_id,
            status_firewall_id,
            status_virenschutz_id,
            systemhersteller_id,
            modell,
            firmwareversion,
            office_id,
            ibs_datum,
            sonstige_sw,
            checkliste,
            backup,
            backup_test
        } = this.state.element;
        KomponentDataService.createKomponente(
            kw_id,
            kks,
            kurztext,
            systemeinheit_id,
            system_id,
            status_usb_id,
            virenschutz_hersteller_id,
            status_rj45_id,
            betriebssystem_id,
            status_firewall_id,
            status_virenschutz_id,
            systemhersteller_id,
            modell,
            firmwareversion,
            office_id,
            ibs_datum,
            sonstige_sw,
            checkliste,
            backup,
            backup_test
        )
            .then(response => {
                this.setState({
                    kw_id: {
                        kw_id: "",
                        kraftwerk_name: "",
                        kraftwerksleiter: "",
                        zoneninstanzbesitzer: "",
                        systemkoordinator: ""
                    },
                    kks: "",
                    kurztext: "",
                    systemeinheit_id: {
                        systemeinheit_id: "",
                        systemeinheit_name: ""
                    },
                    system_id: {
                        system_id: "",
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
                                kw_id: "",
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
                        isms_Relevant: "",
                        isms_Auswirkung: "",
                        isms_Reduzierung: "",
                        isms_Begruendung: ""
                    },
                    status_usb_id: {
                        status_usb_id: "",
                        status: ""
                    },
                    virenschutz_hersteller_id: {
                        herstellername: "",
                        version: "",
                        virenschutzhersteller_id: ""
                    },
                    status_rj45_id: {
                        status_rj45_id: "",
                        status: ""
                    },
                    betriebssystem_id: {
                        betriebssystem_id: "",
                        betriebssystem_name: ""
                    },
                    status_firewall_id: {
                        status_firewall_id: "",
                        status: ""
                    },
                    status_virenschutz_id: {
                        status_virenschutz_id: "",
                        status: "-"
                    },
                    systemhersteller_id: {
                        systemhersteller_id: "",
                        herstellername: ""
                    },
                    modell: "",
                    firmwareversion: "",
                    office_id: {
                        office_id: "",
                        version: ""
                    },
                    ibs_datum: "",
                    sonstige_sw: "",
                    checkliste: "",
                    backup: "",
                    backup_test: "",
                });
                this.props.router.navigate("/komponentenuebersicht");
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { kraftwerke,
            element,
            systemeinheiten,
            systeme,
            usb_status,
            vhersteller,
            rj45_status,
            betriebssysteme,
            firewall_status,
            virenschutz_status,
            shersteller,
            office } = this.state;

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
                <h2>Neues OT-Element</h2>
                <Form style={formular} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="kw_id">
                        <Form.Label>Standort:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="kw_id" value={element.kw_id.kraftwerk_name} onChange={this.handleChangeKraftwerk}>
                            <option value="">Standorte</option>
                            {kraftwerke.map((kw) => (
                                <option key={kw.kw_id} value={kw.kraftwerk_name}>
                                    {kw.kraftwerk_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="kks">
                        <Form.Label>KKS: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="kks" value={element.kks} onChange={this.handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="kurztext">
                        <Form.Label>Kurztext: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="kurztext" value={element.kurztext}  onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="systemeinheit_id">
                        <Form.Label>Systemeinheit:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="systemeinheit_id" value={element.systemeinheit_id.systemeinheit_name} onChange={this.handleChangeSystemeinheit}>
                            <option value="">Systemeinheiten</option>
                            {systemeinheiten.map((systemeinheit) => (
                                <option key={systemeinheit.systemeinheit_id} value={systemeinheit.systemeinheit_name}>
                                    {systemeinheit.systemeinheit_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="system_id">
                        <Form.Label>System:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="system_id" value={element.system_id.system_name} onChange={this.handleChangeSystem}>
                            <option value="">Systeme</option>
                            {systeme.map((system) => (
                                <option key={system.system_id} value={system.system_name}>
                                    {system.system_name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="status_usb_id">
                        <Form.Label>USB-Status:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="status_usb_id" value={element.status_usb_id.status} onChange={this.handleChangeUSB}>
                            <option value="">USB-Status</option>
                            {usb_status.map((usb_status) => (
                                <option key={usb_status.status_usb_id} value={usb_status.status}>
                                    {usb_status.status}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="virenschutz_hersteller_id">
                        <Form.Label>Virenschutzhersteller:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="virenschutz_hersteller_id" value={element.virenschutz_hersteller_id.herstellername} onChange={this.handleChangeVirenschutzhersteller}>
                            <option value="">Virenschutzhersteller</option>
                            {vhersteller.map((virenschutzhersteller) => (
                                <option key={virenschutzhersteller.virenschutzhersteller_id} value={virenschutzhersteller.herstellername}>
                                    {virenschutzhersteller.herstellername }
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="status_rj45_id">
                        <Form.Label>RJ45-Status:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="status_rj45_id" value={element.status_rj45_id.status} onChange={this.handleChangeRJ45}>
                            <option value="">RJ45-Status</option>
                            {rj45_status.map((rj45_status) => (
                                <option key={rj45_status.status_rj45_id} value={rj45_status.status}>
                                    {rj45_status.status }
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="betriebssystem_id">
                        <Form.Label>Betriebssystem:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="betriebssystem_id" value={element.betriebssystem_id.betriebssystem_name} onChange={this.handleChangeBetriebssystem}>
                            <option value="">Beriebssysteme</option>
                            {betriebssysteme.map((betriebssystem) => (
                                <option key={betriebssystem.betriebssystem_id} value={betriebssystem.betriebssystem_name}>
                                    {betriebssystem.betriebssystem_name }
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="status_firewall_id">
                        <Form.Label>Firewall-Status:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="status_firewall_id" value={element.status_firewall_id.status} onChange={this.handleChangeFirewall}>
                            <option value="">Firewall-Status</option>
                            {firewall_status.map((firewall_status) => (
                                <option key={firewall_status.status_firewall_id} value={firewall_status.status}>
                                    {firewall_status.status }
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="status_virenschutz_id">
                        <Form.Label>Virenschutzstatus:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="status_virenschutz_id" value={element.status_virenschutz_id.status} onChange={this.handleChangeVirenschutz}>
                            <option value="">Virenschutz-Status</option>
                            {virenschutz_status.map((virenschutz_status) => (
                                <option key={virenschutz_status.status_virenschutz_id} value={virenschutz_status.status}>
                                    {virenschutz_status.status }
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="systemhersteller_id">
                        <Form.Label>Systemhersteller:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="systemhersteller_id" value={element.systemhersteller_id.herstellername} onChange={this.handleChangeSystemhersteller}>
                            <option value="">Systemhersteller</option>
                            {shersteller.map((systemhersteller) => (
                                <option key={systemhersteller.systemhersteller_id} value={systemhersteller.herstellername}>
                                    {systemhersteller.herstellername }
                                </option>
                            ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="modell">
                        <Form.Label>Modell: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="modell" value={element.modell}  onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="firmwareversion">
                        <Form.Label>Firmwareversion: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="firmwareversion" value={element.firmwareversion}  onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="office_id">
                        <Form.Label>Office:</Form.Label>
                        <Form.Control style={auswahl} as="select" name="office_id" value={element.office_id.version} onChange={this.handleChangeOffice}>
                            <option value="">Office</option>
                            {office.map((office) => (
                                <option key={office.office_id} value={office.version}>
                                    {office.version }
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="ibs_datum">
                        <Form.Label>Inbetriebsetzungsdatum: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="ibs_datum" value={element.ibs_datum} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="sonstige_sw">
                        <Form.Label>sonstige Software: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="sonstige_sw" value={element.sonstige_sw}  onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="checkliste">
                        <Form.Label>Checkliste: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="checkliste" value={element.checkliste}  onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="backup">
                        <Form.Label>Backup: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="backup" value={element.backup}  onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="backup_test">
                        <Form.Label>Backup-Test: </Form.Label>
                        <Form.Control style={eingabe} type="text" name="backup_test" value={element.backup_test}  onChange={this.handleChange}/>
                    </Form.Group>
                    <Button style={button} variant="primary" type="submit">
                        Hinzufügen
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default withRouter(AddElement);