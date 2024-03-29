import React, {Component} from "react";
import {Row, Container, Button} from "react-bootstrap";
import SystemherstellerDataService from "../../services/systemhersteller.service";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import KraftwerkeDataService from "../../services/kraftwerk.service";
import MitarbeiterDataService from "../../services/mitarbeiter.service";
import AuthService from "../../services/auth.service";

//Seite für Generierung der Systemherstellerübersicht
export default class Systemherstellerlist extends Component {

    constructor(props) {
        super(props);
        this.retrieveSystemhersteller = this.retrieveSystemhersteller.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveHersteller = this.setActiveHersteller.bind(this);

        this.deleteSystemhersteller = this.deleteSystemhersteller.bind(this);

        this.state = {
            systemhersteller_id: null,
            hersteller: [], //erstellt Array mit alle Hersteller
            aktuellerHersteller: null, //setzt aktuellen Hersteller auf null, da man erst auswählen muss
            currentIndex: -1,
            currentStandort: undefined,
            disabled: true,
        };
    }

    deleteSystemhersteller(systemhersteller_id) {
        SystemherstellerDataService.deleteHerstellerByID(systemhersteller_id)
            .then(response => {
                console.log(response);
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    // Methode zum Aktualisieren des Systemherstellers
    updateMitarbeiter(systemhersteller_id) {
        const { herstellername } = this.state;
        MitarbeiterDataService.update(systemhersteller_id, herstellername)
            .then(response => {
                console.log(response);
                window.location.reload();
                this.refreshList();
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        const kraftwerk = KraftwerkeDataService.getCurrentKraftwerk();

        if (kraftwerk) {
            this.setState({
                currentStandort: kraftwerk.kraftwerk_name,
            });
        }

        const user = AuthService.getCurrentUser();

        if (!user) {
            this.setState({
                currentUser: null,
                disabled: true,
            });
        } else {
            this.setState({
                currentUser: user,
                disabled: !user.roles.includes("ROLE_ADMIN") && !user.roles.includes("ROLE_MODERATOR"),
            });
        }

        this.retrieveSystemhersteller();
    }

    refreshList() {
        this.retrieveSystemhersteller();
        this.setState({
            aktuellerHersteller: null,
            currentIndex: -1
        });
    }

    retrieveSystemhersteller() {
        const hersteller = SystemherstellerDataService.getCurrentHersteller()
        if (hersteller) {
            this.setState({
                hersteller: hersteller,
            });
        }
    }

    setActiveHersteller(hersteller, index) {
        this.setState({
            aktuellerHersteller: hersteller,
            currentIndex: index
        });
    }

    render() {
        const { hersteller, aktuellerHersteller, currentIndex, currentStandort, disabled } = this.state;

        const totalHersteller = hersteller.length;

        if (totalHersteller === 0) return null;

        const h3 = {
            marginTop: "2%",
            marginBottom: "1%"
        }

        const button = {
            marginTop: "2%",
        }

        const h4 = {
            marginLeft: "1%",
            marginTop: "1%",
        }

        const container = {
            maxHeight: "75%"
        }

        return (
            <div>
                <Container style={container}>
                    {currentStandort ? (
                        <>
                            <div className="col-md-8">
                                <h3 style={h3}>Systemherstellerübersicht: {currentStandort}</h3>
                                <div className="input-group mb-3">
                                </div>
                            </div>
                            <Row>
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        {hersteller &&
                                            hersteller.map((hersteller, index) => (
                                                <li
                                                    className={
                                                        "list-group-item " +
                                                        (index === currentIndex ? "active" : "")
                                                    }
                                                    onClick={() => this.setActiveHersteller(hersteller, index)}
                                                    key={index}
                                                >
                                                    {hersteller.herstellername}
                                                </li>
                                            ))}
                                    </ul>

                                </div>
                                <div className="col-md-6">
                                    {aktuellerHersteller ? (
                                        <div>
                                            <h4>Hersteller</h4>
                                            <div>
                                                <label>
                                                    <strong>Systemhersteller:</strong>
                                                </label>{" "}
                                                {aktuellerHersteller.herstellername}
                                            </div>
                                            <Button
                                                disabled={disabled}
                                                style={button}
                                                variant="danger"
                                                onClick={() => this.deleteSystemhersteller(aktuellerHersteller.systemhersteller_id, currentIndex)}
                                            >
                                                <FaTrashAlt/>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div>
                                            <br />
                                            <p>Bitte wähle ein Hersteller aus!</p>
                                        </div>
                                    )}
                                </div>
                            </Row>
                            <h4 style={h4}>
                                <strong>{totalHersteller}</strong> Hersteller
                            </h4>
                        </>
                    ) : (
                        <div>Hallo</div>
                    )}
                </Container>
            </div>
        );
    }
}