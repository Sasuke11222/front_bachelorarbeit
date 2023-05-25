import React from "react";
import { Container} from "react-bootstrap";
import SystemeinheitDataService from "../../services/systemeinheit.service";

export const SystemeinheitSpin = (props) => (
    <div className="form-group">
        <strong>{props.systemeinheit_name}</strong>
        <select
            className="form-control"
            onChange={props.systemeinheit_name}
        >
            <option defaultValue>Systemeinheit{props.systemeinheit_name}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.systemeinheit_name}
                </option>
            ))}
        </select>
    </div>
)

export default class Systemeinheit extends React.Component{
    constructor(props) {
        super(props)
        this.retrieveSystemeinheit = this.retrieveSystemeinheit.bind(this);
        this.state = {
            systemeinheit: [],
            value: '',
        }
    }

    retrieveSystemeinheit() {
        SystemeinheitDataService.getAll()
            .then(response => {
                this.setState({
                    systemeinheit: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveSystemeinheit();
    }
    onChange = (event) => {
        this.setState({ value: event.target.value })
    }

    render() {

        return(
            <Container >
                <SystemeinheitSpin
                    name={this.state.systemeinheit_name}
                    options={this.state.systemeinheit}
                />
            </Container>
        )
    }
}