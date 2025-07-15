"use client";

import { signupSchema } from "@/utils/zod/auth";
import clsx from "clsx";
import { useState } from "react";
import { z } from "zod";

type SignupData = z.infer<typeof signupSchema>;

export function SignupForm() {
    const [data, setData] = useState<SignupData>({
        email: "",
        password: "",
        agreeTerms: false,
        agreeGuidelines: false,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof SignupData, string>>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parsed = signupSchema.safeParse(data);
        if (!parsed.success) {
            const fieldErrors: typeof errors = {};
            parsed.error.issues.forEach(err => {
                const field = err.path[0] as keyof SignupData;
                fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
        } else {
            console.log("Signup data:", parsed.data);
            setErrors({});
        }
    };

    return (
        <form aria-labelledby="signup-heading" aria-describedby="signup-info" onSubmit={handleSubmit} className="space-y-4 w-full" >

            <fieldset className="fieldset w-full">
                <label htmlFor="email" className="fieldset-legend">Email</label>
                <input
                    type="email"
                    id="email"
                    className={clsx("input w-full", { "input-error": errors.email })}
                    placeholder="Enter your email"
                    value={data.email}
                    autoComplete="email"
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </fieldset>

            <fieldset className="fieldset w-full">
                <label htmlFor="password" className="fieldset-legend">Password</label>
                <input
                    type="password"
                    id="password"
                    className={clsx("input w-full", { "input-error": errors.password })}
                    placeholder="Enter your password"
                    value={data.password}
                    autoComplete="new-password"
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </fieldset>

            <div className="flex flex-col gap-5">
                <label htmlFor="agreeTerms" className="cursor-pointer label justify-start gap-2">
                    <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={data.agreeTerms}
                        onChange={(e) => setData({ ...data, agreeTerms: e.target.checked })}
                        className={clsx("checkbox checkbox-xs", { "checkbox-error": errors.agreeTerms })}
                        aria-invalid={!!errors.agreeTerms}
                        aria-describedby={errors.agreeTerms ? "agreeTerms-error" : undefined}
                    />
                    <span className={clsx("label-text text-xs", { "text-error": errors.agreeTerms })}>
                        I have read and accepted the <a href="#" className="link">Terms of Use</a>
                    </span>
                </label>
                <label htmlFor="agreeGuidelines" className="cursor-pointer label justify-start gap-2">
                    <input
                        type="checkbox"
                        id="agreeGuidelines"
                        checked={data.agreeGuidelines}
                        onChange={(e) => setData({ ...data, agreeGuidelines: e.target.checked })}
                        className={clsx("checkbox checkbox-xs", { "checkbox-error": errors.agreeGuidelines })}
                        aria-invalid={!!errors.agreeGuidelines}
                        aria-describedby={errors.agreeGuidelines ? "agreeGuidelines-error" : undefined}
                    />
                    <span className={clsx("label-text text-xs", { "text-error": errors.agreeGuidelines })}>
                        I have read and accepted the <a href="#" className="link">Earnverse Guidelines</a>
                    </span>
                </label>
            </div>

            <button className="btn btn-block btn-neutral mt-2" type="submit">CREATE ACCOUNT</button>
        </form >
    );
}
