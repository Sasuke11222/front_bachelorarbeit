import React from "react";
import { Container} from "react-bootstrap";
import USBDataService from "../../services/usb.service";

export const USBSpin = (props) => (
    <div className="form-group">
        <strong>{props.status}</strong>
        <select
            className="form-control"
            onChange={props.status}
        >
            <option defaultValue>USB-Status{props.status}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.status}
                </option>
            ))}
        </select>
    </div>
)

export default class USB extends React.Component {
    constructor(props) {
        super(props)
        this.retrieveUSB = this.retrieveUSB.bind(this);
        this.state = {
            usb: [],
            value: '',
        }
    }

    retrieveUSB() {
        USBDataService.getAll()
            .then(response => {
                this.setState({
                    usb: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveUSB();
    }

    onChange = (event) => {
        this.setState({value: event.target.value})
    }

    render() {

        return (
            <Container>
                <USBSpin
                    name={this.state.status}
                    options={this.state.usb}
                />
            </Container>
        )
    }
}