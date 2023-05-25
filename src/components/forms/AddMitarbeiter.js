import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import MitarbeiterDataService from "../../services/mitarbeiter.service";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import Select from "react-select";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Dieses Feld ist erforderlich!
            </div>
        );
    }
};

export default class AddMitarbeiter extends Component {
    constructor(props) {
        super(props);
        this.handleMitarbeiter = this.handleMitarbeiter.bind(this);
        this.onChangeNachname = this.onChangeNachname.bind(this);
        this.onChangeVorname = this.onChangeVorname.bind(this);
        this.onChangeAbteilung = this.onChangeAbteilung.bind(this);
        this.onChangeTelefon = this.onChangeTelefon.bind(this);
        this.onChangeMail = this.onChangeMail.bind(this);

        this.state = {
            nachname: "",
            vorname: "",
            abteilung: "",
            telefon: "",
            mail: "",
            kw_id: null,
            kraftwerk_name: "",
            successful: false,
            message: ""
        };
    }

    async getOptions(){
        const res = await axios.get('http://localhost:8080/api/kraftwerke')

        const data = res.data

        const options = data.map(d => ({
            "kw_id" : d.kw_id,
            "kraftwerk_name" : d.kraftwerk_name,

        }))
        this.setState({kraftwerk: options})

        console.log(options);

    }

    componentDidMount(){
        this.getOptions()
    }

    onChangeNachname(e) {
        this.setState({
            nachname: e.target.value
        });
    }

    onChangeVorname(e) {
        this.setState({
            vorname: e.target.value
        });
    }

    onChangeAbteilung(e) {
        this.setState({
            abteilung: e.target.value
        });
    }

    onChangeTelefon(e) {
        this.setState({
            telefon: e.target.value
        });
    }

    onChangeMail(e) {
        this.setState({
            mail: e.target.value
        });
    }

    handleChange(e){
        this.setState({kw_id:e.kw_id, kraftwerk_name:e.kraftwerk_name})
    }


    handleMitarbeiter(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            MitarbeiterDataService.create(
                this.state.nachname,
                this.state.vorname,
                this.state.abteilung,
                this.state.telefon,
                this.state.mail,
                this.state.kw_id,
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
                        <h4>Erfolgreich {this.state.vorname + " " + this.state.nachname} hinzugefügt!</h4>
                        <Button>
                            <Link style={link} to={"/mitarbeiter"}>
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
                            onSubmit={this.handleMitarbeiter}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="nachname">Name:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="nachname"
                                            value={this.state.nachname}
                                            onChange={this.onChangeNachname}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="vorname">Vorname:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="vorname"
                                            value={this.state.vorname}
                                            onChange={this.onChangeVorname}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="abteilung">Abteilung:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="abteilung"
                                            value={this.state.abteilung}
                                            onChange={this.onChangeAbteilung}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="mail">Mail:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="mail"
                                            value={this.state.mail}
                                            onChange={this.onChangeMail}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="telefon">Telefon:</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="telefon"
                                            value={this.state.telefon}
                                            onChange={this.onChangeTelefon}
                                            validations={[required]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="kw_id">Kraftwerk:</label>
                                        <Select
                                            placeholder={"Kraftwerk"}
                                            options={this.state.kraftwerk}
                                            value={this.state.kw_id}
                                            theme={(theme) => ({
                                                ...theme,
                                                borderRadius: 0,
                                                colors: {
                                                    ...theme.colors,
                                                    text: 'black',
                                                },
                                            })}
                                            onChange={this.handleChange.bind(this)} />
                                        <p>Du hast den Standort <strong>{this.state.kraftwerk_name}</strong> ausgewählt, welcher die ID <strong>{this.state.kw_id}</strong> hat</p>
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


