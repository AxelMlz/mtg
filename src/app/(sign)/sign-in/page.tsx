"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (result?.error) {
                throw new Error("Invalid credentials");
            }

            window.location.href = "/dashboard"; // Redirect after login
        } catch (err) {
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">Sign In</h2>
            {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                <input {...register("email")} type="email" placeholder="Email" className="w-full p-2 border rounded" />
                <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border rounded" />

                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
