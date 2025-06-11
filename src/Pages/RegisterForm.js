import React from "react";
import { useForm } from "react-hook-form";
import { getContext } from "../utils.js";
import { useNavigate } from "react-router-dom";
import "../App.css";

function RegisterForm() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm();
    let roles = [
        "admin", "doctor", "patient"
    ]
    const onSubmit = async data => {
        console.log(JSON.stringify(data))
        const url = await getContext('url');

        try {
            const response = await fetch(`${url}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const result = await response.json();
            console.log(result);
            navigate('/');
        } catch(error) {
            console.error("Error creating user:", error);
            alert("An error occurred while creating user. Please try again later.");
        }
    }

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-header">
                    <h1 className="h1">Register</h1>
                </div>
                <div className="form-group">
                    <input {...register('firstName', { required: true })} placeholder="First Name" />
                    {errors.firstName && <span>This field is required</span>}
                </div>
                <div className="form-group">
                    <input {...register('lastName', { required: true })} placeholder="Last Name" />
                    {errors.lastName && <span>This field is required</span>}
                </div>
                <div className="form-group">
                    <input {...register('username', { required: true })} placeholder="Username" />
                    {errors.username && <span>This field is required</span>}   
                </div>
                <div className="form-group">
                    <input {...register('password', { required: true })} type="password" placeholder="Password" />
                    {errors.password && <span>This field is required</span>}
                </div>
                <div className="form-group">
                    <select {...register('role', { required: true })}>
                        {roles.map((role, index) => (
                            <option key={index} value={role}>{role}</option>
                        ))}
                    </select>
                    {errors.role && <span>This field is required</span>}
                </div>
                <div className="form-group">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;