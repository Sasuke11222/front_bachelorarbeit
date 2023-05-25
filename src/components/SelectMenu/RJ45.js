import React from "react";
import { Container} from "react-bootstrap";
import RJ45DataService from "../../services/rj45.service";

export const RJ45Spin = (props) => (
    <div className="form-group">
        <strong>{props.status}</strong>
        <select
            className="form-control"
            onChange={props.status}
        >
            <option defaultValue>RJ45-Status{props.status}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.status}
                </option>
            ))}
        </select>
    </div>
)

export default class RJ45 extends React.Component {
    constructor(props) {
        super(props)
        this.retrieveRJ45 = this.retrieveRJ45.bind(this);
        this.state = {
            rj45: [],
            value: '',
        }
    }

    retrieveRJ45() {
        RJ45DataService.getAll()
            .then(response => {
                this.setState({
                    rj45: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveRJ45();
    }

    onChange = (event) => {
        this.setState({value: event.target.value})
    }

    render() {

        return (
            <Container>
                <RJ45Spin
                    name={this.state.status}
                    options={this.state.rj45}
                />
            </Container>
        )
    }
}