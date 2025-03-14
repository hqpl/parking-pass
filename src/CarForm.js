// CarForm.js
import React, { useState } from 'react';
import './Cars.css';

const CarForm = () => {
    const [formData, setFormData] = useState({
        manufacturer: '',
        plates: ''
    });

    const manufacturers = [
        'Audi',
        'BMW',
        'Bentley',
        'Chevrolet',
        'Chrysler',
        'Citroën',
        'Dodge',
        'Ferrari',
        'Fiat',
        'Ford',
        'Honda',
        'Hyundai',
        'Jaguar',
        'Jeep',
        'Kia',
        'Lamborghini',
        'Land Rover',
        'Lexus',
        'Maserati',
        'Mazda',
        'Mercedes',
        'Mini',
        'Mitsubishi',
        'Nissan',
        'Opel',
        'Peugeot',
        'Porsche',
        'Renault',
        'Seat',
        'Skoda',
        'Subaru',
        'Suzuki',
        'Tesla',
        'Toyota',
        'Volkswagen',
        'Volvo'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your submit logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="car-card add-new-form">
            <h3>Add New Car</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="manufacturer" style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
                        Manufacturer:
                    </label>
                    <select
                        id="manufacturer"
                        name="manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                        required
                    >
                        <option value="">Select Manufacturer</option>
                        {manufacturers.map(manufacturer => (
                            <option key={manufacturer} value={manufacturer}>
                                {manufacturer}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="plates" style={{ display: 'block', marginBottom: '5px', color: '#666' }}>
                        License Plates:
                    </label>
                    <input
                        type="text"
                        id="plates"
                        name="plates"
                        className="plates-input"
                        value={formData.plates}
                        onChange={handleChange}
                        maxLength={10}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                        required
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#004d99',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CarForm;
