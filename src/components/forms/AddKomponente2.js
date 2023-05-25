import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import SystemherstellerDataService from "../../services/systemhersteller.service";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Select from "react-select";
import Kraftwerk from "../SelectMenu/Kraftwerk2";
import Systemeinheit from "../SelectMenu/Systemeinheit";
import System from "../SelectMenu/System";
import USB from "../SelectMenu/USB";
import Virenschutzhersteller from "../SelectMenu/Virenschutzhersteller";
import RJ45 from "../SelectMenu/RJ45";
import Betriebssystem from "../SelectMenu/Betriebssystem";
import Firewall from "../SelectMenu/Firewall";
import Virenschutz from "../SelectMenu/Virenschutz";
import Systemhersteller from "../SelectMenu/Systemhersteller";
import Office from "../SelectMenu/Office";
import KomponentenService from "../../services/komponenten.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Dieses Feld ist erforderlich!
            </div>
        );
    }
};

export default class AddKomponente2 extends Component {
    constructor(props) {
        super(props);
        this.handleKomponente = this.handleKomponente.bind(this);
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

        this.state = {
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
        };
    }

    onChangeSystemhersteller(e) {
        this.setState({
            herstellername: e.target.value
        });
    }


    handleKomponente(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            KomponentenService.create(
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

    render() {
        const link ={
            color: '#FFF',
            textDecoration: "none"
        }

        return (
            <div>
                {this.state.successful ? (
                    <div>
                        <h4>Erfolgreich {this.state.kks} hinzugefügt!</h4>
                        <Button>
                            <Link style={link} to={"/komponentenuebersicht"}>
                                Zurück
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="container">
                        <img
                            src="https://cdn.icon-icons.com/icons2/2449/PNG/512/chip_component_hardware_icon_148853.png"
                            alt="profile-img"
                            className="profile-img-card"
                        />

                        <Form
                            onSubmit={this.handleKomponente}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="kks">KKS:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="kks"
                                            value={this.state.kks}
                                            onChange={this.onChangeKKS}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="kw_id">Standort:</label>
                                        <Kraftwerk name="kw_id"
                                                   value={this.state.kw_id}
                                                   onChange={this.onChangeKraftwerk}
                                                   validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="kurztext">Kurztext:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="kurztext"
                                            value={this.state.kurztext}
                                            onChange={this.onChangeKurztext}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="systemeinheit_id">Systemeinheit:</label>
                                        <Systemeinheit
                                            name="systemeinheit_id"
                                            value={this.state.systemeinheit_id}
                                            onChange={this.onChangeKraftwerk}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="system_id">System:</label>
                                        <System
                                            name="system_id"
                                            value={this.state.system_id}
                                            onChange={this.onChangeBackup}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status_usb_id">USB-Status:</label>
                                        <USB
                                            name="status_usb_id"
                                            value={this.state.status_usb_id}
                                            onChange={this.onChangeKKS}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="virenschutz_hersteller_id">Virenschutzhersteller:</label>
                                        <Virenschutzhersteller
                                            name="virenschutz_hersteller_id"
                                            value={this.state.virenschutz_hersteller_id}
                                            onChange={this.onChangeKKS}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status_rj45_id">RJ45-Status:</label>
                                        <RJ45
                                            name="status_rj45_id"
                                            value={this.state.status_rj45_id}
                                            onChange={this.onChangeKKS}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="betriebssystem_id">Betriebssystem:</label>
                                        <Betriebssystem
                                            name="betriebssystem_id"
                                            value={this.state.betriebssystem_id}
                                            onChange={this.onChangeKKS}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status_firewall_id">Firewallstatus:</label>
                                        <Firewall
                                            name="status_firewall_id"
                                            value={this.state.status_firewall_id}
                                            onChange={this.onChangeKKS}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status_virenschutz_id">Virenschutzstatus:</label>
                                        <Virenschutz
                                            name="status_virenschutz_id"
                                            value={this.state.status_virenschutz_id}
                                            onChange={this.onChangeKKS}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="systemhersteller_id">Systemhersteller:</label>
                                        <Systemhersteller
                                            name="systemhersteller_id"
                                            value={this.state.systemhersteller_id}
                                            onChange={this.onChangeSystemhersteller}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="modell">Modell:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="modell"
                                            value={this.state.modell}
                                            onChange={this.onChangeModell}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="firmwareversion">Patchzustand:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="firmwareversion"
                                            value={this.state.firmwareversion}
                                            onChange={this.onChangePatch}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="office_id">Office:</label>
                                        <Office
                                            name="office_id"
                                            value={this.state.office_id}
                                            onChange={this.onChangeKKS}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ibs_datum">Inbetriebsetzungsjahr:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="ibs_datum"
                                            value={this.state.ibs_datum}
                                            onChange={this.onChangeIBS}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="sonstige_sw">sonstige Software:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="sonstige_sw"
                                            value={this.state.sonstige_sw}
                                            onChange={this.onChangeSoftware}

                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backup">Backup:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="backup"
                                            value={this.state.backup}
                                            onChange={this.onChangeBackup}

                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backup_test">Backup-Test:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="backup_test"
                                            value={this.state.backup_test}
                                            onChange={this.onChangeBackuptest}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="checkliste">Checkliste:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="checkliste"
                                            value={this.state.checkliste}
                                            onChange={this.onChangeCheckliste}
                                        />
                                    </div>


                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">Speichern</button>
                                    </div>
                                </div>
                            )}

                            {this.state.message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            this.state.successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </div>
                )}
            </div>
        );
    }
}