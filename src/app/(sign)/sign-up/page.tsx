"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const signupSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(3),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required(),
});

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signupSchema),
    });

    const SERVER = process.env.SERVER;
    const onSubmit = async (data: any) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${SERVER}/routes/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Sign-up failed");
            }

            alert("Account created successfully!");
        } catch (err) {
            setError("Failed to create account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <input {...register("name")} placeholder="Full Name" className="w-full p-2 border rounded" />
                <p className="text-red-500 text-sm">{errors.name?.message}</p>

                <input {...register("email")} type="email" placeholder="Email" className="w-full p-2 border rounded" />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>

                <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border rounded" />
                <p className="text-red-500 text-sm">{errors.password?.message}</p>

                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}
