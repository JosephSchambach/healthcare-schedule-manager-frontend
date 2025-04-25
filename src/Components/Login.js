import React from "react";
import { useForm } from "react-hook-form";
// import "./App.css"

export default function Login() {
    const { register, handleSubmit, formState: { errors }} = useForm();
    let roles = [
        "Admin", "Doctor", "Patient"
    ]

    const encodeAuthorizationHeader = (username, password, role) => {
        return btoa(`${username}:${password}:${role}`);
    }

    const onSubmit = async data => {
        console.log(JSON.stringify(data))
        const authorizationHeader = encodeAuthorizationHeader(data.username, data.password, data.role);
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Basic ${authorizationHeader}`
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        console.log(result)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username', { required: true })} />
            {errors.username && <span>Username Required</span>}
            <input type='password' {...register('password', { required: true })}/>
            {errors.password && <span>Password Required</span>}
            <select {...register('role', { required: true })}>
                {roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                ))}
            </select>
            {errors.role && <span>Role Required</span>}
            <button type='submit'>Login</button>
        </form>
    )
}