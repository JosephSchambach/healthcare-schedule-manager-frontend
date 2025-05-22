import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../Components/SessionContext';

function HomePage() {
    const { session, clearSession } = useSession();
    console.log(session);
    const navigate = useNavigate();
    return (
        <div> 
            <h1>Welcome to the Appointment Manager, {session.username}</h1>
            <button onClick={() => navigate('/schedule')}>Schedule Appointment</button>
            <button onClick={() => navigate('/cancel')}>Cancel Appointment</button>
            <button onClick={() => navigate('/reschedule')}>Reschedule Appointment</button>
            <button onClick={() => navigate('/doctor')}>Doctor View</button>
            <button onClick={() => clearSession()}>Logout</button>
        </div>
    )
}

export default HomePage;