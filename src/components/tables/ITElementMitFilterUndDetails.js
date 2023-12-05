import React, {Component} from "react";
import "../../App.css";
import {BsInfoCircle} from "@react-icons/all-files/bs/BsInfoCircle";
import KomponentDataService from "../../services/komponenten.service";
import {Button, CloseButton, Form, Tab, Table, Tabs} from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import SystemeinheitDataService from "../../services/systemeinheit.service";
import SystemDataService from "../../services/system.service";
import StatusUSBDataService from "../../services/usb.service";
import StatusRJ45DataService from "../../services/rj45.service";
import StatusFirewallDataService from "../../services/firewall.service";
import StatusVirenschutzDataService from "../../services/virenschutz.service";
import VirenschutzherstellerDataService from "../../services/virenschutzhersteller.service";
import BetriebssystemDataService from "../../services/betriebssystem.service";
import SystemherstellerDataService from "../../services/systemhersteller.service";
import OfficeDataService from "../../services/office.service";
import KraftwerkDataService from "../../services/kraftwerk.service";
import AuthService from "../../services/auth.service";

export default class ITElementMitFilterUndDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aktuellesIT_Element: {
                it_element_id: null,
                kw_id: {
                    kw_id: "4",
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
                        kw_id: 4,
                        kraftwerk_name: "",
                        kraftwerksleiter: "",
                        zoneninstanzbesitzer: "",
                        systemkoordinator: ""
                    },
                    mitarbeiter_id: {
                        mitarbeiter_id: "10",
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
                    isms_Relevant:"",
                    isms_Auswirkung: "",
                    isms_Reduzierung: "",
                    isms_Begruendung: ""
                },
                status_usb_id: {
                    status_usb_id: 1,
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
                    status: ""
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
                backup_test: ""
            },
            komponente: [],
            disabled: true,
            currentIndex: -1,
            editMode: true,
            kksFilter: "",
            systemeinheitFilter: "",
            systemFilter: "",
            betriebssystemFilter: "",
            herstellerFilter: "",
            modellFilter: "",
            totalIT_Elemente: 0,
            filteredKomponenten: [], //erstellt Array für gefilterte Komponenten nach kw_id
            currentStandort: undefined,
            kraftwerke: [],
            systemeinheiten: [],
            systeme: [],
            usb_status: [],
            rj45_status: [],
            firewall_status: [],
            virenschutz_status: [],
            vhersteller: [],
            betriebssysteme: [],
            shersteller: [],
            office: [],
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleView2 = this.handleView2.bind(this);
        this.refreshTabelle = this.refreshTabelle.bind(this);
        this.retrieveKomponente = this.retrieveKomponente.bind(this);

        //this.updateKomponenten = this.updateKomponenten.bind(this);
        this.deleteKomponente = this.deleteKomponente.bind(this);

        this.ChangeKraftwerk = this.ChangeKraftwerk.bind(this);
        this.ChangeSystemeinheit = this.ChangeSystemeinheit.bind(this);
        this.handleChangeSystem = this.handleChangeSystem.bind(this);
        this.handleChangeVirenschutzhersteller = this.handleChangeVirenschutzhersteller.bind(this);
        this.handleChangeUSB = this.handleChangeUSB.bind(this);
        this.handleChangeRJ45 = this.handleChangeRJ45.bind(this);
        this.handleChangeFirewall = this.handleChangeFirewall.bind(this);
        this.handleChangeVirenschutz = this.handleChangeVirenschutz.bind(this);
        this.handleChangeBetriebssystem = this.handleChangeBetriebssystem.bind(this);
        this.handleChangeSystemhersteller = this.handleChangeSystemhersteller.bind(this);
        this.handleChangeOffice = this.handleChangeOffice.bind(this);

        this.onChangeKKS = this.onChangeKKS.bind(this);
        this.onChangeSoftware = this.onChangeSoftware.bind(this);
        this.onChangeKurztext = this.onChangeKurztext.bind(this);
        this.onChangeModell = this.onChangeModell.bind(this);
        this.onChangeBackup= this.onChangeBackup.bind(this);
        this.onChangeIBS = this.onChangeIBS.bind(this);
        this.onChangeBackuptest= this.onChangeBackuptest.bind(this);
        this.onChangePatch = this.onChangePatch.bind(this);
        this.onChangeCheckliste= this.onChangeCheckliste.bind(this);

    }

    onChangeKKS(e) {
        const kks = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    kks: kks
                }
            };
        });
    }

    onChangeSoftware(e) {
        const sonstige_sw = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    sonstige_sw: sonstige_sw
                }
            };
        });
    }

    ChangeKraftwerk(e) {
        const { name, value } = e.target;
        if (name === 'kw_id'){
            const selectedKraftwerk = this.state.kraftwerke.find(kraftwerk => kraftwerk.kraftwerk_name === value);
            this.setState(prevState => ({
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    kw_id:{
                        ...prevState.filteredKomponenten.kw_id,
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
                filteredKomponenten: {
                    ...prevState.filteredKomponenten,
                    [name]: value,
                }
            })));
        }
    }

    ChangeSystemeinheit(e) {
        const { name, value } = e.target;
        if (name === 'systemeinheit_id'){
            const selectedSystemeinheit = this.state.systemeinheiten.find(systemeinheit => systemeinheit.systemeinheit_name === value);
            this.setState(prevState => ({
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    systemeinheit_id:{
                        ...prevState.filteredKomponenten.systemeinheit_id,
                        systemeinheit_id: selectedSystemeinheit.systemeinheit_id,
                        systemeinheit_name: selectedSystemeinheit.systemeinheit_name
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                filteredKomponenten: {
                    ...prevState.filteredKomponenten,
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
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    virenschutz_hersteller_id:{
                        ...prevState.filteredKomponenten.virenschutz_hersteller_id,
                        virenschutzhersteller_id: selectedVirenschutzhersteller.virenschutzhersteller_id,
                        herstellername: selectedVirenschutzhersteller.herstellername,
                        version: selectedVirenschutzhersteller.version,
                    },
                }
            }));
        }else {
            this.setState((prevState => ({
                filteredKomponenten: {
                    ...prevState.filteredKomponenten,
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
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    system_id:{
                        ...prevState.filteredKomponenten.system_id,
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
                filteredKomponenten: {
                    ...prevState.filteredKomponenten,
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
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    status_usb_id:{
                        ...prevState.filteredKomponenten.status_usb_id,
                        status_usb_id: selectedUSB.status_usb_id,
                        status: selectedUSB.status
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                filteredKomponenten: {
                    ...prevState.filteredKomponenten,
                    [name]: value,
                }
            })));
        }
    }

    handleChangeRJ45(e) {
        const { name, value } = e.target;
        if (name === 'status_rj45_id'){
            const selectedRJ45 = this.state.rj45_status.find(rj45_status => rj45_status.status === value);
            this.setState(prevState => ({
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    status_rj45_id:{
                        ...prevState.filteredKomponenten.status_rj45_id,
                        status_rj45_id: selectedRJ45.status_rj45_id,
                        status: selectedRJ45.status
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                filteredKomponenten: {
                    ...prevState.filteredKomponenten,
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
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    betriebssystem_id:{
                        ...prevState.filteredKomponenten.betriebssystem_id,
                        betriebssystem_id: selectedBetriebssystem.betriebssystem_id,
                        betriebssystem_name: selectedBetriebssystem.betriebssystem_name
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                filteredKomponenten: {
                    ...prevState.filteredKomponenten,
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
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    status_firewall_id:{
                        ...prevState.filteredKomponenten.status_firewall_id,
                        status_firewall_id: selectedFirewall.status_firewall_id,
                        status: selectedFirewall.status
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                filteredKomponenten: {
                    ...prevState.filteredKomponenten,
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
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    status_virenschutz_id:{
                        ...prevState.filteredKomponenten.status_virenschutz_id,
                        status_virenschutz_id: selectedVirenschutz.status_virenschutz_id,
                        status: selectedVirenschutz.status
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                filteredKomponenten: {
                    ...prevState.filteredKomponenten,
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
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    systemhersteller_id:{
                        ...prevState.filteredKomponenten.systemhersteller_id,
                        systemhersteller_id: selectedSystemhersteller.systemhersteller_id,
                        herstellername: selectedSystemhersteller.herstellername
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                filteredKomponenten: {
                    ...prevState.filteredKomponenten,
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
                aktuellesIT_Element: {
                    ...prevState.aktuellesIT_Element,
                    office_id:{
                        ...prevState.filteredKomponenten.office_id,
                        office_id: selectedOffice.office_id,
                        version: selectedOffice.version
                    },
                }
            }));
        }
        else {
            this.setState((prevState => ({
                filteredKomponenten: {
                    ...prevState.filteredKomponenten,
                    [name]: value,
                }
            })));
        }
    }

    onChangeKurztext(e) {
        const kurztext = e.target.value;

        this.setState(prevState => ({
            aktuellesIT_Element: {
                ...prevState.aktuellesIT_Element,
                kurztext: kurztext
            }
        }));
    }

    onChangeModell(e) {
        const modell = e.target.value;

        this.setState(prevState => ({
            aktuellesIT_Element: {
                ...prevState.aktuellesIT_Element,
                modell: modell
            }
        }));
    }

    onChangePatch(e) {
        const firmwareversion = e.target.value;

        this.setState(prevState => ({
            aktuellesIT_Element: {
                ...prevState.aktuellesIT_Element,
                firmwareversion: firmwareversion
            }
        }));
    }

    onChangeCheckliste(e) {
        const checkliste = e.target.value;

        this.setState(prevState => ({
            aktuellesIT_Element: {
                ...prevState.aktuellesIT_Element,
                checkliste: checkliste
            }
        }));
    }

    onChangeBackup(e) {
        const backup = e.target.value;

        this.setState(prevState => ({
            aktuellesIT_Element: {
                ...prevState.aktuellesIT_Element,
                backup: backup
            }
        }));
    }

    onChangeBackuptest(e) {
        const backup_test = e.target.value;

        this.setState(prevState => ({
            aktuellesIT_Element: {
                ...prevState.aktuellesIT_Element,
                backup_test: backup_test
            }
        }));
    }

    onChangeIBS(e) {
        const ibs_datum = e.target.value;

        this.setState(prevState => ({
            aktuellesIT_Element: {
                ...prevState.aktuellesIT_Element,
                ibs_datum: ibs_datum
            }
        }));
    }

    // Methode zum Aktualisieren des
    updateKomponente = () => {
        fetch(`http://localhost:8080/api/it_element/${this.state.aktuellesIT_Element.it_element_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kw_id: this.state.aktuellesIT_Element.kw_id,
                kks: this.state.aktuellesIT_Element.kks,
                kurztext: this.state.aktuellesIT_Element.kurztext,
                systemeinheit_id: this.state.aktuellesIT_Element.systemeinheit_id,
                system_id: this.state.aktuellesIT_Element.system_id,
                status_usb_id: this.state.aktuellesIT_Element.status_usb_id,
                virenschutz_hersteller_id: this.state.aktuellesIT_Element.virenschutz_hersteller_id,
                status_rj45_id: this.state.aktuellesIT_Element.status_rj45_id,
                betriebssystem_id: this.state.aktuellesIT_Element.betriebssystem_id,
                status_firewall_id: this.state.aktuellesIT_Element.status_firewall_id,
                status_virenschutz_id: this.state.aktuellesIT_Element.status_virenschutz_id,
                systemhersteller_id: this.state.aktuellesIT_Element.systemhersteller_id,
                modell: this.state.aktuellesIT_Element.modell,
                firmwareversion: this.state.aktuellesIT_Element.firmwareversion,
                office_id: this.state.aktuellesIT_Element.office_id,
                ibs_datum: this.state.aktuellesIT_Element.ibs_datum,
                sonstige_sw: this.state.aktuellesIT_Element.sonstige_sw,
                checkliste: this.state.aktuellesIT_Element.checkliste,
                backup: this.state.aktuellesIT_Element.backup,
                backup_test: this.state.aktuellesIT_Element.backup_test,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                //this.refreshTabelle();
                this.setState({
                    viewMode: false
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    refreshTabelle() {
        this.retrieveKomponente();
        this.setState({
            aktuelleKomponente: null,
            currentIndex: -1
        });
    }

    retrieveKomponente() {
        const kraftwerk = KraftwerkDataService.getCurrentKraftwerk();

        if (kraftwerk) {
            this.setState({
                currentStandort: kraftwerk.kraftwerk_name,
            });
        }

        const filteredkomponenten = KomponentDataService.getCurrentKomponente();

        if (kraftwerk.kw_id === 13) {
            KomponentDataService.getAll()
                .then(response => {
                    this.setState({
                        filteredKomponenten: response.data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }else {
            this.setState({
                filteredKomponenten: filteredkomponenten,
            });}
    }

    deleteKomponente(it_element_id) {
        KomponentDataService.delete(it_element_id)
            .then(response => {
                console.log(response);
                this.refreshTabelle();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleView(index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuellesIT_Element: { ...this.state.filteredKomponenten[index] }
        });
    }

    handleView2(index) {

        this.setState({
            currentIndex: index,
            viewMode2: true,
            aktuellesIT_Element: { ...this.state.filteredKomponenten[index] }
        });
    }

    handleCancel(e) {
        this.setState({
            currentIndex: -1,
            viewMode: false,
            viewMode2: false,
            aktuellesIT_Element: {}
        });
        e.preventDefault();
    }

    componentDidMount(){

        this.retrieveKomponente();
        this.refreshKraftwerk();
        this.refreshSystemeinheit();
        this.refreshSystem();
        this.refreshUSB();
        this.refreshVirenschutzhersteller();
        this.refreshRJ45();
        this.refreshBetriebssystem();
        this.refreshSystemhersteller();
        this.refreshFirewall();
        this.refreshVirenschutz();
        this.refreshOffice();

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

    refreshUSB() {

        StatusUSBDataService.getAll()
            .then(response => {
                this.setState({
                    usb_status: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshFirewall() {

        StatusFirewallDataService.getAll()
            .then(response => {
                this.setState({
                    firewall_status: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshRJ45() {

        StatusRJ45DataService.getAll()
            .then(response => {
                this.setState({
                    rj45_status: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshVirenschutz() {

        StatusVirenschutzDataService.getAll()
            .then(response => {
                this.setState({
                    virenschutz_status: response.data
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

    handleKksFilterChange = (e) => {
        const { value } = e.target;
        this.setState({ kksFilter: value });
        if (value === '') {
            this.setState({ systemFilter: '' });
            this.setState({ systemeinheitFilter: '' });
            this.setState({ betriebssystemFilter: '' });
            this.setState({ herstellerFilter: '' });
            this.setState({ modellFilter: '' });
        }
    }

    handleSystemFilterChange = (event) => {
        const { value } = event.target;
        this.setState({ systemFilter: value });
        if (value === '') {
            this.setState({ kksFilter: '' });
            this.setState({ systemeinheitFilter: '' });
            this.setState({ betriebssystemFilter: '' });
            this.setState({ herstellerFilter: '' });
            this.setState({ modellFilter: '' });
        }
    }

    handleSystemeinheitFilterChange = (event) => {
        const { value } = event.target;
        this.setState({ systemeinheitFilter: value });
        if (value === '') {
            this.setState({ kksFilter: '' });
            this.setState({ systemFilter: '' });
            this.setState({ betriebssystemFilter: '' });
            this.setState({ herstellerFilter: '' });
            this.setState({ modellFilter: '' });
        }
    }

    handleBetriebssystemFilterChange = (event) => {
        const { value } = event.target;
        this.setState({ betriebssystemFilter: value });
        if (value === '') {
            this.setState({ kksFilter: '' });
            this.setState({ systemFilter: '' });
            this.setState({ systemeinheitFilter: '' });
            this.setState({ herstellerFilter: '' });
            this.setState({ modellFilter: '' });
        }
    }

    handleSystemherstellerFilterChange = (event) => {
        const { value } = event.target;
        this.setState({ herstellerFilter: value });
        if (value === '') {
            this.setState({ kksFilter: '' });
            this.setState({ systemFilter: '' });
            this.setState({ systemeinheitFilter: '' });
            this.setState({ modellFilter: '' });
            this.setState({ betriebssystemFilter: '' });
        }
    }

    handleModellFilterChange = (event) => {
        const { value } = event.target;
        this.setState({ modellFilter: value });
        if (value === '') {
            this.setState({ kksFilter: '' });
            this.setState({ systemFilter: '' });
            this.setState({ systemeinheitFilter: '' });
            this.setState({ herstellerFilter: '' });
            this.setState({ betriebssystemFilter: '' });
        }
    }

    render() {
        const { disabled, kraftwerke, systemeinheiten, systeme, usb_status, rj45_status, firewall_status, virenschutz_status, vhersteller, betriebssysteme, shersteller, office,
            kksFilter, systemFilter,systemeinheitFilter,betriebssystemFilter, filteredKomponenten, herstellerFilter, modellFilter } = this.state;

        const filteredData = filteredKomponenten.filter((dt) =>
            dt.kks.toLowerCase().includes(kksFilter.toLowerCase())
            //&& dt.modell.toLowerCase().includes(modellFilter.toLowerCase())
            && dt.systemeinheit_id.systemeinheit_name.toLowerCase().includes(systemeinheitFilter.toLowerCase())
            && dt.betriebssystem_id.betriebssystem_name.toLowerCase().includes(betriebssystemFilter.toLowerCase())
            && dt.systemhersteller_id.herstellername.toLowerCase().includes(herstellerFilter.toLowerCase())
            && dt.system_id.system_name.toLowerCase().includes(systemFilter.toLowerCase()));

        const totalIT_Elemente = filteredData.length;

        const h4 = {
            marginTop: "1%"
        }


        if (totalIT_Elemente === 0) return null;

        const tabs ={
            color: '#161616',
            border: "5px"
        }

        const tab ={
            textDecoration: "none"
        }

        const button2 ={
            marginLeft: "5px"
        }

        const text = {
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
            <>
                <div className="tableScroll">
                    <Table striped bordered data={filteredKomponenten} >
                        <tbody>
                        <tr>
                            <th>KKS
                                <br />
                                <br />
                                <input
                                    className="filter"
                                    value={kksFilter}
                                    onChange={this.handleKksFilterChange}
                                />
                            </th>
                            <th>Kurztext</th>
                            <th>System-einheit
                                <br/>
                                <input
                                    className="filter"
                                    value={systemeinheitFilter}
                                    onChange={this.handleSystemeinheitFilterChange}
                                />
                            </th>
                            <th>System
                                <br />
                                <br/>
                                <input
                                    className="filter"
                                    value={systemFilter}
                                    onChange={this.handleSystemFilterChange}
                                />
                            </th>
                            <th>Betriebs-system
                                <br />
                                <input
                                    className="filter"
                                    value={betriebssystemFilter || ''}
                                    onChange={this.handleBetriebssystemFilterChange}
                                />
                            </th>
                            <th>Hersteller
                                <br/>
                                <br />
                                <input
                                    className="filter"
                                    value={herstellerFilter}
                                    onChange={this.handleSystemherstellerFilterChange}
                                />
                            </th>
                            <th>Modell
                                <br/>
                                <br />
                                <input
                                    className="filter"
                                    value={modellFilter}
                                    onChange={this.handleModellFilterChange}
                                />
                            </th>
                            <th>Action</th>
                        </tr>
                        </tbody>
                        <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.kks}</td>
                                <td>{item.kurztext}</td>
                                <td>{item.systemeinheit_id.systemeinheit_name}</td>
                                <td>{item.system_id.system_name}</td>
                                <td>{item.betriebssystem_id.betriebssystem_name}</td>
                                <td>{item.systemhersteller_id.herstellername}</td>
                                <td>{item.modell}</td>
                                <td>
                                    <Button
                                        onClick={() => this.handleView(index)}
                                    >
                                        <BsInfoCircle />
                                    </Button>
                                    <Button
                                        disabled={disabled}
                                        variant="success"
                                        style={button2}
                                        onClick={() => this.handleView2(index)}
                                    >
                                        <BsGearFill/>
                                    </Button>
                                    <Button
                                        disabled={disabled}
                                        variant="danger"
                                        style={button2}
                                        onClick={() => this.deleteKomponente (item.it_element_id)}
                                    >
                                        <FaTrashAlt/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    {this.state.viewMode && (
                        <div
                            className={
                                "modal " + (this.state.viewMode ? "displayBlock" : "displayNone")
                            }
                        >
                            <div className="modal-content">
                                <Row>
                                    <Col md={16} className="mb-2">
                                        <Tabs
                                            defaultActiveKey="profile"
                                            id="justify-tab-example"
                                            className="mb-3"
                                            justify
                                            style={tabs}
                                        >
                                            <Tab style={tab} eventKey="allgemein" title="Allgemein">
                                                <Table striped bordered >
                                                    <tbody>
                                                    <tr>
                                                        <th>Kraftwerk</th>
                                                        <th>Patchzustand</th>
                                                        <th>IBS</th>
                                                    </tr>
                                                    </tbody>
                                                    <tbody>
                                                    <td>{this.state.aktuellesIT_Element.kw_id.kraftwerk_name}</td>
                                                    <td>{this.state.aktuellesIT_Element.firmwareversion}</td>
                                                    <td>{this.state.aktuellesIT_Element.ibs_datum}</td>
                                                    </tbody>
                                                </Table>
                                            </Tab>
                                            <Tab style={tab} eventKey="komponentenstatus" title="Komponentenstatus">
                                                <Table striped bordered >
                                                    <tbody>
                                                    <tr>
                                                        <th>Backup erstellt</th>
                                                        <th>Backuptest</th>
                                                        <th>Status_USB</th>
                                                        <th>Status_RJ45</th>
                                                        <th>Virenschutz</th>
                                                        <th>Firewall</th>
                                                    </tr>
                                                    </tbody>
                                                    <tbody>
                                                    <td>{this.state.aktuellesIT_Element.backup}</td>
                                                    <td>{this.state.aktuellesIT_Element.backup_test}</td>
                                                    <td>{this.state.aktuellesIT_Element.status_usb_id.status}</td>
                                                    <td>{this.state.aktuellesIT_Element.status_rj45_id.status}</td>
                                                    <td>{this.state.aktuellesIT_Element.status_virenschutz_id.status}</td>
                                                    <td>{this.state.aktuellesIT_Element.status_firewall_id.status}</td>
                                                    </tbody>
                                                </Table>
                                            </Tab>
                                            <Tab  style={tab} eventKey="Software" title="Software">
                                                <Table striped bordered >
                                                    <tbody>
                                                    <tr>
                                                        <th>Office</th>
                                                        <th>sonstige Software</th>
                                                    </tr>
                                                    </tbody>
                                                    <tbody>
                                                    <td>{this.state.aktuellesIT_Element.office_id.version}</td>
                                                    <td>{this.state.aktuellesIT_Element.sonstige_sw}</td>
                                                    </tbody>
                                                </Table>
                                            </Tab>
                                        </Tabs>
                                    </Col>
                                </Row>
                                <Button  onClick={(e) => this.handleCancel(e)}>Schließen</Button>
                            </div>
                        </div>
                    )}
                    {this.state.viewMode2 && (
                        <div
                            className={
                                "modal " + (this.state.viewMode2 ? "displayBlock" : "displayNone")
                            }
                        >
                            <div className="modal-content" style={text}>
                                <div className="modal-header"
                                     style={{ display: 'block', position: 'initial' }}
                                >
                                    <CloseButton className="modal-header" onClick={(e) => this.handleCancel(e)}/>
                                </div>
                                <div>
                                    <h3>Komponentendaten</h3>
                                </div>
                                <Row>
                                    <Col md={16} className="mb-2">
                                        <Form>
                                            <Row style={row}>
                                                <label>
                                                    <strong>Standort: </strong>
                                                </label>
                                                <Form.Control as="select" name="kw_id" value={this.state.aktuellesIT_Element.kw_id.kraftwerk_name} onChange={this.ChangeKraftwerk}>
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
                                                    <strong>KKS:</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="kks"
                                                    value={this.state.aktuellesIT_Element.kks}
                                                    onChange={this.onChangeKKS}
                                                />
                                                <label>
                                                    <strong>Kurztext:</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="kurztext"
                                                    value={this.state.aktuellesIT_Element.kurztext}
                                                    onChange={this.onChangeKurztext}
                                                />
                                                <label>
                                                    <strong>Systemeinheit: </strong>
                                                </label>
                                                <Form.Control as="select" name="kw_id" value={this.state.aktuellesIT_Element.systemeinheit_id.systemeinheit_name}>
                                                    <option value="">Systemeinheit</option>
                                                    {
                                                        systemeinheiten.map((systemeinheit) => (
                                                            <option key={systemeinheit.systemeinheit_id} value={systemeinheit.systemeinheit_name}>
                                                                {systemeinheit.systemeinheit_name}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                <label>
                                                    <strong>System: </strong>
                                                </label>
                                                <Form.Control as="select" name="system_id" value={this.state.aktuellesIT_Element.system_id.system_name} onChange={this.handleChangeSystem}>
                                                    <option value="">Systeme</option>
                                                    {
                                                        systeme.map((system) => (
                                                            <option key={system.system_id} value={system.system_name}>
                                                                {system.system_name}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                <label>
                                                    <strong>USB-Status: </strong>
                                                </label>
                                                <Form.Control as="select" name="status_usb_id" value={this.state.aktuellesIT_Element.status_usb_id.status} onChange={this.handleChangeUSB}>
                                                    <option value="">USB-Status</option>
                                                    {
                                                        usb_status.map((status_usb) => (
                                                            <option key={status_usb.status_usb_id} value={status_usb.status}>
                                                                {status_usb.status}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                <label>
                                                    <strong>Virenschutzhersteller: </strong>
                                                </label>
                                                <Form.Control as="select" name="virenschutz_hersteller_id" value={this.state.aktuellesIT_Element.virenschutz_hersteller_id.herstellername} onChange={this.handleChangeVirenschutzhersteller}>
                                                    <option value="">Virenschutzhersteller</option>
                                                    {
                                                        vhersteller.map((vhersteller) => (
                                                            <option key={vhersteller.virenschutz_hersteller_id} value={vhersteller.herstellername}>
                                                                {vhersteller.herstellername}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                <label>
                                                    <strong>RJ45-Status: </strong>
                                                </label>
                                                <Form.Control as="select" name="status_rj45_id" value={this.state.aktuellesIT_Element.status_rj45_id.status} onChange={this.handleChangeRJ45}>
                                                    <option value="">RJ45-Status</option>
                                                    {
                                                        rj45_status.map((status_rj45) => (
                                                            <option key={status_rj45.status_rj45_id} value={status_rj45.status}>
                                                                {status_rj45.status}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                <label>
                                                    <strong>Betriebssystem: </strong>
                                                </label>
                                                <Form.Control as="select" name="betriebssystem_id" value={this.state.aktuellesIT_Element.betriebssystem_id.betriebssystem_name} onChange={this.handleChangeBetriebssystem}>
                                                    <option value="">Betriebssysteme</option>
                                                    {
                                                        betriebssysteme.map((betriebssystem) => (
                                                            <option key={betriebssystem.betriebssystem_id} value={betriebssystem.betriebssystem_name}>
                                                                {betriebssystem.betriebssystem_name}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                <label>
                                                    <strong>Firewall-Status: </strong>
                                                </label>
                                                <Form.Control as="select" name="status_firewall_id" value={this.state.aktuellesIT_Element.status_firewall_id.status} onChange={this.handleChangeFirewall}>
                                                    <option value="">Firewall-Status</option>
                                                    {
                                                        firewall_status.map((status_firewall) => (
                                                            <option key={status_firewall.status_firewall_id} value={status_firewall.status}>
                                                                {status_firewall.status}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Row>
                                            <Row style={row2}>
                                                <label>
                                                    <strong>Virenschutz-Status: </strong>
                                                </label>
                                                <Form.Control as="select" name="status_virenschutz_id" value={this.state.aktuellesIT_Element.status_virenschutz_id.status} onChange={this.handleChangeVirenschutz}>
                                                    <option value="">Virenschutz-Status</option>
                                                    {
                                                        virenschutz_status.map((status_virenschutz) => (
                                                            <option key={status_virenschutz.status_virenschutz_id} value={status_virenschutz.status}>
                                                                {status_virenschutz.status}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                <label>
                                                    <strong>Systemhersteller: </strong>
                                                </label>
                                                <Form.Control as="select" name="systemhersteller_id" value={this.state.aktuellesIT_Element.systemhersteller_id.herstellername} onChange={this.handleChangeSystemhersteller}>
                                                    <option value="">Systemhersteller</option>
                                                    {shersteller.map((systemhersteller) => (
                                                        <option key={systemhersteller.systemhersteller_id} value={systemhersteller.herstellername}>
                                                            {systemhersteller.herstellername }
                                                        </option>
                                                    ))
                                                    }
                                                </Form.Control>
                                                <label>
                                                    <strong>Modell:</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="model"
                                                    value={this.state.aktuellesIT_Element.modell}
                                                    onChange={this.onChangeModell}
                                                />
                                                <label>
                                                    <strong>Patchzustand:</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="firmwareversion"
                                                    value={this.state.aktuellesIT_Element.firmwareversion}
                                                    onChange={this.onChangePatch}
                                                />
                                                <label>
                                                    <strong>Office: </strong>
                                                </label>
                                                <Form.Control as="select" name="office_id" value={this.state.aktuellesIT_Element.office_id.version} onChange={this.handleChangeOffice}>
                                                    <option value="">Office</option>
                                                    {
                                                        office.map((version) => (
                                                            <option key={version.office_id} value={version.version}>
                                                                {version.version}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                                <label>
                                                    <strong>Inbetriebssetzungsdatum:</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="ibs_datum"
                                                    value={this.state.aktuellesIT_Element.ibs_datum}
                                                    onChange={this.onChangeIBS}
                                                />
                                                <label>
                                                    <strong>sonstige Software:</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="sonstige_sw"
                                                    value={this.state.aktuellesIT_Element.sonstige_sw}
                                                    onChange={this.onChangeSoftware}
                                                />
                                                <label>
                                                    <strong>Checkliste:</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="checkliste"
                                                    value={this.state.aktuellesIT_Element.checkliste}
                                                    onChange={this.onChangeCheckliste}
                                                />
                                                <label>
                                                    <strong>Backup:</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="backup"
                                                    value={this.state.aktuellesIT_Element.backup}
                                                    onChange={this.onChangeBackup}
                                                />
                                                <label>
                                                    <strong>Backuptest:</strong>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="backup_test"
                                                    value={this.state.aktuellesIT_Element.backup_test}
                                                    onChange={this.onChangeBackuptest}
                                                />
                                            </Row>
                                        </Form>
                                    </Col>
                                </Row>
                                <Button
                                    onClick={this.updateKomponente}
                                >
                                    Speichern
                                </Button>
                            </div>
                        </div>
                    )
                    }
                </div>
                <div>
                    <h4 style={h4}>
                        <strong>{totalIT_Elemente}</strong> IT-Elemente
                    </h4>
                </div>
            </>
        );
    }
}