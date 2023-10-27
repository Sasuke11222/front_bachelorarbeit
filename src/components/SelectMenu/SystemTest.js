import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import { withRouter } from '../../common/with-router';
import KraftwerkDataService from "../../services/kraftwerk.service";
import SystemDataService from "../../services/system.service"
import Select from "react-select";
import axios from "axios";

class SystemTest extends Component {
    constructor(props) {
        super(props);
        this.handleSystem = this.handleSystem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChangeSystem = this.onChangeSystem.bind(this);

        this.state = {
            system_id: null,
            system_name: "",
            loading: false,
            message: ""
        };
    }

    async getOptions() {
        const res = await axios.get('http://localhost:8080/api/systeme')

        const data = res.data

        const options = data.map(d => ({
            system_id: d.system_id,
            system_name: d.system_name,

        }))
        this.setState({ system: options })

        console.log(options);

    }

    handleChange(e) {
        this.setState({
            system_id: e.system_id,
            system_name: e.system_name,
        })
    }

    componentDidMount() {
        this.getOptions()
    }

    onChangeSystem(e) {
        this.setState({
            system_name: e.target.value
        });
    }

    handleSystem(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            SystemDataService.get(this.state.system_id).then(
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
                        onSubmit={this.handleSystem}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form" onSubmit={this.handleSystem}
                             ref={c => {
                                 this.form = c;
                             }}>
                            <Select
                                placeholder={"System"}
                                options={this.state.system}
                                value={this.state.system_name}
                                styles={text}
                                onChange={this.handleChange.bind(this)}
                                disabled={this.state.loading}>{this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}</Select>
                            <p>Du hast das System <strong>{this.state.system_name}</strong> ausgewählt, welches die ID <strong>{this.state.system_id}</strong> hat</p>

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

export default withRouter(SystemTest);