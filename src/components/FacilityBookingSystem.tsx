// import React, { useState, useEffect } from 'react';

// const FacilityBookingSystem = () => {
//     interface Facility {
//         id: string;
//         name: string;
//     }

//     const [facilities, setFacilities] = useState<Facility[]>([]);
//     const [selectedFacility, setSelectedFacility] = useState('');
//     const [bookingDate, setBookingDate] = useState('');
//     interface Availability {
//         isAvailable: boolean;
//     }

//     const [availability, setAvailability] = useState<Availability | null>(null);

//     useEffect(() => {
//         // Fetch facilities from the API
//         const fetchFacilities = async () => {
//             const response = await fetch('/api/facilities');
//             const data = await response.json();
//             setFacilities(data);
//         };
//         fetchFacilities();
//     }, []);

//     const checkAvailability = async () => {
//         const response = await fetch(`/api/facilities/${selectedFacility}/availability?date=${bookingDate}`);
//         const data = await response.json();
//         setAvailability(data);
//     };

//     const handleBooking = async () => {
//         const response = await fetch(`/api/facilities/${selectedFacility}/book`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ date: bookingDate }),
//         });
//         if (response.ok) {
//             alert('Booking successful!');
//             // Optionally refresh availability or reset form
//         } else {
//             alert('Booking failed. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <h1>Campus Facility Booking System</h1>
//             <label>
//                 Select Facility:
//                 <select value={selectedFacility} onChange={(e) => setSelectedFacility(e.target.value)}>
//                     <option value="">Select...</option>
//                     {facilities.map((facility) => (
//                         <option key={facility.id} value={facility.id}>{facility.name}</option>
//                     ))}
//                 </select>
//             </label>
//             <label>
//             {availability !== null && (
//                 <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
//             )}
//             </label>
//             <button onClick={checkAvailability}>Check Availability</button>
//             {availability && (
//                 <div>
//                     <h2>Availability</h2>
//                     <p>{availability.isAvailable ? 'Available' : 'Not Available'}</p>
//                     {availability.isAvailable && <button onClick={handleBooking}>Book Now</button>}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FacilityBookingSystem;

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

    // Function to format the date into the expected 'YYYY-MM-DD' format
    const formatDate = (date: string) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        // Fetch facilities from the API
        const fetchFacilities = async () => {
            try {
                const response = await fetch('/api/facilities');
                if (!response.ok) throw new Error('Failed to fetch facilities');
                const data = await response.json();
                console.log('Facilities data:', data);  // Log the response structure
                setFacilities(data);
            } catch (error) {
                console.error('Error fetching facilities:', error);
            }
        };
        fetchFacilities();
    }, []);

    const checkAvailability = async () => {
        if (!selectedFacility || !bookingDate) {
            console.error('Please select a facility and a booking date');
            return;
        }

        const formattedDate = formatDate(bookingDate);  // Format the date
        console.log('Formatted date:', formattedDate);  // Log the formatted date

        const url = `/api/facilities/${selectedFacility}/availability?date=${formattedDate}`;
        console.log('API URL:', url);  // Log the full URL

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('Availability data:', data);  // Log the availability data
            setAvailability(data);
        } catch (error) {
            console.error('Error checking availability:', error);
        }
    };

    const handleBooking = async () => {
        const formattedDate = formatDate(bookingDate);  // Format the date
        console.log('Booking date for API:', formattedDate);

        const response = await fetch(`/api/facilities/${selectedFacility}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date: formattedDate }),
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
                {selectedFacility && (
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
