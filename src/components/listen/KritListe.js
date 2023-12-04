import React, { Component } from "react";
import KritikalitaetDataService from "../../services/kritikalitaet.service";
import {Row, Container, Button, ButtonGroup, CloseButton} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {Link} from "react-router-dom";


//Seite für Generierung der Kritikalitäten
export default class KritListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveKrit = this.retrieveKrit.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeName = this.ChangeName.bind(this);
        this.setActiveKrit = this.setActiveKrit.bind(this);

        this.state = {
            kritikalitaet: [],
            aktuellesKrit: null,
            currentIndex: -1,
            kritikalitaet_id: null,
            showPopup: false,
        };
    }

    componentDidMount() {
        this.retrieveKrit();
    }

    handleView(kritikalitaet, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuellesKrit: kritikalitaet
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    deleteKrit(kritikalitaet_id) {
        KritikalitaetDataService.delete(kritikalitaet_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateKrit = () => {
        fetch(`http://localhost:8080/api/kritikalitaet/${this.state.aktuellesKrit.kritikalitaet_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kritikalitaet_name: this.state.aktuellesKrit.kritikalitaet_name}),
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
        const kritikalitaet_name = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesKrit: {
                    ...prevState.aktuellesKrit,
                    kritikalitaet_name: kritikalitaet_name
                }
            };
        });
    }

    retrieveKrit() {
        KritikalitaetDataService.getAll()
            .then(response => {
                this.setState({
                    kritikalitaet: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveKrit();
        this.setState({
            aktuellesKrit: null,
            currentIndex: -1
        });
    }

    setActiveKrit(kritikalitaet, index) {
        this.setState({
            aktuellesKrit: kritikalitaet,
            currentIndex: index,
        });
    }

    render() {
        const { kritikalitaet, aktuellesKrit, currentIndex } = this.state;

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
                            <h3 style={h3}>Kritikalität: </h3>
                        </div>
                        <Row>
                            <div className="col-md-6">
                                <ul className="list-group">
                                    {kritikalitaet &&
                                    kritikalitaet.map((kritikalitaet, index) => (
                                        <li
                                            className={
                                                "list-group-item " +
                                                (index === currentIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveKrit(kritikalitaet, index)}
                                            key={index}
                                        >
                                            {kritikalitaet.kritikalitaet_name}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div className="col-md-6">
                                {aktuellesKrit ? (
                                    <div>
                                        <h4>Kritikalität</h4>
                                        <div>
                                            <label>
                                                <strong>Name: </strong> {aktuellesKrit.kritikalitaet_name}
                                            </label>
                                        </div>
                                        <div>
                                            <Button style={button1}
                                                    onClick={() => this.handleView(aktuellesKrit)}
                                            >
                                                <BsGearFill/>
                                            </Button>

                                            <Button style={button} variant="danger"
                                                    onClick={() => this.deleteKrit(aktuellesKrit.kritikalitaet_id, currentIndex)}
                                            >
                                                <FaTrashAlt/>
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <br />
                                        <p>Bitte wähle einen Kritikalität aus...</p>
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
                                            to={"/addKrit"}>
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
                                        <h3>Kritikalitätsdaten</h3>
                                    </div>
                                    <label>
                                        <strong>Name:</strong>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="kritikalitaet_name"
                                        value={this.state.aktuellesKrit.kritikalitaet_name}
                                        onChange={this.ChangeName}
                                    />
                                    <Button style={button1}
                                            onClick={this.updateKrit}
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
