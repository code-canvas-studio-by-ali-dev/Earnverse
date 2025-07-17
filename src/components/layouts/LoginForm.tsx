"use client";

import { useStore } from "@/store/authStore";
import { loginSchema } from "@/utils/zod/auth";
import axios from "axios";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

type LoginData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [data, setData] = useState<LoginData>({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});
    const { setToken } = useStore()

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Parse and validate input — Zod errors land here
            const validData = loginSchema.parse(data);

            // Submit to API
            const response = await axios.post("/api/v1/auth/login", validData);
            const token = response.data.data.token
            if (response.data.success) {
                toast.success(response.data.message);
                setToken(token)
                router.push("/auth/profile")
                setErrors({});
            } else {
                toast.error(response.data.message || "login failed");
            }
        } catch (err: unknown) {
            // Handle Zod validation errors
            if (err instanceof z.ZodError) {
                const fieldErrors: typeof errors = {};
                err.issues.forEach(issue => {
                    const field = issue.path[0] as keyof LoginData;
                    fieldErrors[field] = issue.message;
                });
                setErrors(fieldErrors);
                return;
            }
            setErrors({});
        }
    }

        return (
            <form aria-labelledby="login-heading" aria-describedby="login-info" onSubmit={handleSubmit} className="space-y-4 w-full">
                <fieldset className="fieldset w-full">
                    <label htmlFor="username" className="fieldset-legend">Username</label>
                    <input
                        type="text"
                        id="username"
                        className={clsx("input w-full", { "input-error": errors.username })}
                        placeholder="Enter your username"
                        value={data.username}
                        autoComplete="username"
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                        aria-invalid={!!errors.username}
                        aria-describedby={errors.username ? "username-error" : undefined}
                    />
                    {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username}</p>}
                </fieldset>

                <fieldset className="fieldset w-full">
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="fieldset-legend">Password</label>
                        <Link href="#" className="fieldset-legend underline">Forget Password?</Link>
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={clsx("input w-full", { "input-error": errors.password })}
                        placeholder="Enter your password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                    <label htmlFor="showPassword" className="cursor-pointer label justify-start gap-2 my-2">
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="checkbox checkbox-xs rounded-none"
                        />
                        <span className="label-text text-xs">
                            Show Password
                        </span>
                    </label>
                </fieldset>

                <button className="btn btn-block btn-neutral mt-2" type="submit">LOGIN</button>
            </form>
        );
    }
