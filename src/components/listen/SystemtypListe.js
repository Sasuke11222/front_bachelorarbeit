import React, { Component } from "react";
import SystemtypDataService from "../../services/systemtyp.service";
import {Row, Container, Button, ButtonGroup, CloseButton} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {Link} from "react-router-dom";


//Seite für Generierung der Sytemtypen
export default class SystemtypListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveSystemtyp = this.retrieveSystemtyp.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeSystemtypname = this.ChangeSystemtypname.bind(this);
        this.setActiveSystemtyp = this.setActiveSystemtyp.bind(this);

        this.state = {
            systemtyp: [],
            aktuellerSystemtyp: null,
            currentIndex: -1,
            systemtyp_id: null,
            showPopup: false,
        };
    }

    componentDidMount() {
        this.retrieveSystemtyp();
    }

    handleView(systemtyp, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuellerSystemtyp: systemtyp
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    deleteSystemtyp(systemtyp_id) {
        SystemtypDataService.delete(systemtyp_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateSystemtyp = () => {
        fetch(`http://localhost:8080/api/systemtyp/${this.state.aktuellerSystemtyp.systemtyp_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                systemtyp_name: this.state.aktuellerSystemtyp.systemtyp_name,
            }),
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

    ChangeSystemtypname(e) {
        const systemtyp_name = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellerSystemtyp: {
                    ...prevState.aktuellerSystemtyp,
                    systemtyp_name: systemtyp_name
                }
            };
        });
    }


    retrieveSystemtyp() {
        SystemtypDataService.getAll()
            .then(response => {
                this.setState({
                    systemtyp: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveSystemtyp();
        this.setState({
            aktuellerSystemtyp: null,
            currentIndex: -1
        });
    }

    setActiveSystemtyp(systemtyp, index) {
        this.setState({
            aktuellerSystemtyp: systemtyp,
            currentIndex: index,
        });
    }

    render() {
        const { systemtyp, aktuellerSystemtyp, currentIndex } = this.state;

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
                                <h3 style={h3}>Systemtypen </h3>
                            </div>
                            <Row>
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        {systemtyp &&
                                        systemtyp.map((systemtyp, index) => (
                                            <li
                                                className={
                                                    "list-group-item " +
                                                    (index === currentIndex ? "active" : "")
                                                }
                                                onClick={() => this.setActiveSystemtyp(systemtyp, index)}
                                                key={index}
                                            >
                                                {systemtyp.systemtyp_name}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className="col-md-6">
                                    {aktuellerSystemtyp ? (
                                        <div>
                                            <h4>Systemtyp</h4>
                                            <div>
                                                <label>
                                                    <strong>Name: </strong> {aktuellerSystemtyp.systemtyp_name}
                                                </label>
                                            </div>
                                            <div>
                                                <Button style={button1}
                                                        onClick={() => this.handleView(aktuellerSystemtyp)}
                                                >
                                                    <BsGearFill/>
                                                </Button>

                                                <Button style={button} variant="danger"
                                                        onClick={() => this.deleteSystemtyp(aktuellerSystemtyp.systemtyp_id, currentIndex)}
                                                >
                                                    <FaTrashAlt/>
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <br />
                                            <p>Bitte wähle einen Systemtyp aus...</p>
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
                                            id="systemtyp_name"
                                            value={this.state.aktuellerSystemtyp.systemtyp_name}
                                            onChange={this.ChangeSystemtypname}
                                        />
                                        <Button style={button1}
                                                onClick={this.updateSystemtyp}
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
