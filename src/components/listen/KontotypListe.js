import React, { Component } from "react";
import KontotypDataService from "../../services/kontotyp.service";
import {Row, Container, Button, ButtonGroup, CloseButton} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {Link} from "react-router-dom";


//Seite für Generierung der Kontotyp
export default class KontotypListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveKontotyp = this.retrieveKontotyp.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeName = this.ChangeName.bind(this);
        this.setActiveKontotyp = this.setActiveKontotyp.bind(this);

        this.state = {
            kontotype: [],
            aktuellesKontotyp: null,
            currentIndex: -1,
            kontotyp_id: null,
            showPopup: false,
        };
    }

    componentDidMount() {
        this.retrieveKontotyp();
    }

    handleView(kontotype, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuellesKontotyp: kontotype
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    deleteKontotyp(kontotyp_id) {
        KontotypDataService.delete(kontotyp_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateKontotyp = () => {
        fetch(`http://localhost:8080/api/kontotyp/${this.state.aktuellesKontotyp.kontotyp_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kontotyp: this.state.aktuellesKontotyp.kontotyp}),
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
        const kontotyp = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesKontotyp: {
                    ...prevState.aktuellesKontotyp,
                    kontotyp: kontotyp
                }
            };
        });
    }

    retrieveKontotyp() {
        KontotypDataService.getAll()
            .then(response => {
                this.setState({
                    kontotype: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveKontotyp();
        this.setState({
            aktuellesKontotyp: null,
            currentIndex: -1
        });
    }

    setActiveKontotyp(kontotype, index) {
        this.setState({
            aktuellesKontotyp: kontotype,
            currentIndex: index,
        });
    }

    render() {
        const { kontotype, aktuellesKontotyp, currentIndex } = this.state;

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
                            <h3 style={h3}>Systemtyp: </h3>
                        </div>
                        <Row>
                            <div className="col-md-6">
                                <ul className="list-group">
                                    {kontotype &&
                                    kontotype.map((kontotype, index) => (
                                        <li
                                            className={
                                                "list-group-item " +
                                                (index === currentIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveKontotyp(kontotype, index)}
                                            key={index}
                                        >
                                            {kontotype.kontotyp}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div className="col-md-6">
                                {aktuellesKontotyp ? (
                                    <div>
                                        <h4>Systemtyp</h4>
                                        <div>
                                            <label>
                                                <strong>Name: </strong> {aktuellesKontotyp.kontotyp}
                                            </label>
                                        </div>
                                        <div>
                                            <Button style={button1}
                                                    onClick={() => this.handleView(aktuellesKontotyp)}
                                            >
                                                <BsGearFill/>
                                            </Button>

                                            <Button style={button} variant="danger"
                                                    onClick={() => this.deleteKontotyp(aktuellesKontotyp.kontotyp_id, currentIndex)}
                                            >
                                                <FaTrashAlt/>
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <br />
                                        <p>Bitte wähle ein Systemtyp aus...</p>
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
                                            to={"/addSystemtyp"}>
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
                                        <h3>Systemtypdaten</h3>
                                    </div>
                                    <label>
                                        <strong>Name:</strong>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="kontotyp"
                                        value={this.state.aktuellesKontotyp.kontotyp}
                                        onChange={this.ChangeName}
                                    />
                                    <Button style={button1}
                                            onClick={this.updateKontotyp}
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
