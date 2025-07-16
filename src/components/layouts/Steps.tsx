"use client";

import { stepOneSchema } from "@/utils/zod/auth";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { z } from "zod";
import { FiCopy } from "react-icons/fi";

type StepOneData = z.infer<typeof stepOneSchema>;

function generateUsername({ firstName, lastName }: { firstName: string; lastName: string }) {
    const fallbackNumber = "8824";
    const cleanFirst = firstName.trim().toLowerCase().replace(/\s+/g, "");
    const cleanLast = lastName.trim().toLowerCase().replace(/\s+/g, "");
    const randomDigit = Math.floor(Math.random() * 10);
    return `user_${fallbackNumber}_${cleanFirst}_${cleanLast}_${randomDigit}_1`;
}

export function Steps({
    type,
}: {
    type: "step-one" | "step-two";
}) {
    const [data, setData] = useState<StepOneData>({
        firstName: "Ali",
        lastName: "Sulman",
    });

    const [username, setUsername] = useState<string>("");
    const [subStep, setSubStep] = useState<1 | 2 | 3>(1); // 1: generate, 2: fetch, 3: done
    const [errors, setErrors] = useState<
        Partial<Record<keyof StepOneData, string>>
    >({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCopy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    const handleStepOne = (e: React.FormEvent) => {
        e.preventDefault();
        const parsed = stepOneSchema.safeParse(data);

        if (!parsed.success) {
            const fieldErrors: typeof errors = {};
            parsed.error?.issues.forEach((err) => {
                const field = err.path[0] as keyof StepOneData;
                fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
        } else {
            console.log("Step One Data:", parsed.data);
            setErrors({});
            router.push("/auth/profile/step-two");
        }
    };

    // Auto-run steps when type === step-two
    useEffect(() => {
        if (type === "step-two") {
            const generated = generateUsername(data);
            setUsername(generated);
            setSubStep(2); // Move to next step after username generation

            setLoading(true);
            setTimeout(() => {
                // Simulate data fetch
                setLoading(false);
                setSubStep(3); // Done
            }, 2000);
        }
    }, [type, data]);

    return (
        <Fragment>
            {type === "step-one" && (
                <form
                    onSubmit={handleStepOne}
                    className="flex flex-col items-center justify-around size-full space-y-4"
                >
                    <h1 className="text-2xl font-medium">Complete Profile - Step One</h1>

                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend">First Name</legend>
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="Type here"
                            value={data.firstName}
                            onChange={(e) =>
                                setData({ ...data, firstName: e.target.value })
                            }
                        />
                        {errors.firstName && (
                            <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                        )}
                    </fieldset>

                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend">Last Name</legend>
                        <input
                            type="text"
                            className="input w-full"
                            placeholder="Type here"
                            value={data.lastName}
                            onChange={(e) =>
                                setData({ ...data, lastName: e.target.value })
                            }
                        />
                        {errors.lastName && (
                            <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                        )}
                    </fieldset>

                    <button type="submit" className="btn btn-primary w-full">
                        Next Step
                    </button>
                </form>
            )}

            {type === "step-two" && (
                <div className="w-full space-y-6">
                    {/* DaisyUI Stepper */}
                    <ul className="steps w-full">
                        <li className={`step ${subStep >= 1 ? "step-primary" : ""}`}>
                            Username
                        </li>
                        <li className={`step ${subStep >= 2 ? "step-primary" : ""}`}>
                            Sync Data
                        </li>
                        <li className={`step ${subStep >= 3 ? "step-primary" : ""}`}>
                            Done
                        </li>
                    </ul>

                    {/* Step 1: Username Display */}
                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend">Generated Username</legend>
                        <div className="relative">
                            <input
                                type="text"
                                className="input w-full pr-10"
                                value={username}
                                disabled
                            />
                            <button
                                type="button"
                                onClick={() => handleCopy(username)}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                title="Copy Username"
                            >
                                <FiCopy size={18} />
                            </button>
                        </div>
                    </fieldset>

                    {/* Loading or Finish */}
                    {subStep < 3 ? (
                        <div className="w-full">
                            <button
                                className="btn btn-outline btn-block loading"
                                disabled
                            >
                                {loading ? "Fetching profile data..." : "Preparing..."}
                            </button>
                        </div>
                    ) : (
                        <button className="btn btn-primary btn-block">Finish</button>
                    )}
                </div>
            )}
        </Fragment>
    );
}
