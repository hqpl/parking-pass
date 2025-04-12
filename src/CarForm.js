// CarForm.js
import React, { useState } from 'react';
import './CarPass.css';

const HOST = 'http://192.168.0.3:8080';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const credentials = btoa('Mat@Hackathon:password');
            const response = await fetch(`${HOST}/api/20250227/car`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                    'X-HACKATHON': 'authenticated'
                },
                body: JSON.stringify({
                    manufacturer: formData.manufacturer,
                    plates: formData.plates
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Car added successfully:', result);
                // Reset form
                setFormData({
                    manufacturer: '',
                    plates: ''
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                // Optionally refresh the car list or show success message
                // You might want to add a success notification here
            } else {
                console.error('Failed to add car:', response.status);
                // Handle error - maybe show an error message to the user
            }
        } catch (error) {
            console.error('Error adding car:', error);
            // Handle error - maybe show an error message to the user
        }
    };


    return (
        <div className="carpass-card add-new-form">
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="manufacturer">
                        Manufacturer:
                    </label>
                    <select
                        id="manufacturer"
                        name="manufacturer"
                        className="new-text"
                        value={formData.manufacturer}
                        onChange={handleChange}
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

                <div>
                    <label htmlFor="plates">
                        License Plates:
                    </label>
                    <input
                        type="text"
                        id="plates"
                        name="plates"
                        className="new-text"
                        value={formData.plates}
                        onChange={handleChange}
                        maxLength={10}
                        required
                    />
                </div>

                <div className="margin-top">
                    <button className="active-btn"
                        type="submit"
                    >
                        Add new car.
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CarForm;
