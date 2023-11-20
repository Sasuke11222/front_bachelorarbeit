import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const KraftwerkSelect = () => {
    const [kraftwerke, setKraftwerke] = useState([]);
    const [selectedKraftwerk, setSelectedKraftwerk] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/kraftwerke')
            .then(response => response.json())
            .then(data => setKraftwerke(data))
            .catch(error => console.log(error));
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        // Hier kannst du den ausgewählten Standort verwenden, um die Informationen abzurufen
        console.log(selectedKraftwerk);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    as="select"
                    value={selectedKraftwerk}
                    onChange={event => setSelectedKraftwerk(event.target.value)}
                >
                    <option value="">Bitte auswählen...</option>
                    {kraftwerke.map(kraftwerk => (
                        <option key={kraftwerk.kw_id} value={kraftwerk.kraftwerk_name}>{kraftwerk.kraftwerk_name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
        </Form>
    );
};

export default KraftwerkSelect;