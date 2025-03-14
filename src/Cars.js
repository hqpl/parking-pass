// src/components/Cars.js
import React, { useState, useEffect } from 'react';
import CarForm from './CarForm';
import './Cars.css';  // You'll need to create this CSS file

const HOST = 'http://192.168.0.3:8080';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCars();
    }, []);

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const fetchCars = async () => {

        // Create base64 encoded credentials
        const credentials = btoa('Mat@Hackathon:password');

        try {
            const response = await fetch(`${HOST}/api/20250227/car`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                    'X-HACKATHON': 'authenticated',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCars(data);
                setIsLoading(false);
            } else {
                console.log(`Failed to fetch cars. Status: ${response.status}`);
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="cars-container">
            <div className="cars-grid">

                {/* Add new Car card */}
                {!isFormVisible && (
                <div className="car-card add-new-card">
                    <div className="add-new-content">
                        <h2 onClick={toggleForm}
                            style={{ cursor: 'pointer' }}
                        >Add New Car</h2>
                    </div>
                </div>
                )}
                {/* Add new Car form card */}

                {isFormVisible && <CarForm onClose={toggleForm} />}

                {/* List of Car cards */}

                {cars.map(car => (
                    <div key={car.id} className="car-card">
                        <h3>{car.manufacturer}</h3>
                        <h2>{car.plates}</h2>
                        <p>Created: {new Date(car.creationDate).toLocaleDateString()}</p>
                        <div className="car-status">
                            <span className={`status ${car.active ? 'active' : 'inactive'}`}>
                                {car.active ? 'Active' : 'Inactive'}
                            </span>
                            <span className={`demised ${car.notDemised ? 'issued' : 'demised'}`}>
                                {car.notDemised ? 'Issued' : 'Demised'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cars;
