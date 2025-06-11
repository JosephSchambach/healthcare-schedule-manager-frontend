import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../Components/SessionContext';
import '../App.css';

function HomePage() {
    const { session, clearSession } = useSession();
    console.log(session);
    const navigate = useNavigate();
    return (
        <div className="App">
            <h1 className="App.header">Appointment Manager</h1>            
                { session.role === 'doctor' && 
                <button onClick={() => navigate('/doctor')}>Doctor View</button>}
                { session.role === 'patient' && 
                <>
                    <div>
                        <button onClick={() => navigate('/schedule')}>Schedule Appointment</button>
                    </div>
                    <div>
                        <button onClick={() => navigate('/cancel')}>Cancel Appointment</button>
                    </div>
                    <div>
                        <button onClick={() => navigate('/reschedule')}>Reschedule Appointment</button>
                    </div>
                </>}
                <button onClick={() => clearSession()}>Logout</button>
        </div>
    )
}

export default HomePage;