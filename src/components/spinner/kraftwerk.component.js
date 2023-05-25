import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import KratwerkDataService from "../../services/kraftwerk.service";
import CheckButton from "react-validation/build/button";

export default class KraftwerkComponent extends Component {

    constructor(props){
        super(props)
        this.handleKraftwerk = this.handleKraftwerk.bind(this);
        this.onChangeKraftwerk = this.onChangeKraftwerk.bind(this);

        this.state = {
            kraftwerk : [],
            kw_id: "",
            kraftwerk_name: "",
            loading: false,
            message: ""
        }
    }

    onChangeKraftwerk(e) {
        this.setState({
            kraftwerk_name: e.target.value
        });
    }

    async getOptions(){
        const res = await axios.get('http://localhost:8080/api/kraftwerke')

        const data = res.data

        const options = data.map(d => ({
            "kw_id" : d.kw_id,
            "kraftwerk_name" : d.kraftwerk_name

        }))
        this.setState({kraftwerk: options})

        console.log(options);

    }

    handleChange(e){
        this.setState({kw_id:e.kw_id, kraftwerk_name:e.kraftwerk_name})
    }

    componentDidMount(){
        this.getOptions()
    }

    handleKraftwerk(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            KratwerkDataService.getAktuellesKraftwerk(this.state.kraftwerk_name).then(
                () => {
                    this.props.router.navigate("/hauptseite");
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
        console.log(this.state.kraftwerk)
        return (
            <div onSubmit={this.handleKraftwerk}>
                <Select placeholder={"Standorte"} options={this.state.kraftwerk} value={this.state.kraftwerk_name}
                        onChange={this.handleChange.bind(this)} />
                <p>Du hast den Standort <strong>{this.state.kraftwerk_name}</strong> ausgewählt, welcher die ID <strong>{this.state.kw_id}</strong> hat</p>

                <div className="form-group">
                    <button
                        className="btn btn-primary btn-block"
                        disabled={this.state.loading}
                    >
                        {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Start</span>
                    </button>
                </div>
                <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                        this.checkBtn = c;
                    }}
                />
            </div>
        )
    }
}