import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import KraftwerkeDataService from "../../services/kraftwerk.service";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Dieses Feld ist erforderlich!
            </div>
        );
    }
};
export default class UpdateKraftwerksdatenTest extends Component {

    constructor(props) {
        super(props);
        this.handleKraftwerksdaten = this.handleKraftwerksdaten.bind(this);
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
    componentDidMount(){

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



    handleKraftwerksdaten(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            KraftwerkeDataService.updateKraftwerksdaten(
                this.state.kraftwerksleiter,
                this.state.zoneninstanzbesitzer,
                this.state.systemkoordinator,
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        const link ={
            color: '#FFF',
            textDecoration: "none"
        }


        return (
            <div>
                {this.state.successful ? (
                    <div>
                        <h4>Erfolgreich geändert!</h4>
                        <Button>
                            <Link style={link} to={"/kraftwerksdaten"}>
                                Zurück
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="card card-container">
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="profile-img-card"
                        />

                        <Form
                            onSubmit={this.handleKraftwerksdaten()}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="kraftwerksleiter">Kraftwerksleiter:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nachname"
                                            value={this.state.kraftwerksleiter}
                                            onChange={this.onChangeKraftwerksleiter}
                                            id="kraftwerksleiter"
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="zoneninstanzbesitzer">Zoneninstanzbesitzer:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="zoneninstanzbesitzer"
                                            value={this.state.zoneninstanzbesitzer}
                                            onChange={this.handleChange}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="systemkoordinator">Systemkoordinator:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="systemkoordinator"
                                            value={this.state.systemkoordinator}
                                            onChange={this.handleChange}
                                            validations={[required]}
                                        />
                                    </div>


                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">Speichern</button>
                                    </div>
                                </div>
                            )}

                            {this.state.message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            this.state.successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </div>
                )}
            </div>
        );
    }
}