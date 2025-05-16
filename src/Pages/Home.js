import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    return (
        <div> 
            <h1>Welcome to the Appointment Manager</h1>
            <button onClick={() => navigate('/schedule')}>Schedule Appointment</button>
            <button onClick={() => navigate('/cancel')}>Cancel Appointment</button>
            <button onClick={() => navigate('/reschedule')}>Reschedule Appointment</button>
            <button onClick={() => navigate('/doctor')}>Doctor View</button>
        </div>
    )
}

export default HomePage;