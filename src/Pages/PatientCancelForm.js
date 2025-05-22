import React from "react";
import { useForm } from "react-hook-form";
import { getContext } from "../utils.js";

function PatientCancelForm() {
    const { register, handleSubmit, formState: { errors }} = useForm();

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
        } catch (error){
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data. Please try again later.");
        }
    }

    return (
        <div>
            <h1>Cancel Appointment</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input {...register()} /> */}
        </form>
        </div>
    )
}

export default PatientCancelForm;