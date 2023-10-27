import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const SystemTest2 = () => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        fetchDataFromDatabase();
    }, []);

    const fetchDataFromDatabase = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/systeme');
            const data = await response.json();
            setOptions(data); // Setze die abgerufenen Werte in den State

            // Aktuellen Wert abrufen und im State setzen
            const currentValueResponse = await fetch('http://localhost:8080/api/systeme/kraftwerke/{kw_id}/{system_id}');
            const currentValue = await currentValueResponse.json();
            setSelectedOption(currentValue);
        } catch (error) {
            console.error('Fehler beim Abrufen der Daten:', error);
        }
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label>System</Form.Label>
                <Form.Control as="select" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    <option disabled selected value="">Bitte wählen...</option>
                    {options.map((option) => (
                        <option key={option.system_id} value={option.system_id}>{option.system_name}</option>
                    ))}
                </Form.Control>
            </Form.Group>
        </Form>
    );
};

export default SystemTest2;