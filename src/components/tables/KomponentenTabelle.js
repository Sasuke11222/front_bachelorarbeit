import React, { Component } from "react";
import {Row, Container, Button, ButtonGroup, CloseButton, Table, Tabs, Tab} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import KomponentDataService from "../../services/komponenten.service";
import KraftwerkDataService from "../../services/kraftwerk.service";
import {BsInfoCircle} from "@react-icons/all-files/bs/BsInfoCircle";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import Col from "react-bootstrap/Col";


//Seite für Generierung der Komponententabelle
export default class KomponentenTabelle extends Component {
    constructor(props) {
        super(props);
        this.retrieveKomponente = this.retrieveKomponente.bind(this);
        this.refreshTabelle = this.refreshTabelle.bind(this);
        this.setActiveKomponente = this.setActiveKomponente.bind(this);

        this.state = {
            komponente: [],
            aktuelleKomponente: null,
            currentIndex: -1,
            it_element_id: null,
            filteredKomponente: [],
            showPopup: false,
            currentStandort: undefined,
            kksFilter: "",
            systemeinheitFilter: "",
            systemFilter: "",
            betriebssystemFilter: "",
            herstellerFilter: "",
            modellFilter: "",
        };
    }

    componentDidMount() {
        const kraftwerk = KraftwerkDataService.getCurrentKraftwerk();

        if (kraftwerk) {
            this.setState({
                currentStandort: kraftwerk.kraftwerk_name,
            });
        }

        const filteredkomponent = KomponentDataService.getCurrentKomponente();
        if (kraftwerk.kw_id === 13) {
            KomponentDataService.getAll()
                .then(response => {
                    this.setState({
                        filteredKomponente: response.data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }else {
            this.setState({
                filteredKomponente: filteredkomponent,
            });
        }

        this.retrieveKomponente();
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

    retrieveKomponente() {
        KomponentDataService.getAll()
            .then(response => {
                this.setState({
                    komponente: response.data
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
            aktuelleKomponente: null,
            currentIndex: -1
        });
    }

    // Methode zum Aktualisieren des
    updateKomponente = () => {
        fetch(`http://localhost:8080/api/it_element/${this.state.aktuelleKomponente.it_element_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                herstellername: this.state.aktuelleKomponente.herstellername,
                version: this.state.aktuelleKomponente.version }),
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

    handleView(komponente, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuelleKomponente: {...this.state.filteredKomponente[index]}
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
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


    setActiveKomponente(komponente, index) {
        this.setState({
            aktuelleKomponente: {...this.state.filteredKomponente[index]},
            currentIndex: index,
        });
    }

    render() {
        const { komponente, filteredKomponente, currentIndex, currentStandort,aktuelleKomponente,
            kksFilter, systemFilter,systemeinheitFilter,betriebssystemFilter, herstellerFilter,} = this.state;

        const totalKomponente = filteredKomponente.length;

        if (totalKomponente === 0) return null;

        const filteredData = komponente.filter((dt) => dt.kks.toLowerCase().includes(kksFilter.toLowerCase())
            //&& dt.modell.toLowerCase().includes(modellFilter.toLowerCase())
            && dt.systemeinheit_id.systemeinheit_name.toLowerCase().includes(systemeinheitFilter.toLowerCase())
            && dt.betriebssystem_id.betriebssystem_name.toLowerCase().includes(betriebssystemFilter.toLowerCase())
            && dt.systemhersteller_id.herstellername.toLowerCase().includes(herstellerFilter.toLowerCase())
            && dt.system_id.system_name.toLowerCase().includes(systemFilter.toLowerCase()));

        const hauptbox = {
            height: "800px",
            maxHeight: "80%",
            marginBottom: "50px",
            background: "#59841d",
            color: "#FFF",
            borderRadius: "8px",
        }

        const container = {
            maxHeight: "75%"
        }

        const button2 = {
            textDecoration: "none",
            marginTop: "5%",
            marginLeft: "2%",
        }

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


        return (
            <div style={hauptbox}>
                <Container style={container}>
                    {currentStandort ? (
                    <>
                        {filteredKomponente ?(
                            <>
                                <Row>
                                    <div className="tableScroll">
                                        <Table striped bordered data={filteredData} >
                                            <tbody>
                                                <tr>
                                                    <th>KKS
                                                    <br />
                                                    <input
                                                        className="filter"
                                                        value={kksFilter}
                                                        onChange={this.handleKksFilterChange}
                                                    />
                                                    </th>
                                                    <th>Kurztext</th>
                                                    <th>Systemeinheit
                                                        <br/>
                                                        <input
                                                            className="filter"
                                                            value={systemeinheitFilter}
                                                            onChange={this.handleSystemeinheitFilterChange}
                                                        />
                                                    </th>
                                                    <th>System
                                                        <br />
                                                        <input
                                                            className="filter"
                                                            value={systemFilter}
                                                            onChange={this.handleSystemFilterChange}
                                                        />
                                                    </th>
                                                    <th>Betriebssystem
                                                        <br />
                                                        <input
                                                            className="filter"
                                                            value={betriebssystemFilter || ''}
                                                            onChange={this.handleBetriebssystemFilterChange}
                                                        />
                                                    </th>
                                                    <th>Hersteller
                                                        <br/>
                                                        <input
                                                            className="filter"
                                                            value={herstellerFilter}
                                                            onChange={this.handleSystemherstellerFilterChange}
                                                        />
                                                    </th>
                                                    <th>Modell
                                                    </th>
                                                    <th>Action</th>
                                                </tr>
                                                </tbody>
                                                <tbody>
                                                {filteredData.map((item, index) => (
                                                    <tr className={
                                                        (index === currentIndex ? "active" : "")} key={index}>
                                                        <td>{item.kks}</td>
                                                        <td>{item.kurztext}</td>
                                                        <td>{item.systemeinheit_id.systemeinheit_name}</td>
                                                        <td>{item.system_id.system_name}</td>
                                                        <td>{item.betriebssystem_id.betriebssystem_name}</td>
                                                        <td>{item.systemhersteller_id.herstellername}</td>
                                                        <td>{item.modell}</td>
                                                        <td>
                                                            <ButtonGroup>
                                                                <Button
                                                                    onClick={() => this.handleView(index)}
                                                                >
                                                                    <BsInfoCircle />
                                                                </Button>
                                                                <Button
                                                                    style={button2}
                                                                    variant="success"
                                                                    onClick={() => this.handleView2(index)}
                                                                >
                                                                    <BsGearFill/>
                                                                </Button>
                                                                <Button
                                                                    variant="danger"
                                                                    onClick={() => this.deleteKomponente (item.it_element_id)}
                                                                >
                                                                    <FaTrashAlt/>
                                                                </Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </Table>
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
                                                    <>{aktuelleKomponente ? (
                                                        <Table striped bordered >
                                                            <tbody>
                                                            <tr>
                                                                <th>Kraftwerk</th>
                                                                <th>Patchzustand</th>
                                                                <th>IBS</th>
                                                            </tr>
                                                            </tbody>
                                                            <tbody>
                                                            <td>{console.log("Kraftwerk: " + aktuelleKomponente.kw_id)}
                                                            </td>
                                                            <td>{}
                                                            </td>
                                                            <td>{}
                                                            </td>
                                                            </tbody>
                                                        </Table>
                                                    ) : (
                                                        <div>
                                                            <br />
                                                            <p>Bitte wähle ein System aus...</p>
                                                        </div>
                                                    )}
                                                        </>
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
                                                        <td>{}</td>
                                                        <td>{}</td>
                                                        <td>{}</td>
                                                        <td>{}</td>
                                                        <td>{}</td>
                                                        <td>{}</td>
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
                                                        <td>{}</td>
                                                        <td>{}</td>
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
                        <div>
                            <h4>
                                <strong>{totalKomponente}</strong> Komponenten
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
