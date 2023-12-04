import React, { Component } from "react";
import ZoneDataService from "../../services/zone.service";
import {Row, Container, Button, ButtonGroup, CloseButton} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {Link} from "react-router-dom";


//Seite für Generierung der Officeeinträge
export default class ZoneListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveZone = this.retrieveZone.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeBezeichnung = this.ChangeBezeichnung.bind(this);
        this.setActiveZone = this.setActiveZone.bind(this);

        this.state = {
            zone: [],
            aktuelleZone: null,
            currentIndex: -1,
            zonen_id: null,
            showPopup: false,
        };
    }

    componentDidMount() {
        this.retrieveZone();
    }

    handleView(zone, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuelleZone: zone
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    deleteZone(zonen_id) {
        ZoneDataService.delete(zonen_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateZone = () => {
        fetch(`http://localhost:8080/api/zone/${this.state.aktuelleZone.zonen_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ zone: this.state.aktuelleZone.zone }),
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
        const zone = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuelleZone: {
                    ...prevState.aktuelleZone,
                    zone: zone
                }
            };
        });
    }


    retrieveZone() {
        ZoneDataService.getAll()
            .then(response => {
                this.setState({
                    zone: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveZone();
        this.setState({
            aktuelleZone: null,
            currentIndex: -1
        });
    }

    setActiveZone(zone, index) {
        this.setState({
            aktuelleZone: zone,
            currentIndex: index,
        });
    }

    render() {
        const { zone, aktuelleZone, currentIndex} = this.state;

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
                            <h3 style={h3}>Zone: </h3>
                        </div>
                        <Row>
                            <div className="col-md-6">
                                <ul className="list-group">
                                    {zone &&
                                    zone.map((zone, index) => (
                                        <li
                                            className={
                                                "list-group-item " +
                                                (index === currentIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveZone(zone, index)}
                                            key={index}
                                        >
                                            {zone.zone}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div className="col-md-6">
                                {aktuelleZone ? (
                                    <div>
                                        <h4>Zone</h4>
                                        <div>
                                            <label>
                                                <strong>Zone: </strong> {aktuelleZone.zone}
                                            </label>
                                        </div>
                                        <div>
                                            <Button style={button1}
                                                    onClick={() => this.handleView(aktuelleZone)}
                                            >
                                                <BsGearFill/>
                                            </Button>

                                            <Button variant="danger" style={button}
                                                    onClick={() => this.deleteZone(aktuelleZone.zonen_id, currentIndex)}
                                            >
                                                <FaTrashAlt/>
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <br />
                                        <p>Bitte wähle eine Zone aus...</p>
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
                                            to={"/addZone"}>
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
                                        <h3>Zonendaten</h3>
                                    </div>
                                    <label>
                                        <strong>Zone:</strong>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="zone"
                                        value={this.state.aktuelleZone.zone}
                                        onChange={this.ChangeBezeichnung}
                                    />
                                    <Button style={button1}
                                            onClick={this.updateZone}
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
