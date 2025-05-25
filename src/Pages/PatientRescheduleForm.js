import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getContext } from "../utils.js";
import CustomDatePicker from "../Components/DatePicker.js";
import { useSession } from "../Components/SessionContext.js";
import { useNavigate } from "react-router-dom";
import { fetchAppointments } from "../Components/DataFormatter.js";

function PatientRescheduleForm() {
    const { session } = useSession();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);

    let timeSlots = [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00'
    ]
    let appointmentTypes = [
        {id: 1, name: 'general'}
    ]
    let doctors = [
        {id: 1, name: 'Dr. Smith'}
    ]
    useEffect(() => {
        async function loadAppointments() {
            const result = await fetchAppointments(session.role, session.userId);
            setAppointments(result);
            setLoading(false);
        }
        loadAppointments();
    }, [session]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setValue('appointment_date', date.toISOString().slice(0, 10));
    };

    const onSubmit = async data => {
        console.log(JSON.stringify(data));
        data.update_data = {
            appointment_date: data.appointment_date,
            appointment_time: data.appointment_time,
        }
        const url = await getContext('url');
        try {
            const response = await fetch(`${url}/appointment`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            let status_code = result.statusCode;
            if (status_code === 200) {
                alert("Appointment Scheduled Successfully");
                console.log(result);
                navigate('/home');
            } else {
                console.log("Appointment Scheduling Failed")
                console.log(result);
                alert("Appointment Scheduling Failed")
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data. Please try again later.");
        }
    };

    if (loading) return <div>Loading appointments...</div>;

    return (
        <div>
            <h2>Your Appointments</h2>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                appointments.map(appt => (
                    <div key={appt.appointmentId}>
                        <p>{appt.display.appointmentDate} at {appt.display.appointmentTime} with Dr. {appt.display.doctorName}</p>
                    </div>
                ))
            )}
            
            <h1>Schedule New Appointment</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('appointment_id', { required: true })} value={appointments[0]?.appointmentID} />
                <input type="hidden" {...register('patient_id', { required: true })} value={session.userId} />
                <CustomDatePicker value={selectedDate} onChange={handleDateChange} />
                {errors.appointment_date && <span>Appointment Date Required</span>}
                <select {...register('appointment_time', { required: true })}>
                    {timeSlots.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
                {errors.appointment_time && <span>Appointment Time Required</span>}
                <input {...register('notes', { required: false })} placeholder="Notes" />
                {errors.notes && <span>Notes Required</span>}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PatientRescheduleForm;
