import React, { useState, useEffect } from "react";
import {Button, Col, Row} from "react-bootstrap";

import KraftwerkDataService from "../../services/kraftwerk.service"

import SpinnerKraftwerk from "./SpinnerKraftwerk";

const  ContentLoaderKraftwerke02 = () => {
    const [selectedKraftwerk, setSelectedKraftwerk] = useState(null);
    const [kraftwerke, setKraftwerke] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await KraftwerkDataService.getAll();
            setKraftwerke(data);
        };
        fetchAPI();
    }, []);

    return (
        <>
            {kraftwerke.length > 0 ? (
                kraftwerke.map((kraftwerk) => (
                    <Row
                        className={
                            selectedKraftwerk === kraftwerk.kw_id
                        }
                        onClick={() => {
                            console.log(kraftwerk.kw_id);
                            console.log(kraftwerk.kraftwerk_name);
                            setSelectedKraftwerk(kraftwerk.kw_id);
                        }}
                        key={kraftwerk.id}
                    >
                        <Col xxl="2" xl="2" lg="3" md="3" sm="2" xs="2">
                            <Button
                                alt={kraftwerk.kraftwer_name}
                                className="coin-image mx-2"
                                fluid
                            />
                        </Col>
                    </Row>
                ))
            ) : (
                <SpinnerKraftwerk />
            )}
        </>
    );
};
export default ContentLoaderKraftwerke02;