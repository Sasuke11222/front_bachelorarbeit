import React, { Component } from "react";
import VirenschutzherstellerDataService from "../../services/virenschutzhersteller.service";
import {Row, Container, Button, ButtonGroup, CloseButton} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {Link} from "react-router-dom";


//Seite für Generierung der Virenschutzhersteller
export default class VirenschutzherstellerListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveVirenschutzhersteller = this.retrieveVirenschutzhersteller.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeHerstellername = this.ChangeHerstellername.bind(this);
        this.ChangeVersion = this.ChangeVersion.bind(this);
        this.setActiveVirenschutzhersteller = this.setActiveVirenschutzhersteller.bind(this);

        this.state = {
            virenschutzhersteller: [], //erstellt Array mit allen Virenschutzhersteller
            aktuellerVirenschutzhersteller: null, //setzt aktuellen Virenschutzhersteller auf Null, da man erst auswählen muss
            currentIndex: -1,
            virenschutzhersteller_id: null,
            showPopup: false,
        };
    }

    componentDidMount() {
        this.retrieveVirenschutzhersteller();
    }

    handleView(virenschutzhersteller, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuellerVirenschutzhersteller: virenschutzhersteller
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    deleteVirenschutzhersteller(virenschutzhersteller_id) {
        VirenschutzherstellerDataService.delete(virenschutzhersteller_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateVirenschutzhersteller = () => {
        fetch(`http://localhost:8080/api/virenschutzhersteller/${this.state.aktuellerVirenschutzhersteller.virenschutzhersteller_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                herstellername: this.state.aktuellerVirenschutzhersteller.herstellername,
                version: this.state.aktuellerVirenschutzhersteller.version }),
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

    ChangeHerstellername(e) {
        const herstellername = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellerVirenschutzhersteller: {
                    ...prevState.aktuellerVirenschutzhersteller,
                    herstellername: herstellername
                }
            };
        });
    }

    ChangeVersion(e) {
        const version = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellerVirenschutzhersteller: {
                    ...prevState.aktuellerVirenschutzhersteller,
                    version: version
                }
            };
        });
    }


    retrieveVirenschutzhersteller() {
        VirenschutzherstellerDataService.getAll()
            .then(response => {
                this.setState({
                    virenschutzhersteller: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveVirenschutzhersteller();
        this.setState({
            aktuellerVirenschutzhersteller: null,
            currentIndex: -1
        });
    }

    setActiveVirenschutzhersteller(virenschutzhersteller, index) {
        this.setState({
            aktuellerVirenschutzhersteller: virenschutzhersteller,
            currentIndex: index,
        });
    }

    render() {
        const { virenschutzhersteller, aktuellerVirenschutzhersteller, currentIndex } = this.state;

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
                                <h3 style={h3}>Virenschutzhersteller: </h3>
                            </div>
                            <Row>
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        {virenschutzhersteller &&
                                        virenschutzhersteller.map((virenschutzhersteller, index) => (
                                            <li
                                                className={
                                                    "list-group-item " +
                                                    (index === currentIndex ? "active" : "")
                                                }
                                                onClick={() => this.setActiveVirenschutzhersteller(virenschutzhersteller, index)}
                                                key={index}
                                            >
                                                {virenschutzhersteller.herstellername}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className="col-md-6">
                                    {aktuellerVirenschutzhersteller ? (
                                        <div>
                                            <h4>Virenschutzhersteller</h4>
                                            <div>
                                                <label>
                                                    <strong>Herstellername: </strong> {aktuellerVirenschutzhersteller.herstellername}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Version: </strong> {aktuellerVirenschutzhersteller.version}
                                                </label>
                                            </div>
                                            <div>
                                                <Button style={button1}
                                                        onClick={() => this.handleView(aktuellerVirenschutzhersteller)}
                                                >
                                                    <BsGearFill/>
                                                </Button>

                                                <Button style={button} variant="danger"
                                                        onClick={() => this.deleteVirenschutzhersteller(aktuellerVirenschutzhersteller.virenschutzhersteller_id, currentIndex)}
                                                >
                                                    <FaTrashAlt/>
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <br />
                                            <p>Bitte wähle einen Virenschutzhersteller aus...</p>
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
                                                to={"/addVirenschutzhersteller"}>
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
                                            <h3>Virenschutzherstellerdaten</h3>
                                        </div>
                                        <label>
                                            <strong>Herstellername:</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="herstellername"
                                            value={this.state.aktuellerVirenschutzhersteller.herstellername}
                                            onChange={this.ChangeHerstellername}
                                        />
                                        <label>
                                            <strong>Version:</strong>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="version"
                                            value={this.state.aktuellerVirenschutzhersteller.version}
                                            onChange={this.ChangeVersion}
                                        />
                                        <Button style={button1}
                                                onClick={this.updateVirenschutzhersteller}
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
