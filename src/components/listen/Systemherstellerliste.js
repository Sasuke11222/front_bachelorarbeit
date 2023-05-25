import React, {Component} from "react";
import {Row, Container, Button} from "react-bootstrap";
import SystemherstellerDataService from "../../services/systemhersteller.service";
import {FaTrashAlt} from "@react-icons/all-files/fa/FaTrashAlt";
import KraftwerkeDataService from "../../services/kraftwerk.service";


//Seite für Generierung der Systemherstellerübersicht
export default class SystemherstellerList extends Component {

    constructor(props) {
        super(props);
        this.retrieveHersteller = this.retrieveHersteller.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveHersteller = this.setActiveHersteller.bind(this);

        this.deleteSystemhersteller = this.deleteSystemhersteller.bind(this);

        this.state = {
            systemhersteller_id: null,
            hersteller: [], //erstellt Array mit alle Hersteller
            aktuellerHersteller: null, //setzt aktuellen Hersteller auf null, da man erst auswählen muss
            currentIndex: -1,
            currentStandort: undefined,
        };
    }

    deleteSystemhersteller(systemhersteller_id) {
        SystemherstellerDataService.delete(systemhersteller_id)
            .then(response => {
                // Handle success
                console.log(response);
            })
            .catch(error => {
                // Handle error
                console.log(error);
            });
    }

    componentDidMount() {
        const krafwerk = KraftwerkeDataService.getCurrentKraftwerk();

        if (krafwerk) {
            this.setState({
                currentStandort: krafwerk.kraftwerk_name,
            });
        }

        this.retrieveHersteller();
    }


    retrieveHersteller() {
        SystemherstellerDataService.getAll()
            .then(response => {
                this.setState({
                    systemhersteller_id: response.data,
                    hersteller: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveHersteller();
        this.setState({
            systemhersteller_id: null,
            aktuellerHersteller: null,
            currentIndex: -1
        });
    }

    setActiveHersteller(hersteller,systemhersteller_id, index) {
        this.setState({
            systemhersteller_id: systemhersteller_id,
            aktuellerHersteller: hersteller,
            currentIndex: index
        });
    }

    render() {
        const { hersteller, systemhersteller_id, aktuellerHersteller, currentIndex, currentStandort } = this.state;

        const totalHersteller = hersteller.length;

        if (totalHersteller === 0) return null;

        const h3 = {
            marginTop: "3px",
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
                                                    onClick={() => this.setActiveHersteller(hersteller,systemhersteller_id, index)}
                                                    key={index}
                                                    value={systemhersteller_id}
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
                                                onClick={() => this.deleteSystemhersteller(hersteller.systemhersteller_id)}
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
                            <h4>
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