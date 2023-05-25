import React from "react";
import { Container} from "react-bootstrap";
import VirenschutzDataService from "../../services/virenschutz.service";


export const VirenschutzSpin = (props) => (
    <div className="form-group">
        <strong>{props.status}</strong>
        <select
            className="form-control"
            onChange={props.status}
        >
            <option defaultValue>Virenschutzstatus{props.status}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.status}
                </option>
            ))}
        </select>
    </div>
)

export default class Virenschutz extends React.Component {
    constructor(props) {
        super(props)
        this.retrieveVirenschutz = this.retrieveVirenschutz.bind(this);
        this.state = {
            virenschutz: [],
            value: '',
        }
    }

    retrieveVirenschutz() {
        VirenschutzDataService.getAll()
            .then(response => {
                this.setState({
                    virenschutz: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveVirenschutz();
    }

    onChange = (event) => {
        this.setState({value: event.target.value})
    }

    render() {

        return (
            <Container>
                <VirenschutzSpin
                    name={this.state.status}
                    options={this.state.virenschutz}
                />
            </Container>
        )
    }
}