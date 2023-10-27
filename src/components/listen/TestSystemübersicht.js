import React, { useEffect, useState } from "react";
import SystemDataService from "../../services/system.service";
import {Row, Container, Button} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import KraftwerkeDataService from "../../services/kraftwerk.service";

//Seite für Generierung der Systemübersicht
const Systemuebersichtsliste = () => {
    const [systeme, setSysteme] = useState([]);
    const [aktuellesSystem, setAktuellesSystem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [showPopup, setShowPopup] = useState(false);
    const [currentStandort, setCurrentStandort] = useState(undefined);
    const [filteredSysteme, setFilteredSysteme] = useState([]);

    useEffect(() => {
        const kraftwerk = KraftwerkeDataService.selectedKraftwerk();

        if (kraftwerk) {
            setCurrentStandort(kraftwerk);
        }

        const filteredsystem = SystemDataService.getCurrentSystem();

        if (kraftwerk.kw_id ==13) {
            SystemDataService.getAll()
                .then(response => {
                    setFilteredSysteme(response.data);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            setFilteredSysteme(filteredsystem);
        }
    }, []);

    const refreshList = () => {
        setAktuellesSystem(null);
        setCurrentIndex(-1);
    };

    const setActiveSystem = (systeme, index) => {
        setAktuellesSystem(systeme);
        setCurrentIndex(index);
    };

    const handleView = (systeme, index) => {
        setCurrentIndex(index);
        setAktuellesSystem(systeme);
        setShowPopup(true);
    };

    const handleCancel = (e) => {
        setShowPopup(false);
        e.preventDefault();
    };

    const selectedStandort = localStorage.getItem("kraftwerk_name");
    const KWID = localStorage.getItem("kw_id");

    const totalSysteme = filteredSysteme.length;

    if (totalSysteme === 0) return null;

    const h3 = {
        marginTop: "3px",
    };

    const moral = {
        color: "#000",
    };

    const container = {
        maxHeight: "75%",
    };

    const button2 = {
        width:"100px",
        background: "#0067ac",
        marginTop: "5px",
    };

    return (
        <div>
            <Container style={container}>
                {KWID ? (
                    <>
                        <div className="col-md-8">
                            <h3 style={h3}>Systemübersicht: {selectedStandort}</h3>
                        </div>
                        {filteredSysteme ? (
                            console.log(filteredSysteme),
                                <>
                                    <strong>{totalSysteme}</strong> Systeme
                                    <Row>
                                        <div className="col-md-6">
                                            <ul className="list-group">
                                                {filteredSysteme.map((filteredSystem, index) => (
                                                    <li
                                                        className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                                        onClick={() => setActiveSystem(filteredSystem, index)}
                                                        key={index}
                                                    >
                                                        {filteredSystem.system_name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            {aktuellesSystem ? (
                                                <div>
                                                    <h4>System</h4>
                                                    <div>
                                                        <label>
                                                            <strong>Standort:</strong>
                                                        </label>{" "}
                                                        {aktuellesSystem.kw_id.kraftwerk_name}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <strong>Blöcke:</strong>
                                                        </label>{""}
                                                        {aktuellesSystem.ksp_a === 1 ? "Block A" : null } {aktuellesSystem.ksp_b === 1 ? "Block B" : null} {aktuellesSystem.ksp_y === 1 ? "Y0" : null}
                                                        {aktuellesSystem.box_n === 1 ? "Block N" : null} {aktuellesSystem.box_p === 1 ? "Block P" : null} {aktuellesSystem.box_q === 1 ? "Block Q" :  null} {aktuellesSystem.box_r === 1 ? "Block R" :  null} {aktuellesSystem.box_y === 1 ? "Y0" : null}
                                                        {aktuellesSystem.jae_a === 1 ? "Block A" :  null} {aktuellesSystem.jae_b === 1 ? "Block B" :  null} {aktuellesSystem.jae_c === 1 ? "Block C" :  null} {aktuellesSystem.jae_d === 1 ? "Block N" :  null} {aktuellesSystem.jae_e === 1 ? "Block E" :  null} {aktuellesSystem.jae_f === 1 ? "Block F" :  null} {aktuellesSystem.jae_y === 1 ? "Y0" :  null}
                                                        {aktuellesSystem.lip_r === 1 ? "Block R" :  null} {aktuellesSystem.lip_s === 1 ? "Block S" :  null} {aktuellesSystem.lip_y === 1 ? "Y0" :  null}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <strong>Systemname:</strong>
                                                        </label>{" "}
                                                        {aktuellesSystem.system_name}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <strong>Beschreibung:</strong>
                                                        </label>{" "}
                                                        {aktuellesSystem.beschreibung}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <strong>Block:</strong>
                                                        </label>{" "}
                                                        {aktuellesSystem.block}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <strong>Cluster gemäß IT-SIG/VGB S175:</strong>
                                                        </label>{" "}
                                                        {aktuellesSystem.systemtyp_id.systemtyp_name}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <strong>Errichter:</strong>
                                                        </label>{" "}
                                                        {aktuellesSystem.errichter}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <strong>Zone:</strong>
                                                        </label>{" "}
                                                        {aktuellesSystem.zonen_id.zone}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <strong>Kritikalität:</strong>
                                                        </label>{" "}
                                                        {aktuellesSystem.kritikalitaet_id.kritikalitaet_name}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <strong>Systemverantwortlicher:</strong>
                                                        </label>{" "}
                                                        {aktuellesSystem.mitarbeiter_id.vorname + " " + aktuellesSystem.mitarbeiter_id.nachname === null ? "keiner" : aktuellesSystem.mitarbeiter_id.vorname + " " + aktuellesSystem.mitarbeiter_id.nachname}
                                                    </div>
                                                    <div>
                                                        <strong htmlFor="bürozugang">Bürozugang: </strong>
                                                        {aktuellesSystem.buerozugang === 1 ? "ja" : "nein"}
                                                    </div>
                                                    <div>
                                                        <strong htmlFor="fernzugang">Fernzugang: </strong>
                                                        {aktuellesSystem.fernzugang === 1 ? "ja" : "nein"}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <strong>Zugangsart:</strong>
                                                        </label>{" "}
                                                        {aktuellesSystem.zugangsart}
                                                    </div>
                                                    <div>
                                                        <strong htmlFor="pdn">eingebunden in PDN: </strong>
                                                        {aktuellesSystem.pdn === 1 ? "ja" : "nein"}
                                                    </div>
                                                    <div>
                                                        <label>
                                                            <strong>(geplante) einbindung ins PDN:</strong>
                                                        </label>{" "}
                                                        {aktuellesSystem.pdndate}
                                                    </div>
                                                    <div>
                                                        <Button
                                                            style={button2}
                                                            onClick={() => this.handleView(aktuellesSystem)}
                                                        >
                                                            ISMS
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <br />
                                                    <p>Bitte wähle ein System aus!</p>
                                                </div>
                                            )}
                                        </div>
                                    </Row>
                                </>
                        ) : (
                            <div>
                                <h1>Test</h1>
                            </div>
                        )}
                    </>
                ) : (
                    <div>Hallo</div>
                )}

                {showPopup && (
                    <div className={"modal " + (showPopup ? "displayBlock" : "displayNone")}>
                        <div className="modal-content" style={moral}>
                            <Row>
                                <Col md={16} className="mb-2">
                                    <div>
                                        <label>
                                            <strong>ISMS Relevant:</strong>
                                        </label>{" "}

                                        {aktuellesSystem.isms_Relevant === null ? "nein" : aktuellesSystem.isms_Relevant}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>ISMS-Auswirkung:</strong>
                                        </label>{" "}

                                        {aktuellesSystem.isms_Auswirkung}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>ISMS-Reduzierung:</strong>
                                        </label>{" "}
                                        {aktuellesSystem.isms_Reduzierung} %
                                    </div>
                                </Col>
                            </Row>
                            <Button onClick={(e) => handleCancel(e)}>Schließen</Button>
                        </div>
                    </div>
                )}
                <h4>
                    <strong>{totalSysteme}</strong> Systeme
                </h4>
            </Container>
        </div>
    );
};

export default Systemuebersichtsliste;