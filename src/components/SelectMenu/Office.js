import React from "react";
import { Container} from "react-bootstrap";
import OfficeDataService from "../../services/office.service";

export const OfficeSpin = (props) => (
    <div className="form-group">
        <strong>{props.version}</strong>
        <select
            className="form-control"
            onChange={props.version}
        >
            <option defaultValue>Office{props.version}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.version}
                </option>
            ))}
        </select>
    </div>
)

export default class Office extends React.Component {
    constructor(props) {
        super(props)
        this.retrieveOffice = this.retrieveOffice.bind(this);
        this.state = {
            office: [],
            value: '',
        }
    }

    retrieveOffice() {
        OfficeDataService.getAll()
            .then(response => {
                this.setState({
                    office: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveOffice();
    }

    onChange = (event) => {
        this.setState({value: event.target.value})
    }

    render() {

        return (
            <Container>
                <OfficeSpin
                    name={this.state.version}
                    options={this.state.office}
                />
            </Container>
        )
    }
}