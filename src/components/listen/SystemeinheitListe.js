import React, { Component } from "react";
import SystemeinheitDataService from "../../services/systemeinheit.service";
import {Row, Container, Button, ButtonGroup, CloseButton} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {Link} from "react-router-dom";


//Seite für Generierung der Systemeinheite
export default class SystemeinheitListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveSystemeinheit = this.retrieveSystemeinheit.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeSystemeinheit = this.ChangeSystemeinheit.bind(this);
        this.setActiveSystemeinheit = this.setActiveSystemeinheit.bind(this);

        this.state = {
            systemeinheiten: [], //erstellt Array mit allen Systemeinheiten
            aktuelleSystemeinheit: null, //setzt aktuellen Systemeinheit auf Null, da man erst auswählen muss
            currentIndex: -1,
            systemeinheit_id: null,
            showPopup: false,
        };
    }

    componentDidMount() {
        this.retrieveSystemeinheit();
    }

    handleView(systemeinheiten, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuelleSystemeinheit: systemeinheiten
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    deleteSystemeinheit(systemeinheit_id) {
        SystemeinheitDataService.delete(systemeinheit_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateSystemeinheit = () => {
        fetch(`http://localhost:8080/api/systemeinheit/${this.state.aktuelleSystemeinheit.systemeinheit_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ systemeinheit_name: this.state.aktuelleSystemeinheit.systemeinheit_name }),
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

    ChangeSystemeinheit(e) {
        const systemeinheit_name = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuelleSystemeinheit: {
                    ...prevState.aktuelleSystemeinheit,
                    systemeinheit_name: systemeinheit_name
                }
            };
        });
    }


    retrieveSystemeinheit() {
        SystemeinheitDataService.getAll()
            .then(response => {
                this.setState({
                    systemeinheiten: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveSystemeinheit();
        this.setState({
            aktuelleSystemeinheit: null,
            currentIndex: -1
        });
    }

    setActiveSystemeinheit(systemeinheiten, index) {
        this.setState({
            aktuelleSystemeinheit: systemeinheiten,
            currentIndex: index,
        });
    }

    render() {
        const { systemeinheiten, aktuelleSystemeinheit, currentIndex } = this.state;

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
                                <h3 style={h3}>Systemeinheiten: </h3>
                            </div>
                            <Row>
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        {systemeinheiten &&
                                        systemeinheiten.map((systemeinheiten, index) => (
                                            <li
                                                className={
                                                    "list-group-item " +
                                                    (index === currentIndex ? "active" : "")
                                                }
                                                onClick={() => this.setActiveSystemeinheit(systemeinheiten, index)}
                                                key={index}
                                            >
                                                {systemeinheiten.systemeinheit_name}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className="col-md-6">
                                    {aktuelleSystemeinheit ? (
                                        <div>
                                            <h4>Systemeinheit</h4>
                                            <div>
                                                <label>
                                                    <strong>Systemeinheitname: </strong> {aktuelleSystemeinheit.systemeinheit_name}
                                                </label>
                                            </div>
                                            <div>
                                                <Button style={button1}
                                                        onClick={() => this.handleView(aktuelleSystemeinheit)}
                                                >
                                                    <BsGearFill/>
                                                </Button>

                                                <Button style={button} variant="danger"
                                                        onClick={() => this.deleteSystemeinheit(aktuelleSystemeinheit.systemeinheit_id, currentIndex)}
                                                >
                                                    <FaTrashAlt/>
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <br />
                                            <p>Bitte wähle einen Systemeinheit aus...</p>
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
                                                to={"/addSystemeinheit"}>
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
                                            <h3>Systemeinheitdaten</h3>
                                        </div>
                                        <label>
                                            <strong>Systemeinheit:</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="systemeinheit_name"
                                            value={this.state.aktuelleSystemeinheit.systemeinheit_name}
                                            onChange={this.ChangeSystemeinheit}
                                        />
                                        <Button style={button1}
                                                onClick={this.updateSystemeinheit}
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
