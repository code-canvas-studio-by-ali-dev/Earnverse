"use client";

import { useState } from "react";
import { z } from "zod";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

// Zod schema for OTP
const otpSchema = z.object({
    pin: z
        .string()
        .min(8, { message: "OTP must be exactly 8 characters." })
});

export function InputOTPForm() {
    const [pin, setPin] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleChange = (value: string) => {
        setPin(value);
        if (error && value.length === 6) setError(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = otpSchema.safeParse({ pin });

        if (!result.success) {
            setError(result.error.format().pin?._errors?.[0] || "Invalid OTP");
            return;
        }

        setError(null);
        console.log("Submitted OTP:", result.data.pin);
        alert(`OTP Submitted: ${result.data.pin}`);
    };

    return (
        <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
            
            <div className="flex flex-col space-y-2">
                <label className="font-medium text-sm">One-Time Password</label>
                <InputOTP maxLength={6} value={pin} onChange={handleChange}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                    </InputOTPGroup>
                </InputOTP>
                <p className="text-muted-foreground text-sm">
                    Please enter the one-time password sent to your phone.
                </p>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <button type="submit" className="btn btn-sm btn-primary">Submit</button>
        </form>
    );
}
