import React from "react";
import { useForm } from "react-hook-form";
import { getContext } from "../utils.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
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
        const url = await getContext('url');
        let result = {}
        try {
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': `Basic ${authorizationHeader}`
                },
                body: JSON.stringify(data)
            })
            result = await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data. Please try again later.");
        }
        let status_code = result.statusCode
        if (status_code === 200) {
            let session_token = result.sessionToken
            navigate('/home', {state: { session_token: session_token, role: data.role, username: data.username }})
        } else {
            console.log("Login Failed")
            alert("Login Failed")
        }
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