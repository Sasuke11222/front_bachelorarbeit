import React from "react";
import { Container} from "react-bootstrap";
import FirewallDataService from "../../services/firewall.service";

export const FirewallSpin = (props) => (
    <div className="form-group">
        <strong>{props.status}</strong>
        <select
            className="form-control"
            onChange={props.status}
        >
            <option defaultValue>Firewallstatus{props.status}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.status}
                </option>
            ))}
        </select>
    </div>
)

export default class Firewall extends React.Component {
    constructor(props) {
        super(props)
        this.retrieveStatusFirewall = this.retrieveStatusFirewall.bind(this);
        this.state = {
            firewall: [],
            value: '',
        }
    }

    retrieveStatusFirewall() {
        FirewallDataService.getAll()
            .then(response => {
                this.setState({
                    firewall: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveStatusFirewall();
    }

    onChange = (event) => {
        this.setState({value: event.target.value})
    }

    render() {

        return (
            <Container>
                <FirewallSpin
                    name={this.state.status}
                    options={this.state.firewall}
                />
            </Container>
        )
    }
}