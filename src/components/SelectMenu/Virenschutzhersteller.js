import React from "react";
import { Container} from "react-bootstrap";
import VirenschutzherstellerDataService from "../../services/virenschutzhersteller.service";


export const VirenschutzherstellerSpin = (props) => (
    <div className="form-group">
        <strong>{props.herstellername}</strong>
        <select
            className="form-control"
            onChange={props.herstellername}
        >
            <option defaultValue>Virenschutzhersteller{props.herstellername}</option>
            {props.options.map((item, index) => (
                <option key={index} value={item.id}>
                    {item.herstellername}
                </option>
            ))}
        </select>
    </div>
)

export default class Virenschutzhersteller extends React.Component {
    constructor(props) {
        super(props)
        this.retrieveVirenschutzhersteller = this.retrieveVirenschutzhersteller.bind(this);
        this.state = {
            virenschutzhersteller: [],
            value: '',
        }
    }

    retrieveVirenschutzhersteller() {
        VirenschutzherstellerDataService.getAll()
            .then(response => {
                this.setState({
                    virenschutzhersteller: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.retrieveVirenschutzhersteller();
    }

    onChange = (event) => {
        this.setState({value: event.target.value})
    }

    render() {

        return (
            <Container>
                <VirenschutzherstellerSpin
                    name={this.state.herstellername}
                    options={this.state.virenschutzhersteller}
                />
            </Container>
        )
    }
}