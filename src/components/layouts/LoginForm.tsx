"use client";

import { useStore } from "@/store/authStore";
import { loginSchema } from "@/utils/zod/auth";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

type LoginData = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [data, setData] = useState<LoginData>({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});

    const { user } = useStore()
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsed = loginSchema.safeParse(data);
        if (!parsed.success) {
            const fieldErrors: typeof errors = {};
            parsed.error.issues.forEach(err => {
                const field = err.path[0] as keyof LoginData;
                fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
        } else {
            console.log(parsed.data)
            if ((user?.username === parsed.data.username) && (user.password === parsed.data.password)) {
                router.push('/user/dashboard')

            } else {
                setErrors({
                    username: "Invalid username or password",
                    password: "Invalid username or password"
                })
            }
            setErrors({});
        }
    };

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
