import React, { useState } from 'react';
import { getContext } from "../utils.js";

export function formatAppointments( rawAppointments ) {
    if (!Array.isArray(rawAppointments)) {
        console.error("Expected appointment data to be an array:", rawAppointments);
        return [];
      }

    return rawAppointments.map(appointment => {
        console.log("Raw appointment data:", appointment);
        const appointmentID = appointment.appointment_id;
        const patientID = appointment.patient_id;
        const doctorID = appointment.doctor_id;
        const appointmentTypeID = appointment.appointment_type_id;
        const appointmentStatusID = appointment.appointment_status_id;

        return {
            appointmentID,
            patientID,
            doctorID,
            appointmentTypeID,
            appointmentStatusID,
            display: {
                patientName: appointment.patient_name,
                doctorName: appointment.doctor_name,
                appointmentType: appointment.appointment_type,
                appointmentStatus: appointment.appointment_status,
                appointmentDate: appointment.appointment_date,
                appointmentTime: appointment.appointment_time,
                notes: appointment.notes,
            }
        };
    });
}

export async function fetchAppointments( role, userId) {
    console.log("Fetching appointments for role:", role, "and userId:", userId);
    const url = await getContext('url');
    const queryParams = new URLSearchParams({
        role: role,
        userID: userId
    }).toString();
    const response = await fetch(`${url}/appointment?${queryParams}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const result = await response.json();
    
    if (!response.ok) {
        console.error("Error fetching appointments:", result);
        return [];
    }
    
    console.log("Type of data:", typeof result); 
    const formatted = formatAppointments(result);
    console.log("Formatted appointments:", formatted);
    return formatted;
}