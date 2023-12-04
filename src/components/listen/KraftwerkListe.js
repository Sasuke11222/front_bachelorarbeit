import React, { Component } from "react";
import {Row, Container, Button, ButtonGroup} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import StandortDataService from "../../services/standort.service";
import {Link} from "react-router-dom";


//Seite für Generierung der Standorteverwaltung
export default class KraftwerkListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveKraftwerk = this.retrieveKraftwerk.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveKraftwerk = this.setActiveKraftwerk.bind(this);

        this.state = {
            kraftwerke: [], //erstellt Array mit allen Standorten
            aktuellesKraftwerk: null, //setzt aktuellen Standort auf Null, da man erst auswählen muss
            currentIndex: -1,
            kw_id: null,
        };
    }

    componentDidMount() {

        this.retrieveKraftwerk();
    }

    deleteKraftwerk(kw_id) {
        StandortDataService.delete(kw_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    retrieveKraftwerk() {
        StandortDataService.getAll()
            .then(response => {
                this.setState({
                    kraftwerke: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveKraftwerk();
        this.setState({
            aktuellesKraftwerk: null,
            currentIndex: -1
        });
    }

    setActiveKraftwerk(kraftwerke, index) {
        this.setState({
            aktuellesKraftwerk: kraftwerke,
            currentIndex: index,
        });
    }

    render() {
        const { kraftwerke, aktuellesKraftwerk, currentIndex } = this.state;

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

        const container = {
            maxHeight: "75%"
        }

        const button = {
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
                                <h3 style={h3}>Standorte: </h3>
                            </div>
                            <Row>
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        {kraftwerke &&
                                        kraftwerke.map((kraftwerke, index) => (
                                            <li
                                                className={
                                                    "list-group-item " +
                                                    (index === currentIndex ? "active" : "")
                                                }
                                                onClick={() => this.setActiveKraftwerk(kraftwerke, index)}
                                                key={index}
                                            >
                                                {kraftwerke.kraftwerk_name}
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                                <div className="col-md-6">
                                    {aktuellesKraftwerk ? (
                                        <div>
                                            <h4>Standort</h4>
                                            <div>
                                                <label>
                                                    <strong>Name: </strong> {aktuellesKraftwerk.kraftwerk_name}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Kraftwerksleiter: </strong> {aktuellesKraftwerk.kraftwerksleiter}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Zoneninstanzbesitzer: </strong> {aktuellesKraftwerk.zoneninstanzbesitzer}
                                                </label>
                                            </div>
                                            <div>
                                                <label>
                                                    <strong>Systemkoordinator: </strong> {aktuellesKraftwerk.systemkoordinator}
                                                </label>
                                            </div>
                                            <div>
                                                <Button style={button} variant="danger"
                                                        onClick={() => this.deleteKraftwerk(aktuellesKraftwerk.kw_id, currentIndex)}
                                                >
                                                    <FaTrashAlt/>
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <br />
                                            <p>Bitte wähle ein Standort aus...</p>
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
                                                to={"/addKraftwerk"}>
                                                Hinzufügen
                                            </Link>
                                        </Button>{' '}
                                    </ButtonGroup>
                                </div>
                            </Row>
                        </>
                </Container>
            </div>
        );
    }
}
