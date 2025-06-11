import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getContext } from "../utils.js";
import { fetchAppointments } from "../Components/DataFormatter.js";
import { useSession } from "../Components/SessionContext.js";
import "../App.css";

function PatientCancelForm() {
    const { session } = useSession();
    const navigator = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error ] = useState(null);
    useEffect(() => {
        async function loadAppointments() {
            const result = await fetchAppointments(session.role, session.userId);
            setAppointments(result);
            setLoading(false);
        }
        loadAppointments();
    }, [session]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const onSubmit = async data => {
        console.log(JSON.stringify(data))
        const url = await getContext('url');
        try {
            const response = await fetch(`${url}/appointment`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            let status_code = result.statusCode;
            if (status_code === 200) {
                alert("Appointment Cancelled Successfully");
                console.log(result);
                navigator('/home');
            } else {
                console.log("Appointment Cancellation Failed");
                console.log(result);
                alert("Appointment Cancellation Failed");
            }
        } catch (error){
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data. Please try again later.");
        }
    }

    return (
        <div className="App">
            <h1 className="h1">Cancel Appointment</h1>
            <h2>Your Appointments</h2>
            {appointments.length === 0 ? (
                <p className="p">No appointments found.</p>
            ) : (
                <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {appointments.map(appt => (
                            <div className="appointment-list" key={appt.appointmentId}>
                                <label>
                                    <input
                                        type="radio"
                                        value={appt.appointmentID}
                                        {...register('appointment_id', { required: true })}
                                    />
                                    {appt.display.appointmentDate} at {appt.display.appointmentTime} with Dr. {appt.display.doctorName}
                                </label>
                            </div>
                        ))}
                        {errors.appointment_id && <span>Appointment Required</span>}
                    </div>
                    <input type="hidden" {...register('patient_id', { required: true })} value={session.userId} />
                    <div className="form-group">
                        <button type="submit">Cancel Appointment</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default PatientCancelForm;