import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import { withRouter } from '../../common/with-router';
import KraftwerkDataService from "../../services/kraftwerk.service";
import Select from "react-select";
import axios from "axios";

class KraftwerkTest extends Component {
    constructor(props) {
        super(props);
        this.handleKraftwerk = this.handleKraftwerk.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeKraftwerk = this.onChangeKraftwerk.bind(this);

        this.state = {
            kw_id: null,
            kraftwerk_name: "",
            kraftwerksleiter: "",
            zoneninstanzbesitzer: "",
            systemkoordinator: "",
            loading: false,
            message: ""
        };
    }

    async getOptions() {
        const res = await axios.get('http://localhost:8080/api/kraftwerke')

        const data = res.data

        const options = data.map(d => ({
            kw_id: d.kw_id,
            kraftwerk_name: d.kraftwerk_name,
            kraftwerksleiter: d.kraftwerksleiter,
            zoneninstanzbesitzer: d.zoneninstanzbesitzer,
            systemkoordinator: d.systemkoordinator

        }))
        this.setState({ kraftwerk: options })

        console.log(options);

    }

    handleChange(e) {
        this.setState({
            kw_id: e.kw_id,
            kraftwerk_name: e.kraftwerk_name,
            kraftwerksleiter: e.kraftwerksleiter,
            zoneninstanzbesitzer: e.zoneninstanzbesitzer,
            systemkoordinator: e.systemkoordinator
        })
    }

    componentDidMount() {
        this.getOptions()
    }

    onChangeKraftwerk(e) {
        this.setState({
            kraftwerk_name: e.target.value
        });
    }

    handleKraftwerk(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            KraftwerkDataService.get(this.state.kw_id).then(
                () => {
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const text ={
            color: '#000',
            textColor: '#000',
            textDecoration: "none"
        }

        return (
            <div className="col-md-12">
                <div className="container">
                    <Form
                        onSubmit={this.handleKraftwerk}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form" onSubmit={this.handleKraftwerk}
                             ref={c => {
                                 this.form = c;
                             }}>
                            <Select
                                placeholder={"Standorte"}
                                options={this.state.kraftwerk}
                                value={this.state.kraftwerk_name}
                                styles={text}
                                onChange={this.handleChange.bind(this)}
                                disabled={this.state.loading}>{this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}</Select>
                            <p>Du hast den Standort <strong>{this.state.kraftwerk_name}</strong> ausgewählt, welcher die ID <strong>{this.state.kw_id}</strong> hat</p>

                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
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
            </div>
        );
    }

}

export default withRouter(KraftwerkTest);