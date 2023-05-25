import React from "react";
import { Container} from "react-bootstrap";
import BetriebssystemDataService from "../../services/betriebssystem.service";

export const BetriebssystemSpin = (props) => (
    <div className="form-group">
        <strong>{props.betriebssystem_name}</strong>
        <select
            className="form-control"
            onChange={props.betriebssystem_name}
        >
            <option defaultValue>Betriebssystem{props.betriebssystem_name}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.betriebssystem_name}
                </option>
            ))}
        </select>
    </div>
)

export default class Betriebssystem extends React.Component{
    constructor(props) {
        super(props)
        this.retrieveBetriebssystem = this.retrieveBetriebssystem.bind(this);
        this.state = {
            betriebssystem: [],
            value: '',
        }
    }

    retrieveBetriebssystem() {
        BetriebssystemDataService.getAll()
            .then(response => {
                this.setState({
                    betriebssystem: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveBetriebssystem();
    }
    onChange = (event) => {
        this.setState({ value: event.target.value })
    }

    render() {

        return(
            <Container >
                <BetriebssystemSpin
                    name={this.state.betriebssystem_name}
                    options={this.state.betriebssystem}
                />
            </Container>
        )
    }
}