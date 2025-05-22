import React from "react";
import { useForm } from "react-hook-form";
import { getContext } from "../utils.js";
import CustomDatePicker from "../Components/DatePicker.js";
import { useSession } from "../Components/SessionContext.js";
import { useNavigate } from "react-router-dom";


function PatientScheduleForm() {
    const { session } = useSession();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
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

    const onSubmit = async data => {
        console.log(JSON.stringify(data))
        const url = await getContext('url');
        try {
            const response = await fetch(`${url}/appointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            let status_code = result.statusCode
            if (status_code === 201) {
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
    }

    const [ selectedDate, setSelectedDate ] = React.useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setValue('appointment_date', date.toISOString().slice(0, 10));
    };

    return (
        <div>
            <h1>Schedule Appointment</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('patient_id', { required: true })} value={session.userId} />
                <select {...register('appointment_type', { required: true })}>
                    {appointmentTypes.map((type) => (
                        <option key={type.id} value={JSON.stringify(type)}>
                            {type.name}
                        </option>
                    ))}
                </select>
                {errors.appointment_type && <span>Appointment Type Required</span>}
                <select {...register('doctor', { required: true })}>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={JSON.stringify(doctor)}>
                            {doctor.name}
                        </option>
                    ))}
                </select>
                {errors.doctor && <span>Doctor Required</span>}
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
    )
}

export default PatientScheduleForm;