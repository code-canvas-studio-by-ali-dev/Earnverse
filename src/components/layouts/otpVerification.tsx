"use client";

import { useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { otpSchema } from "@/utils/zod/auth";
import AdPlaceholder from "../ui/AdPlaceholder";

export function InputOTPForm({ token }: { token: string }) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isResetting, setIsResetting] = useState(false);

    const router = useRouter();

    const handleChange = (value: string) => {
        setPin(value);
        if (error && value.length === 6) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const tokenData = jwtDecode<JWTDecode>(token);

        const secretCode = Number(pin);
        const result = otpSchema.safeParse({ secretCode });

        if (!result.success) {
            const pinErrors = result.error.format();
            setError(pinErrors.secretCode?._errors?.[0] ?? "Invalid OTP.");
            return;
        }

        try {
            const validatedPin = result.data.secretCode;

            const response = await axios.post(
                `/api/v1/auth/verification/${tokenData?.userId}`,
                { secretCode: Number(validatedPin) }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                router.push("/auth/profile/step-one");
            } else {
                toast.error(response.data.message);
            }
        } catch (err: unknown) {
            let msg = "Something went wrong";

            if (axios.isAxiosError(err) && err.response?.data?.message) {
                msg = err.response.data.message;
                if (msg === "Invalid verification code") {
                    toast.error(msg);
                } else {
                    toast(msg, {
                        action: {
                            label: "Reset OTP",
                            onClick: async () => {
                                if (isResetting) return;
                                setIsResetting(true);

                                const myPromise = axios
                                    .post("/api/v1/auth/reset-code", { id: tokenData.userId })
                                    .then((res) => {
                                        setIsResetting(false);
                                        return { name: res.data.message };
                                    })
                                    .catch((error) => {
                                        setIsResetting(false);
                                        let errorMessage = "Something went wrong";
                                        if (
                                            axios.isAxiosError(error) &&
                                            error.response?.data?.message
                                        ) {
                                            errorMessage = error.response.data.message;
                                        } else if (error instanceof Error) {
                                            errorMessage = error.message;
                                        }
                                        throw new Error(errorMessage);
                                    });

                                toast.promise(myPromise, {
                                    loading: "Wait a sec, we're working on it...",
                                    success: (data: { name: string }) => data.name,
                                    error: (error: Error) => error.message,
                                });
                            },
                        },
                    });
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-base-100 rounded-xl shadow-lg">
            <div className="space-y-3">
                <label className="block text-lg font-semibold text-base-content">One-Time Password</label>
                <InputOTP maxLength={6} value={pin} onChange={handleChange} className="w-full">
                    <InputOTPGroup className="justify-center gap-2">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <InputOTPSlot key={index} index={index} className="w-12 h-12 text-center text-2xl border-2 border-gray-600 rounded-md bg-gray-700 text-white focus:border-yellow-400" />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
                <p className="text-sm text-gray-400">
                    Please enter the one-time password sent to your phone.
                </p>
                {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
            <div className="block md:hidden h-20 w-full">
            <AdPlaceholder />
            </div>
            <button type="submit" className="w-full btn btn-primary">
                Submit
            </button>
        </form>
    );
}