import React, { Component } from "react";
import KontoartDataService from "../../services/kontoart.service";
import {Row, Container, Button, ButtonGroup, CloseButton} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {Link} from "react-router-dom";


//Seite für Generierung der Kontoart
export default class KontoartListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveKontoart = this.retrieveKontoart.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeName = this.ChangeName.bind(this);
        this.setActiveKontoart = this.setActiveKontoart.bind(this);

        this.state = {
            kontoarte: [],
            aktuelleKontoart: null,
            currentIndex: -1,
            kontoart_id: null,
            showPopup: false,
        };
    }

    componentDidMount() {
        this.retrieveKontoart();
    }

    handleView(kontoarte, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuelleKontoart: kontoarte
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    deleteKontoart(kontoart_id) {
        KontoartDataService.delete(kontoart_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateKontoart = () => {
        fetch(`http://localhost:8080/api/kontoart/${this.state.aktuelleKontoart.kontoart_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kontoart: this.state.aktuelleKontoart.kontoart}),
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

    ChangeName(e) {
        const kontoart = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuelleKontoart: {
                    ...prevState.aktuelleKontoart,
                    kontoart: kontoart
                }
            };
        });
    }

    retrieveKontoart() {
        KontoartDataService.getAll()
            .then(response => {
                this.setState({
                    kontoarte: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveKontoart();
        this.setState({
            aktuelleKontoart: null,
            currentIndex: -1
        });
    }

    setActiveKontoart(kontoarte, index) {
        this.setState({
            aktuelleKontoart: kontoarte,
            currentIndex: index,
        });
    }

    render() {
        const { kontoarte, aktuelleKontoart, currentIndex } = this.state;

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
                            <h3 style={h3}>Kontoart: </h3>
                        </div>
                        <Row>
                            <div className="col-md-6">
                                <ul className="list-group">
                                    {kontoarte &&
                                    kontoarte.map((kontoarte, index) => (
                                        <li
                                            className={
                                                "list-group-item " +
                                                (index === currentIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveKontoart(kontoarte, index)}
                                            key={index}
                                        >
                                            {kontoarte.kontoart}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div className="col-md-6">
                                {aktuelleKontoart ? (
                                    <div>
                                        <h4>Kontoart</h4>
                                        <div>
                                            <label>
                                                <strong>Name: </strong> {aktuelleKontoart.kontoart}
                                            </label>
                                        </div>
                                        <div>
                                            <Button style={button1}
                                                    onClick={() => this.handleView(aktuelleKontoart)}
                                            >
                                                <BsGearFill/>
                                            </Button>

                                            <Button style={button} variant="danger"
                                                    onClick={() => this.deleteKontoart(aktuelleKontoart.kontoart_id, currentIndex)}
                                            >
                                                <FaTrashAlt/>
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <br />
                                        <p>Bitte wähle eine Kontoart aus...</p>
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
                                            to={"/addKontoart"}>
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
                                        <h3>Kontoartdaten</h3>
                                    </div>
                                    <label>
                                        <strong>Name:</strong>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="kontoart"
                                        value={this.state.aktuelleKontoart.kontoart}
                                        onChange={this.ChangeName}
                                    />
                                    <Button style={button1}
                                            onClick={this.updateKontoart}
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
