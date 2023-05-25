import React, {Component} from "react";
import { Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import KomponentDataService from "../../services/komponenten.service";
import System from "../SelectMenu/System";
import Systemeinheit from "../SelectMenu/Systemeinheit";
import Betriebssystem from "../SelectMenu/Betriebssystem";
import Systemhersteller from "../SelectMenu/Systemhersteller";
import USB from "../SelectMenu/USB";
import Firewall from "../SelectMenu/Firewall";
import RJ45 from "../SelectMenu/RJ45";
import Office from "../SelectMenu/Office";
import Virenschutz from "../SelectMenu/Virenschutz";
import Virenschutzhersteller from "../SelectMenu/Virenschutzhersteller";
import Kraftwerk from "../SelectMenu/Kraftwerk2";
import SystemherstellerDataService from "../../services/systemhersteller.service";

export default class AddKomponente extends Component {

    constructor(props) {
        super(props);
        this.onChangeKKS = this.onChangeKKS.bind(this);
        this.onChangeKurztext = this.onChangeKurztext.bind(this);
        this.onChangeKraftwerk = this.onChangeKraftwerk.bind(this);
        this.onChangeSoftware = this.onChangeSoftware.bind(this);
        this.onChangeModell = this.onChangeModell.bind(this);
        this.onChangeBackup= this.onChangeBackup.bind(this);
        this.onChangeIBS = this.onChangeIBS.bind(this);
        this.onChangeBackuptest= this.onChangeBackuptest.bind(this);
        this.onChangePatch = this.onChangePatch.bind(this);
        this.onChangeCheckliste= this.onChangeCheckliste.bind(this);
        this.handleKomponente = this.handleKomponente.bind(this);

        this.state = {
            aktuellesIT_Element: {
                kw_id: null,
                kks: "",
                kurztext:"",
                systemeinheit_id: null,
                system_id: null,
                status_usb_id: null,
                virenschutz_hersteller_id: null,
                status_rj45_id: null,
                betriebssystem_id: null,
                status_firewall_id: null,
                status_virenschutz_id: null,
                systemhersteller_id: null,
                modell: "",
                office_id: null,
                sonstige_sw:"",
                firmwareversion:"",
                backup: "",
                backup_test: "",
                ibs_datum: "",
                checkliste: "",

                successful: false,
                message: ""
            },
        };
    }

    handleKomponente(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            KomponentDataService.create(
                this.state.kw_id,
                this.state.kks,
                this.state.kurztext,
                this.state.systemeinheit_id,
                this.state.system_id,
                this.state.status_usb_id,
                this.state.virenschutz_hersteller_id,
                this.state.status_rj45_id,
                this.state.betriebssystem_id,
                this.state.status_firewall_id,
                this.state.status_virenschutz_id,
                this.state.systemhersteller_id,
                this.state.modell,
                this.state.office_id,
                this.state.sonstige_sw,
                this.state.firmwareversion,
                this.state.backup,
                this.state.backup_test,
                this.state.ibs_datum,
                this.state.checkliste,
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    onChangeKKS(e) {
        this.setState({
            kks: e.target.value
        });
    }

    onChangeKurztext(e) {
        this.setState({
            kurztext: e.target.value
        });
    }

    onChangeModell(e) {
        this.setState({
            modell: e.target.value
        });
    }

    onChangeKraftwerk(e) {
        this.setState({
            kw_id: e.target.value
        });
    }

    onChangePatch(e) {
        this.setState({
            firmware: e.target.value
        });
    }

    onChangeCheckliste(e) {
        this.setState({
            checkliste: e.target.value
        });
    }

    onChangeBackup(e) {
        this.setState({
            backup: e.target.value
        });
    }

    onChangeBackuptest(e) {
        this.setState({
            backup_test: e.target.value
        });
    }
    onChangeIBS(e) {
        this.setState({
            ibs_datum: e.target.value
        });
    }

    onChangeSoftware(e) {
        this.setState({
            sonstige_sw: e.target.value
        });
    }

    saveKomponente() {
        var data = {
            kw_id: this.state.kw_id,
            kks: this.state.kks,
            kurztext:this.state.kurztext,
            systemeinheit_id: this.state.systemeinheit_id,
            system_id: this.state.system_id,
            status_usb_id: this.state.status_usb_id,
            virenschutz_hersteller_id: this.state.virenschutz_hersteller_id,
            status_rj45_id: this.state.status_rj45_id,
            betriebssystem_id: this.state.betriebssystem_id,
            status_firewall_id: this.state.status_firewall_id,
            status_virenschutz_id: this.state.status_virenschutz_id,
            systemhersteller_id: this.state.systemhersteller_id,
            modell: this.state.modell,
            office_id: this.state.office_id,
            sonstige_sw:this.state.sonstige_sw,
            firmwareversion:this.state.firmwareversion,
            backup: this.state.backup,
            backup_test: this.state.backup_test,
            ibs_datum: this.state.ibs_datum,
            checkliste: this.state.checkliste,
        };

        KomponentDataService.create(data)
            .then(response => {
                this.setState({
                    it_element_id: response.data.it_element_id,
                    kw_id: response.data.kw_id,
                    kks: response.data.kks,
                    kurztext:response.data.kurztext,
                    systemeinheit_id: response.data.systemeinheit_id,
                    system_id: response.data.system_id,
                    status_usb_id: response.data.status_usb_id,
                    virenschutz_hersteller_id: response.data.virenschutz_hersteller_id,
                    status_rj45_id: response.data.status_rj45_id,
                    betriebssystem_id: response.data.betriebssystem_id,
                    status_firewall_id: response.data.status_firewall_id,
                    status_virenschutz_id: response.data.status_virenschutz_id,
                    systemhersteller_id: response.data.systemhersteller_id,
                    modell: response.data.modell,
                    office_id: response.data.office_id,
                    sonstige_sw:response.data.sonstige_sw,
                    firmwareversion:response.data.firmwareversion,
                    backup: response.data.backup,
                    backup_test: response.data.backup_test,
                    ibs_datum: response.data.ibs_datum,
                    checkliste: response.data.checkliste,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newKomponente() {
        this.setState({
            it_element_id: null,
            kw_id: null,
            kks: "",
            kurztext:"",
            systemeinheit_id: "",
            system_id: null,
            status_usb_id: null,
            virenschutz_hersteller_id: null,
            status_rj45_id: null,
            betriebssystem_id: null,
            status_firewall_id: null,
            status_virenschutz_id: null,
            systemhersteller_id: null,
            modell: "",
            office_id: null,
            sonstige_sw:"",
            firmwareversion:"",
            backup: "",
            backup_test: "",
            ibs_datum: "",
            checkliste: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Erfolgreich {this.state.kks} hinzugefügt!</h4>
                        <button onClick={this.newKomponente}>
                            Hinzufügen
                        </button>
                        <Button>
                            <Link
                                to={"/komponentenuebersicht"}>
                                Abbruch
                            </Link>
                        </Button>{' '}
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="kks">KKS: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="kks"
                                required
                                value={this.state.kks}
                                onChange={this.onChangeKKS}
                                name="kks"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="kw_id">Standort: </label><br/>
                            <Kraftwerk
                                id="kw_id === kraftwerk_name"
                                       required
                                       value={this.state.kw_id}
                                       onChange={this.onChangeKraftwerk}
                                       name="kw_id"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="kurztext">Kurztext: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="kurztext"
                                required
                                value={this.state.kurztext}
                                onChange={this.onChangeKurztext}
                                name="kurztext"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="systemeinheit_id">Systemeinheit: </label><br/>
                            <Systemeinheit/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="system_id">System: </label><br/>
                            <System/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="betriebssystem_id">Betriebssystem: </label><br/>
                            <Betriebssystem/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="systemhersteller_id">Systemhersteller: </label><br/>
                            <Systemhersteller/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="virenschutz_hersteller_id">Virenschutzhersteller: </label><br/>
                            <Virenschutzhersteller/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="modell">Modell: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="modell"
                                required
                                value={this.state.modell}
                                onChange={this.onChangeModell}
                                name="modell"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firmware">Patchzustand: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="firmware"
                                required
                                value={this.state.firmware}
                                onChange={this.onChangePatch}
                                name="firmware"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="backup">Backup: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="backup"
                                required
                                value={this.state.backup}
                                onChange={this.onChangeBackup}
                                name="backup"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="backup_test">Backuptest: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="backup_test"
                                required
                                value={this.state.backup_test}
                                onChange={this.onChangeBackuptest}
                                name="backup_test"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ibs_datum">Inbetriebsetzungsjahr: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="ibs_datum"
                                required
                                value={this.state.ibs_datum}
                                onChange={this.onChangeIBS}
                                name="ibs_datum"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status_usb_id">USB-Status: </label><br/>
                            <USB/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status_firewall_id">Firewallstautus: </label><br/>
                            <Firewall/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status_rj45_id">RJ45-Status: </label><br/>
                            <RJ45/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="status_virenschutz_id">Virenschutzstatus: </label><br/>
                            <Virenschutz/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="office_id">Office: </label><br/>
                            <Office/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="sonstige_sw">Sonstige Software: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="sonstige_sw"
                                required
                                value={this.state.sonstige_sw}
                                onChange={this.onChangeSoftware}
                                name="sonstige_sw"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="checkliste">Checkliste: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="checkliste"
                                required
                                value={this.state.checkliste}
                                onChange={this.onChangeCheckliste}
                                name="checkliste"
                            />
                        </div>
                        <button onClick={this.saveKomponente} className="btn btn-success">
                            Speichern
                        </button>
                    </div>
                )}
            </div>
        );
    }
}