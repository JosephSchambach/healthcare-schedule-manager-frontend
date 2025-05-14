import React from "react";
import { useForm } from "react-hook-form";
import { getContext } from "../utils.js";

function PatientRescheduleForm() {
    const { register, handleSubmit, formState: { errors }} = useForm();

    const onSubmit = async data => {
        console.log(JSON.stringify(data))
        const url = await getContext('url');
        const response = await fetch(`${url}/appointment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
    }

    return (
        <div>
            <h1>Reschedule Appointment</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input {...register()} /> */}
        </form>
        </div>
    )
}

export default PatientRescheduleForm;