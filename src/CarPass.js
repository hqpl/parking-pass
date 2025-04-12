import React, { useState, useEffect } from 'react';
import CarForm from './CarForm';
import './CarPass.css';

const HOST = 'http://192.168.0.3:8080';
const credentials = btoa('Mat@Hackathon:password');

const CarPass = () => {
    const [carPasses, setCarPasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCarPasses();
    }, []);

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const fetchCarPasses = async () => {
        try {
            const response = await fetch(`${HOST}/api/20250327/carpass`, {
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
                setCarPasses(data);
                setIsLoading(false);
            } else {
                console.log(`Failed to fetch car passes. Status: ${response.status}`);
                setError(`Failed to fetch car passes. Status: ${response.status}`);
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString("pl-PL");
    };

    const handleGeneratePass = async (carId) => {
        try {
            const response = await fetch(`${HOST}/api/20250227/pass/generate/${carId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                    'X-HACKATHON': 'authenticated'
                }
            });

            if (response.ok) {
                // Refresh the page to show the new pass
                window.location.reload();
            } else {
                console.error('Failed to generate pass:', response.status);
                alert('Failed to generate pass. Please try again.');
            }
        } catch (error) {
            console.error('Error generating pass:', error);
            alert('Error generating pass. Please try again.');
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="carpass-container">
            <div className="carpass-grid">

                {/* Add new Car card */}
                {!isFormVisible && (
                    <div className="carpass-card add-new-card">
                        <div className="add-new-content">
                            <button onClick={toggleForm} className="active-btn"
                            >Add New Car</button>
                        </div>
                    </div>
                )}
                {/* Add new Car form card */}

                {isFormVisible && <CarForm onClose={toggleForm} />}

                {/* List of Car cards */}
                {carPasses.map((car) => (
                    <div key={car.carId} className="carpass-card">
                        <div className="car-details">
                            <h3>{car.carManufacturer}</h3>
                            <p>Plates: <b>{car.carPlates}</b></p>
                            <p>Car ID: {car.carId}</p>
                            <p className={`pass-status ${car.carActive ? 'active' : 'inactive'}`}>
                                Temporary status: {car.carActive ? 'Active' : 'Inactive'}
                            </p>
                            <p className={`pass-status ${car.carNotDemised ? 'active' : 'inactive'}`}>
                                Demised: {car.carNotDemised ? 'In Use' : 'Demised'}
                            </p>

                        </div>

                        {car.passId ? (
                            <div className="pass-details">
                                <h4>Pass Information</h4>
                                <p>Pass ID: {car.passId}</p>
                                <p>Created: {formatDate(car.passCreationDate)}</p>
                                <p>Expires: {formatDate(car.passExpirationDate)}</p>
                                <p className={`pass-status ${car.passActive ? 'active' : 'inactive'}`}>
                                    Status: {car.passActive ? 'Active' : 'Inactive'}
                                </p>
                            </div>
                        ) : (
                            <div className="no-pass">
                                <p>No active pass</p>
                                <button
                                    onClick={() => handleGeneratePass(car.carId)}
                                    className="active-btn"
                                >
                                    Generate New Pass
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarPass;
