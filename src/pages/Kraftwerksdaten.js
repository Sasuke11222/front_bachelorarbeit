import React from "react";
import { Col, Container, Row} from "react-bootstrap";
import Kraftwerkform from "../components/forms/Kraftwerksdaten";


class Kraftwerksdaten extends React.Component {
    render() {
        const hauptbox = {
            height: "450px",
            marginBottom: "50px",
            background: "#59841d",
            color: "#FFF",
            borderRadius: "8px",
        }

        const container1 = {
            marginTop: "100px",
        }



        return (
            <div className="kraftwerksdaten">
                <Container style={container1}>
                    <Row>
                        <Col lg={12} style={hauptbox}>
                            <div>
                                <Kraftwerkform/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Kraftwerksdaten