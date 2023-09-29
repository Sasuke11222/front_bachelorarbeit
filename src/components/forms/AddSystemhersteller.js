import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import SystemherstellerDataService from "../../services/systemhersteller.service";
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

export default class AddSystemhersteller extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeSystemhersteller = this.onChangeSystemhersteller.bind(this);

        this.state = {
            herstellername: "",
            successful: false,
            message: ""
        };
    }

    onChangeSystemhersteller(e) {
        this.setState({
            herstellername: e.target.value
        });
    }


    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            SystemherstellerDataService.create(
                this.state.herstellername,
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
            <div className="col-md-12">
                {this.state.successful ? (
                    <div>
                        <h4>Erfolgreich {this.state.herstellername} hinzugefügt!</h4>
                        <Button>
                            <Link to={"/systemhersteller"}  onClick={this.forceUpdate} style={link}>
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
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="herstellername">Systemhersteller:</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="herstellername"
                                        value={this.state.herstellername}
                                        onChange={this.onChangeSystemhersteller}
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

