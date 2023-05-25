import React from "react";
import { Container} from "react-bootstrap";
import SystemDataService from "../../services/system.service";

export const SystemSpin = (props) => (
    <div className="form-group">
        <strong>{props.system_name}</strong>
        <select
            className="form-control"
            onChange={props.system_name}
        >
            <option defaultValue>System{props.system_name}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.system_name}
                </option>
            ))}
        </select>
    </div>
)

export default class System extends React.Component{
    constructor(props) {
        super(props)
        this.retrieveSystem = this.retrieveSystem.bind(this);
        this.state = {
            systeme: [],
            value: '',
        }
    }

    retrieveSystem() {
        SystemDataService.getAll()
            .then(response => {
                this.setState({
                    systeme: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveSystem();
    }
    onChange = (event) => {
        this.setState({ value: event.target.value })
    }

    render() {

        return(
            <Container >
                <SystemSpin
                    name={this.state.system_name}
                    options={this.state.systeme}
                />
            </Container>
        )
    }
}