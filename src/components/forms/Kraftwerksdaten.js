import React from "react";
import {Form, FloatingLabel} from "react-bootstrap";



function Kraftwerkform() {
    const floatinlabel = {
        color: "#000",
    }


    return (
        <div>
            <>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Kraftwerk:</Form.Label>
                        <Form.Control disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <FloatingLabel controlId="floatingSelect" label="Kraftwerksleiter" style={floatinlabel}>
                            <Form.Select>
                                <option value="1">Name 1</option>
                                <option value="2">Name 2</option>
                                <option value="3">Name 3</option>
                                <option value="4">Name 4</option>
                                <option value="5">Name 5</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <FloatingLabel controlId="floatingSelect" label="Systemkoordinator" style={floatinlabel}>
                            <Form.Select>
                                <option value="1">Name 1</option>
                                <option value="2">Name 2</option>
                                <option value="3">Name 3</option>
                                <option value="4">Name 4</option>
                                <option value="5">Name 5</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <FloatingLabel controlId="floatingSelect" label="Zoneninstanzbesitzer" style={floatinlabel}>
                            <Form.Select>
                                <option value="1">Name 1</option>
                                <option value="2">Name 2</option>
                                <option value="3">Name 3</option>
                                <option value="4">Name 4</option>
                                <option value="5">Name 5</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Form>
            </>
        </div>

    );
}

export default Kraftwerkform