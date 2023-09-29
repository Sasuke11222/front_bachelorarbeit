import React, {Component} from "react";
import {Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import KraftwerkeDataService from "../../services/kraftwerk.service";

class UpdateKraftwerksdaten extends Component {

    constructor(props) {
        super(props);
        this.onChangeKraftwerksleiter = this.onChangeKraftwerksleiter.bind(this);
        this.onChangeZoneninstanzbesitzer = this.onChangeZoneninstanzbesitzer.bind(this);
        this.onChangeSystemkoordinator = this.onChangeSystemkoordinator.bind(this);

        this.state = {
            currentStandort: undefined,
            kraftwerksleiter: "",
            zoneninstanzbesitzer: "",
            systemkoordinator: ""
        };
    }

    onChangeKraftwerksleiter(e) {
        this.setState({
            kraftwerksleiter: e.target.value
        });
    }

    onChangeZoneninstanzbesitzer(e) {
        this.setState({
            zoneninstanzbesitzer: e.target.value
        });
    }

    onChangeSystemkoordinator(e) {
        this.setState({
            systemkoordinator: e.target.value
        });
    }

    componentDidMount() {
        const kraftwerk = KraftwerkeDataService.getCurrentKraftwerk();

        if (kraftwerk) {
            this.setState({
                currentStandort: kraftwerk,
                kraftwerksleiter: kraftwerk.kraftwerksleiter,
                zoneninstanzbesitzer: kraftwerk.zoneninstanzbesitzer,
                systemkoordinator: kraftwerk.systemkoordinator
            });
        }
    }

    handleChange = (e) => {
        const {id, value} = e.target;
        this.setState({[id]: value});
    }

    handleSubmit = () => {
        const { currentStandort, kraftwerksleiter, zoneninstanzbesitzer, systemkoordinator } = this.state;

    // Call API to save changes in Spring Boot
        KraftwerkeDataService.updateKraftwerksdaten(currentStandort.kw_id,
            kraftwerksleiter,
            zoneninstanzbesitzer,
            systemkoordinator
        )
            .then(response => {
                console.log(response.data);
                // Zeigen Sie eine Erfolgsmeldung an und leiten Sie zurück zum Ausgangsformular
                alert("Änderungen erfolgreich gespeichert!");
                this.props.history.push("/ausgangsformular");
            })
            .catch(error => {
                console.log(error);
                    // Zeigen Sie eine Fehlermeldung an, wenn etwas schiefgelaufen ist
                alert("Fehler beim Speichern der Änderungen.");
                });


                    // Redirect to the previous page
                    }

                    render() {
                        const hauptbox = {
                        maxWidth: "200%",
                        marginBottom: "50px",
                        background: "#59841d",
                        color: "#FFF",
                        borderRadius: "8px",
                    };

                        const container1 = {
                        marginTop: "100px",
                        height: "800px"
                    };

                        const h3 = {
                        marginTop: "3px",
                        marginLeft: "10px"
                    };

                        const link ={
                        color: '#FFF',
                        textDecoration: "none"
                    };

                        const button2 = {
                        width:"300px",
                        background: "#0067ac",
                        marginTop: "10px",
                        marginLeft: "50%"
                    };

                        const button3 = {
                        width:"300px",
                        background: "#0067ac",
                        marginTop: "10px",
                        marginLeft: "5%"
                    };

                        const {currentStandort, kraftwerksleiter, zoneninstanzbesitzer, systemkoordinator} = this.state;

                        return (
                        <>
                        <div>
                        <Container style={container1}>
                        <Row>
                        <Col style={hauptbox}>
                    {currentStandort ? (
                        <>
                        <div>
                        <h3 style={h3}>Kraftwerksdaten {currentStandort.kraftwerk_name}</h3>
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="kraftwerksleiter">
                        <label htmlFor="kraftwerksleiter">Kraftwerksleiter:</label>
                        <input
                        type="text"
                        className="form-control"
                        name="nachname"
                        value={this.state.kraftwerksleiter}
                        onChange={this.onChangeKraftwerksleiter}
                        id="kraftwerksleiter"
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="zoneninstanzbesitzer">
                        <label htmlFor="zoneninstanzbesitzer">Zoneninstanzbesitzer:</label>
                        <input
                        type="text"
                        className="form-control"
                        id="zoneninstanzbesitzer"
                        value={this.state.zoneninstanzbesitzer}
                        onChange={this.onChangeZoneninstanzbesitzer}
                        />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="systemkoordinator">
                        <label htmlFor="systemkoordinator">Systemkoordinator:</label>
                        <input
                        type="text"
                        className="form-control"
                        id="systemkoordinator"
                        value={this.state.systemkoordinator}
                        onChange={this.onChangeSystemkoordinator}
                        />
                        </Form.Group>
                        </Form>
                        </>
                        ) : (
                        <div>Hallo</div>
                        )}
                        </Col>
                        <Container>
                        <ButtonGroup>
                        <Button style={button2} type="submit" onClick={this.handleSubmit}>
                        <Link
                        style={link}>
                        Speichern
                        </Link>
                        </Button>{' '}
                        <Button style={button3}>
                        <Link
                        style={link}
                        className="navbar-link"
                        to={"/kraftwerksdaten"}>
                        Abbruch
                        </Link>
                        </Button>{' '}
                        </ButtonGroup>
                        </Container>
                        </Row>
                        </Container>
                        </div>
                        </>
                        );
                    }
                    }

                    export default UpdateKraftwerksdaten
