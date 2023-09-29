import React, {Component} from "react";
import "../../styles.css";
import {BsInfoCircle} from "@react-icons/all-files/bs/BsInfoCircle";
import KomponentDataService from "../../services/komponenten.service";
import {Button, FloatingLabel, Form, Tab, Table, Tabs} from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import KraftwerkeDataService from "../../services/kraftwerk.service";
import SystemherstellerDataService from "../../services/systemhersteller.service";
export default class ITElementMitFilterUndDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aktuellesIT_Element: {
                it_element_id: null,
                kks: "",
                kurztext:"",
                systemeinheit_id: null,
                system_id: null,
                betriebssystem_id: null,
                systemhersteller_id: null,
                modell: "",
                firmwareversion:"",
                backup: "",
                backup_test: "",
                ibs_datum: "",
                checkliste: ""
            },
            currentIndex: -1,
            editMode: true,
            kksFilter: "",
            systemeinheitFilter: "",
            systemFilter: "",
            betriebssystemFilter: "",
            herstellerFilter: "",
            modellFilter: "",
            totalIT_Elemente: 0,
            filteredKomopnenten: [], //erstellt Array für gefilterte Komponenten nach kw_id
            currentStandort: undefined,
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleView2 = this.handleView2.bind(this);

        this.updateKomponenten = this.updateKomponenten.bind(this);
        this.deleteKomponente = this.deleteKomponente.bind(this);

        this.onChangeKKS = this.onChangeKKS.bind(this);
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
        const firmware = e.target.value;

        this.setState(prevState => ({
            aktuellesIT_Element: {
                ...prevState.aktuellesIT_Element,
                firmware: firmware
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
                firmware: backup
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

    updateKomponenten() {
        KomponentDataService.update()
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "Komponente" + response.data.kks + " gespeichert!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteKomponente(it_element_id) {
        KomponentDataService.deleteKomponenteByID(it_element_id)
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

    handleView(index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuellesIT_Element: { ...this.state.filteredKomopnenten[index] }
        });
    }

    handleView2(index) {

        this.setState({
            currentIndex: index,
            viewMode2: true,
            aktuellesIT_Element: { ...this.state.filteredKomopnenten[index] }
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
        const kraftwerk = KraftwerkeDataService.getCurrentKraftwerk();

        if (kraftwerk) {
            this.setState({
                currentStandort: kraftwerk.kraftwerk_name,
            });
        }

        const filteredkomponenten = KomponentDataService.getCurrentKomponente();

        if (kraftwerk.kw_id == 7) {
            KomponentDataService.getAll()
                .then(response => {
                    this.setState({
                        filteredKomopnenten: response.data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }else {
            this.setState({
            filteredKomopnenten: filteredkomponenten,
        });}

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

    handleElementChange = (e) => {
        const { value } = e.target;
        this.setState({ totalIT_Elemente: value });
    }

    render() {
        const { kksFilter, systemFilter,systemeinheitFilter,betriebssystemFilter, filteredKomopnenten } = this.state;

        const filteredData = filteredKomopnenten.filter((dt) => dt.kks.toLowerCase().includes(kksFilter.toLowerCase())
            && dt.systemeinheit_id.systemeinheit_name.toLowerCase().includes(systemeinheitFilter.toLowerCase())
            && dt.betriebssystem_id.betriebssystem_name.toLowerCase().includes(betriebssystemFilter.toLowerCase())
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

        const view ={
            color: "#000"
        }

        const tab ={
            textDecoration: "none"
        }

        const button2 ={
            marginLeft: "5px"
        }

        const button ={
            marginLeft: "11.3%"
        }

        const floatinlabel = {
            color: "#000",
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
                    <Table striped bordered data={filteredData} >
                        <tbody>
                        <tr>
                            <th>KKS
                                <br />
                                <input
                                    value={kksFilter}
                                    onChange={this.handleKksFilterChange}
                                />
                            </th>
                            <th>Kurztext</th>
                            <th>Systemeinheit
                                <br/>
                                <input
                                    value={systemeinheitFilter}
                                    onChange={this.handleSystemeinheitFilterChange}
                                />
                            </th>
                            <th>System
                                <br />
                                <input
                                    value={systemFilter}
                                    onChange={this.handleSystemFilterChange}
                                />
                            </th>
                            <th>Betriebssystem
                                <br />
                                <input
                                    value={betriebssystemFilter || ''}
                                    onChange={this.handleBetriebssystemFilterChange}
                                />
                            </th>
                            <th>Hersteller
                                <br />
                            </th>
                            <th>Modell
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
                                <td>{item.systemhersteller_id}</td>
                                <td>{item.modell}</td>
                                <td>
                                    <Button
                                        onClick={() => this.handleView(index)}
                                    >
                                        <BsInfoCircle />
                                    </Button>
                                    <Button
                                        style={button2}
                                        onClick={() => this.handleView2(index)}
                                    >
                                        <BsGearFill/>
                                    </Button>
                                    <Button
                                        style={button2}
                                        onClick={this.deleteKomponente}
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
                                <button onClick={(e) => this.handleCancel(e)}>Schließen</button>
                            </div>
                        </div>
                    )}
                    {this.state.viewMode2 && (
                        <div
                            className={
                                "modal " + (this.state.viewMode2 ? "displayBlock" : "displayNone")
                            }
                            style={view}
                        >
                            <div className="modal-content">
                                <Row>
                                    <Col md={16} className="mb-2">
                                        <Form>
                                            <Row style={row}>
                                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                                    <label htmlFor="title">KKS:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="kks"
                                                        value={this.state.aktuellesIT_Element.kks}
                                                        onChange={this.onChangeKKS}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                                    <label htmlFor="title">Kurztext:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="kurztext"
                                                        value={this.state.aktuellesIT_Element.kurztext}
                                                        onChange={this.onChangeKurztext}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                                    <Form.Label>Systemeinheit: {this.state.aktuellesIT_Element.systemeinheit_id.systemeinheit_name}</Form.Label>
                                                    <FloatingLabel controlId="floatingSelect" label="Systemeinheit" style={floatinlabel}>
                                                        <Form.Select>
                                                            <option value="1">System 1</option>
                                                            <option value="2">System 2</option>
                                                            <option value="3">System 3</option>
                                                            <option value="4">System 4</option>
                                                            <option value="5">System 5</option>
                                                        </Form.Select>
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                                    <Form.Label>System: {this.state.aktuellesIT_Element.system_id.system_name}</Form.Label>
                                                    <FloatingLabel controlId="floatingSelect" label="System" style={floatinlabel}>
                                                        <Form.Select>
                                                            <option value="1">System 1</option>
                                                            <option value="2">System 2</option>
                                                            <option value="3">System 3</option>
                                                            <option value="4">System 4</option>
                                                            <option value="5">System 5</option>
                                                        </Form.Select>
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                                    <Form.Label>Betriebssystem: {this.state.aktuellesIT_Element.betriebssystem_id.betriebssystem_name}</Form.Label>
                                                    <FloatingLabel controlId="floatingSelect" label="Betriebssystem" style={floatinlabel}>
                                                        <Form.Select>
                                                            <option value="1">Betriebssystem 1</option>
                                                            <option value="2">Betriebssystem 2</option>
                                                            <option value="3">Betriebssystem 3</option>
                                                            <option value="4">Betriebssystem 4</option>
                                                            <option value="5">Betriebssystem 5</option>
                                                        </Form.Select>
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupEmail">
                                                    <Form.Label>Systemhersteller: {this.state.aktuellesIT_Element.systemhersteller_id}</Form.Label>
                                                    <FloatingLabel controlId="floatingSelect" label="Hersteller" style={floatinlabel}>
                                                        <Form.Select>
                                                            <option value="1">Hersteller 1</option>
                                                            <option value="2">Hersteller 2</option>
                                                            <option value="3">Hersteller 3</option>
                                                            <option value="4">Hersteller 4</option>
                                                            <option value="5">Hersteller 5</option>
                                                        </Form.Select>
                                                    </FloatingLabel>
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                                    <label htmlFor="title">Modell:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="modell"
                                                        value={this.state.aktuellesIT_Element.modell}
                                                        onChange={this.onChangeModell}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                                    <label htmlFor="title">Patchzustand:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="patchzustand"
                                                        value={this.state.aktuellesIT_Element.firmware}
                                                        onChange={this.onChangePatch}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                                    <label htmlFor="title">Backup:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="backup"
                                                        value={this.state.aktuellesIT_Element.backup}
                                                        onChange={this.onChangeBackup}
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Row style={row2}>
                                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                                    <label htmlFor="title">Backuptest:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="backup_test"
                                                        value={this.state.aktuellesIT_Element.backup_test}
                                                        onChange={this.onChangeBackuptest}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                                    <label htmlFor="title">Inbetriebsetzungsjahr:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="ibs"
                                                        value={this.state.aktuellesIT_Element.ibs_datum}
                                                        onChange={this.onChangeIBS}
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formGroupPassword">
                                                    <label htmlFor="title">Checkliste:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="checkliste"
                                                        value={this.state.aktuellesIT_Element.checkliste}
                                                        onChange={this.onChangeKurztext}
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <Button
                                                type="submit"
                                                style={button}
                                                onClick={this.updateKomponenten}
                                            >
                                                Speichern
                                            </Button>{' '}
                                            <p>{this.state.message}</p>
                                        </Form>
                                    </Col>
                                </Row>
                                <Button onClick={(e) => this.handleCancel(e)}>Abbruch</Button>
                            </div>
                        </div>
                    )}
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
