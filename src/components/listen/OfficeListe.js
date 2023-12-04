import React, { Component } from "react";
import OfficeDataService from "../../services/office.service";
import {Row, Container, Button, ButtonGroup, CloseButton} from "react-bootstrap";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import {BsGearFill} from "@react-icons/all-files/bs/BsGearFill";
import {Link} from "react-router-dom";


//Seite für Generierung der Officeeinträge
export default class OfficeListe extends Component {
    constructor(props) {
        super(props);
        this.retrieveOffice = this.retrieveOffice.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.ChangeVersion = this.ChangeVersion.bind(this);
        this.setActiveOffice = this.setActiveOffice.bind(this);

        this.state = {
            office: [],
            aktuellesOffice: null,
            currentIndex: -1,
            office_id: null,
            showPopup: false,
        };
    }

    componentDidMount() {
        this.retrieveOffice();
    }

    handleView(office, index) {

        this.setState({
            currentIndex: index,
            viewMode: true,
            aktuellesOffice: office
        });
    }

    handleCancel(e) {
        this.setState({
            viewMode: false,
        });
        e.preventDefault();
    }

    deleteOffice(office_id) {
        OfficeDataService.delete(office_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des
    updateOffice = () => {
        fetch(`http://localhost:8080/api/office/${this.state.aktuellesOffice.office_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ version: this.state.aktuellesOffice.version }),
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

    ChangeVersion(e) {
        const version = e.target.value;

        this.setState(function(prevState) {
            return {
                aktuellesOffice: {
                    ...prevState.aktuellesOffice,
                    version: version
                }
            };
        });
    }


    retrieveOffice() {
        OfficeDataService.getAll()
            .then(response => {
                this.setState({
                    office: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveOffice();
        this.setState({
            aktuellesOffice: null,
            currentIndex: -1
        });
    }

    setActiveOffice(office, index) {
        this.setState({
            aktuellesOffice: office,
            currentIndex: index,
        });
    }

    render() {
        const { office, aktuellesOffice, currentIndex} = this.state;

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
                            <h3 style={h3}>Office: </h3>
                        </div>
                        <Row>
                            <div className="col-md-6">
                                <ul className="list-group">
                                    {office &&
                                    office.map((office, index) => (
                                        <li
                                            className={
                                                "list-group-item " +
                                                (index === currentIndex ? "active" : "")
                                            }
                                            onClick={() => this.setActiveOffice(office, index)}
                                            key={index}
                                        >
                                            {office.version}
                                        </li>
                                    ))}
                                </ul>

                            </div>
                            <div className="col-md-6">
                                {aktuellesOffice ? (
                                    <div>
                                        <h4>Office</h4>
                                        <div>
                                            <label>
                                                <strong>Version: </strong> {aktuellesOffice.version}
                                            </label>
                                        </div>
                                        <div>
                                            <Button style={button1}
                                                    onClick={() => this.handleView(aktuellesOffice)}
                                            >
                                                <BsGearFill/>
                                            </Button>

                                            <Button style={button} variant="danger"
                                                    onClick={() => this.deleteOffice(aktuellesOffice.office_id, currentIndex)}
                                            >
                                                <FaTrashAlt/>
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <br />
                                        <p>Bitte wähle aus...</p>
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
                                            to={"/addOffice"}>
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
                                        <h3>Officedaten</h3>
                                    </div>
                                    <label>
                                        <strong>Version:</strong>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="version"
                                        value={this.state.aktuellesOffice.version}
                                        onChange={this.ChangeVersion}
                                    />
                                    <Button style={button1}
                                            onClick={this.updateOffice}
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
