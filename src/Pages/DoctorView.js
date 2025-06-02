import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "../Components/SessionContext.js";
import { useNavigate } from "react-router-dom";
import { fetchAppointments } from "../Components/DataFormatter.js";

function DoctorView() {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const { session } = useSession();
    const navigate = useNavigate();
    const [appointments, setAppointments] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        async function loadAppointments() {
            try {
                const result = await fetchAppointments(session.role, session.userId);
                setAppointments(result);
                setLoading(false);
            } catch (err) {
                console.error("Error loading appointments:", err);
                setError("Failed to load appointments. Please try again later.");
                setLoading(false);
            }
        }
        loadAppointments();
    }, [session]);

    const onSubmit = data => {
        navigate('/home');
    }

    return (
        <div>
            <h1>Doctor Appointment View</h1>
            {loading && <p>Loading appointments...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && appointments.length === 0 && <p>No appointments found.</p>}
            {!loading && appointments.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Appointment ID</th>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>Appointment Type</th>
                            <th>Appointment Status</th>
                            <th>Appointment Date</th>
                            <th>Appointment Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.appointmentID}</td>
                                <td>{appointment.display.patientName}</td>
                                <td>{appointment.display.doctorName}</td>
                                <td>{appointment.display.appointmentType}</td>
                                <td>{appointment.display.appointmentStatus}</td>
                                <td>{appointment.display.appointmentDate}</td>
                                <td>{appointment.display.appointmentTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('doctor_id', { required: true })} value={session.userId} />
                <button type="submit">Back to Home</button>
            </form>
        </div>
    )
}

export default DoctorView;