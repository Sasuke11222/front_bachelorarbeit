import React, { Component } from "react";
import FirewallDataService from "../../services/firewall.service";
import {Row, Container, Button, ButtonGroup, CloseButton} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {Link} from "react-router-dom";


//Seite für Generierung der Firewall-Sperrstatus
export default class FirewallListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveFirewall = this.retrieveFirewall.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeBezeichnung = this.ChangeBezeichnung.bind(this);
        this.setActiveStatus = this.setActiveStatus.bind(this);

        this.state = {
            status: [], //erstellt Array mit allen Status
            aktuellerStatus: null, //setzt aktuellen Status auf Null, da man erst auswählen muss
            currentIndex: -1,
            status_firewall_id: null,
            showPopup: false,
        };
    }

    componentDidMount() {
        this.retrieveFirewall();
    }

    handleView(status, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuellerStatus: status
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    deleteStatus(status_firewall_id) {
        FirewallDataService.delete(status_firewall_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateStatus = () => {
        fetch(`http://localhost:8080/api/status_firewall/${this.state.aktuellerStatus.status_firewall_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: this.state.aktuellerStatus.status }),
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

    ChangeBezeichnung(e) {
        const status = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellerStatus: {
                    ...prevState.aktuellerStatus,
                    status: status
                }
            };
        });
    }


    retrieveFirewall() {
        FirewallDataService.getAll()
            .then(response => {
                this.setState({
                    status: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveFirewall();
        this.setState({
            aktuellerStatus: null,
            currentIndex: -1
        });
    }

    setActiveStatus(status, index) {
        this.setState({
            aktuellerStatus: status,
            currentIndex: index,
        });
    }

    render() {
        const { status, aktuellerStatus, currentIndex} = this.state;

        const hauptbox = {
            height: "600px",
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
            textDecoration: "none",
            marginTop: "5%",
            marginLeft: "2%",
        }
        const buttongroup = {
            marginTop: "5%",
            marginLeft: "40%",
        }

        const link ={
            color: '#FFF',
            textDecoration: "none"
        }


        return (
            <div style={hauptbox}>
                <Container style={container}>
                    <>
                            <div className="col-md-8">
                                <h3 style={h3}>Firewall-Sperrstatus: </h3>
                            </div>
                            <Row>
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        {status &&
                                        status.map((status, index) => (
                                            <li
                                                className={
                                                    "list-group-item " +
                                                    (index === currentIndex ? "active" : "")
                                                }
                                                onClick={() => this.setActiveStatus(status, index)}
                                                key={index}
                                            >
                                                {status.status}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className="col-md-6">
                                    {aktuellerStatus ? (
                                        <div>
                                            <h4>Firewall-Status</h4>
                                            <div>
                                                <label>
                                                    <strong>Bezeichnung: </strong> {aktuellerStatus.status}
                                                </label>
                                            </div>
                                            <div>
                                                <Button style={button1}
                                                        onClick={() => this.handleView(aktuellerStatus)}
                                                >
                                                    <BsGearFill/>
                                                </Button>

                                                <Button style={button} variant="danger"
                                                        onClick={() => this.deleteStatus(aktuellerStatus.status_firewall_id, currentIndex)}
                                                >
                                                    <FaTrashAlt/>
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <br />
                                            <p>Bitte wähle einen Status aus...</p>
                                        </div>
                                    )}

                                </div>
                                <div>
                                    <ButtonGroup style={buttongroup}>
                                        <Button variant="danger" style={button}>
                                            <Link
                                                style={link}
                                                className="navbar-link"
                                                to={"/"}>
                                                Abbruch
                                            </Link>
                                        </Button>{' '}
                                        <Button style={button2}>
                                            <Link
                                                style={link}
                                                className="navbar-link"
                                                to={"/addFirewall"}>
                                                Hinzufügen
                                            </Link>
                                        </Button>{' '}
                                    </ButtonGroup>
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
                                            <h3>Firewall-Statusdaten</h3>
                                        </div>
                                        <label>
                                            <strong>Bezeichnung:</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="status"
                                            value={this.state.aktuellerStatus.status}
                                            onChange={this.ChangeBezeichnung}
                                        />
                                        <Button style={button1}
                                                onClick={this.updateStatus}
                                        >
                                            Speichern
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                </Container>
            </div>
        );
    }
}
