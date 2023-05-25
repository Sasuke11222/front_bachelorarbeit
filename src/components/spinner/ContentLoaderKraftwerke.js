import React from "react";
import {Button, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import KraftwerkDataService from "../../services/kraftwerk.service";

export const KraftwerkDropdown = (props) => (
    <div className="form-group">
        <strong>{props.kraftwerk_name}</strong>
        <select
            className="form-control"
            name="{props.username}"
            onChange={props.kraftwerk_name}
        >
            <option defaultValue>Standort{props.kraftwerk_name}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.kraftwerk_name}
                </option>
            ))}
        </select>
    </div>
)

export default class ContentLoaderKraftwerke extends React.Component{
    constructor(props) {
        super(props)
        this.retrieveKraftwerk = this.retrieveKraftwerk.bind(this);
        this.state = {
            kraftwerk: [],
            value: '',
        }
    }

    retrieveKraftwerk() {
        KraftwerkDataService.getAll()
            .then(response => {
                this.setState({
                    kraftwerk: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveKraftwerk();
    }
    onChange = (event) => {
        this.setState({ value: event.target.value })
    }

    changeValue(kw_id) {
        this.setState({dropDownValue: kw_id})
    }

    render() {

        const kraftwerkbutton = {
            background: "#0067ac",
            width: "100px",
            position: "absolute",
            left: "100%",
            marginTop: "13px",
            color: "#FFF"
        }

        const kraftwerkContainer = {
            width: "200px",
            height: "100px",
            position: "absolute",
            left: "200px",
        }

        const link ={
            color: '#FFF',
            textDecoration: "none"
        }

        return(
            <Container style={kraftwerkContainer}>
                <KraftwerkDropdown
                    name={this.state.kraftwerk_name}
                    options={this.state.kraftwerk}
                    onChange={this.changeValue}
                />
                <Button style={kraftwerkbutton}>
                    <Link
                        style={link}
                        className="navbar-link"
                        to={"/hauptseite"}
                    >
                        Start
                    </Link>
                </Button>{' '}
            </Container>
        )
    }
}