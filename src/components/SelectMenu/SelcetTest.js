import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const SelectTest = () => {
    const [selectedStandort, setSelectedStandort] = useState(null);
    const [standorte, setStandorte] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/kraftwerke')
            .then(response => response.json())
            .then(data => {
                const newStandorte = data.map(standort => ({
                    value: standort.kw_id,
                    label: standort.kraftwerk_name
                }));
                setStandorte(newStandorte);
                setLoading(false);
            })
            .catch(error => console.log(error));
    }, []);

    const handleStartClick = () => {
        if (selectedStandort !== null) {
            localStorage.setItem('kw_id', selectedStandort.value);
            localStorage.setItem('kraftwerk_name', selectedStandort.label);
            window.location.href = "/test2";
        }
    }

    // CSS-Stil für das Select-Menü
    const selectStyle = {
        width: '60%', // 60% der Seite
    };

    // CSS-Stil für den Button
    const buttonStyle = {
        marginTop: '10px', // Abstand zum Select-Menü
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Form>
                        <Form.Group controlId="formStandort">
                            <Select
                                placeholder={"Standorte"}
                                options={standorte}
                                onChange={setSelectedStandort}
                                isClearable={true}
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        ...selectStyle,
                                    }),
                                }}
                            />
                            <Button variant="primary" onClick={handleStartClick} style={buttonStyle}>Start</Button>
                        </Form.Group>
                    </Form>
                </div>
            )}
        </div>
    );
}

export default SelectTest;