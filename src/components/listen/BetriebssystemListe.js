import React, { Component } from "react";
import BetriebssystemDataService from "../../services/betriebssystem.service";
import {Row, Container, Button, ButtonGroup, CloseButton} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {Link} from "react-router-dom";


//Seite für Generierung der Betriebssysteme
export default class BetriebssystemListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveBetriebssystem = this.retrieveBetriebssystem.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeName = this.ChangeName.bind(this);
        this.setActiveBetriebssystem = this.setActiveBetriebssystem.bind(this);

        this.state = {
            betriebssystem: [],
            aktuellesBetriebssystem: null,
            currentIndex: -1,
            betriebssystem_id: null,
            showPopup: false,
        };
    }

    componentDidMount() {
        this.retrieveBetriebssystem();
    }

    handleView(betriebssystem, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuellesBetriebssystem: betriebssystem
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    deleteBetriebssystem(betriebssystem_id) {
        BetriebssystemDataService.delete(betriebssystem_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateBetriebssystem = () => {
        fetch(`http://localhost:8080/api/betriebssystem/${this.state.aktuellesBetriebssystem.betriebssystem_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                betriebssystem_name: this.state.aktuellesBetriebssystem.betriebssystem_name}),
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
        const betriebssystem_name = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesBetriebssystem: {
                    ...prevState.aktuellesBetriebssystem,
                    betriebssystem_name: betriebssystem_name
                }
            };
        });
    }

    retrieveBetriebssystem() {
        BetriebssystemDataService.getAll()
            .then(response => {
                this.setState({
                    betriebssystem: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveBetriebssystem();
        this.setState({
            aktuellesBetriebssystem: null,
            currentIndex: -1
        });
    }

    setActiveBetriebssystem(betriebssystem, index) {
        this.setState({
            aktuellesBetriebssystem: betriebssystem,
            currentIndex: index,
        });
    }

    render() {
        const { betriebssystem, aktuellesBetriebssystem, currentIndex } = this.state;

        const hauptbox = {
            height: "800px",
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
                            <h3 style={h3}>Betriebssysteme: </h3>
                        </div>
                        <Row>
                            <div className="col-md-6">
                                <ul className="list-group">
                                    {betriebssystem &&
                                    betriebssystem.map((betriebssystem, index) => (
                                        <li
                                            className={
                                                "list-group-item " +
                                                (index === currentIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveBetriebssystem(betriebssystem, index)}
                                            key={index}
                                        >
                                            {betriebssystem.betriebssystem_name}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div className="col-md-6">
                                {aktuellesBetriebssystem ? (
                                    <div>
                                        <h4>Betriebssystem</h4>
                                        <div>
                                            <label>
                                                <strong>Name: </strong> {aktuellesBetriebssystem.betriebssystem_name}
                                            </label>
                                        </div>
                                        <div>
                                            <Button style={button1}
                                                    onClick={() => this.handleView(aktuellesBetriebssystem)}
                                            >
                                                <BsGearFill/>
                                            </Button>

                                            <Button style={button} variant="danger"
                                                    onClick={() => this.deleteBetriebssystem(aktuellesBetriebssystem.betriebssystem_id, currentIndex)}
                                            >
                                                <FaTrashAlt/>
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <br />
                                        <p>Bitte wähle ein Betriebssystem aus...</p>
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
                                            to={"/addBetriebssystem"}>
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
                                        <h3>Betriebssystemdaten</h3>
                                    </div>
                                    <label>
                                        <strong>Name:</strong>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="betriebssystem_name"
                                        value={this.state.aktuellesBetriebssystem.betriebssystem_name}
                                        onChange={this.ChangeName}
                                    />
                                    <Button style={button1}
                                            onClick={this.updateBetriebssystem}
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
