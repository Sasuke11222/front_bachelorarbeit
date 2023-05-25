import React from "react";
import { Container} from "react-bootstrap";
import SystemherstellerDataService from "../../services/systemhersteller.service";

export const SystemherstellerSpin = (props) => (
    <div className="form-group">
        <strong>{props.herstellername}</strong>
        <select
            className="form-control"
            onChange={props.herstellername}
        >
            <option defaultValue>Systemhersteller{props.herstellername}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.herstellername}
                </option>
            ))}
        </select>
    </div>
)

export default class Systemhersteller extends React.Component{
    constructor(props) {
        super(props)
        this.retrieveSystemhersteller = this.retrieveSystemhersteller.bind(this);
        this.state = {
            systemhersteller: [],
            value: '',
        }
    }

    retrieveSystemhersteller() {
        SystemherstellerDataService.getAll()
            .then(response => {
                this.setState({
                    systemhersteller: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveSystemhersteller();
    }
    onChange = (event) => {
        this.setState({ value: event.target.value })
    }

    render() {

        return(
            <Container >
                <SystemherstellerSpin
                    name={this.state.herstellername}
                    options={this.state.systemhersteller}
                />
            </Container>
        )
    }
}