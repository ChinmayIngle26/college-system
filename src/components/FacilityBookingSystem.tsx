import React, { useState, useEffect } from 'react';

const FacilityBookingSystem = () => {
    interface Facility {
        id: string;
        name: string;
    }

    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [selectedFacility, setSelectedFacility] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    interface Availability {
        isAvailable: boolean;
    }

    const [availability, setAvailability] = useState<Availability | null>(null);

    useEffect(() => {
        // Fetch facilities from the API
        const fetchFacilities = async () => {
            const response = await fetch('/api/facilities');
            const data = await response.json();
            setFacilities(data);
        };
        fetchFacilities();
    }, []);

    const checkAvailability = async () => {
        const response = await fetch(`/api/facilities/${selectedFacility}/availability?date=${bookingDate}`);
        const data = await response.json();
        setAvailability(data);
    };

    const handleBooking = async () => {
        const response = await fetch(`/api/facilities/${selectedFacility}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: bookingDate }),
        });
        if (response.ok) {
            alert('Booking successful!');
            // Optionally refresh availability or reset form
        } else {
            alert('Booking failed. Please try again.');
        }
    };

    return (
        <div>
            <h1>Campus Facility Booking System</h1>
            <label>
                Select Facility:
                <select value={selectedFacility} onChange={(e) => setSelectedFacility(e.target.value)}>
                    <option value="">Select...</option>
                    {facilities.map((facility) => (
                        <option key={facility.id} value={facility.id}>{facility.name}</option>
                    ))}
                </select>
            </label>
            <label>
            {availability !== null && (
                <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
            )}
            </label>
            <button onClick={checkAvailability}>Check Availability</button>
            {availability && (
                <div>
                    <h2>Availability</h2>
                    <p>{availability.isAvailable ? 'Available' : 'Not Available'}</p>
                    {availability.isAvailable && <button onClick={handleBooking}>Book Now</button>}
                </div>
            )}
        </div>
    );
};

export default FacilityBookingSystem;