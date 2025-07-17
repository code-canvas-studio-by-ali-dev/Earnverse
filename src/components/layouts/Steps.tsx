"use client";

import { stepOneSchema } from "@/utils/zod/auth";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { z } from "zod";
import { FiCopy } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";
import { useStore } from "@/store/authStore";
import { toast } from "sonner";
import { UAParser } from 'ua-parser-js';
import axios from "axios";
import * as FingerprintJS from '@fingerprintjs/fingerprintjs';
import AdPlaceholder from "../ui/AdPlaceholder";

// Define JWTDecode interface based on your token structure
interface JWTDecode {
    userId: string; // Assuming userId is a string UUID
    // Add other properties if your JWT has them, e.g., email: string;
}

function generateUsername({ firstName, lastName, id, totalUsers }: { firstName: string; lastName: string, id: string, totalUsers: number }) {
    const cleanFirst = firstName.trim().toLowerCase().replace(/\s+/g, "");
    const cleanLast = lastName.trim().toLowerCase().replace(/\s+/g, "");
    // Using index [4] as discussed, assuming standard UUID format for the last segment
    const userIdLastPart = id.split("-")[4];

    if (!userIdLastPart) {
        console.warn("Invalid UUID format: Could not extract last part for username generation.");
        return `user_invalid_id_${cleanFirst}_${cleanLast}_${totalUsers}`;
    }

    // Returning a shorter version of the UUID part for brevity in username
    return `user_${userIdLastPart.substring(0, 4)}_${cleanFirst}_${cleanLast}_${totalUsers}`;
}

type StepOneData = z.infer<typeof stepOneSchema>;

export function Steps({
    type,
}: {
    type: "step-one" | "step-two";
}) {
    const [data, setData] = useState<StepOneData>({
        firstName: "",
        lastName: "",
    });
    const [username, setUsername] = useState<string>("");
    const [subStep, setSubStep] = useState<1 | 2 | 3>(1);
    const [errors, setErrors] = useState<Partial<Record<keyof StepOneData, string>>>({});
    const [loadingUsername, setLoadingUsername] = useState(false);
    const [loadingSync, setLoadingSync] = useState(false);
    const [uaData, setUaData] = useState<object>({});
    const [ipData, setIpData] = useState<object>({});
    const [id, setId] = useState<string>("");
    const [visitorId, setVisitorId] = useState<string | null>(null);
    const { token } = useStore(); // Access token
    const router = useRouter();

    useEffect(() => {
        const getFingerprint = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            const id = result.visitorId;
            setVisitorId(id);
        };
        getFingerprint();
    }, [])

    useEffect(() => {
        const stored = localStorage.getItem("data");
        if (stored) {
            const parsed: StepOneData = JSON.parse(stored);
            setData(parsed);
        }
    }, []);

    const handleCopy = async (value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            toast.success("Username copied to clipboard!");
        } catch (err) {
            console.error("Copy failed:", err);
            toast.error("Failed to copy username.");
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
            localStorage.setItem("data", JSON.stringify(parsed.data));
            setErrors({});
            router.push("/auth/profile/step-two");
        }
    };

    useEffect(() => {
        const initiateStepTwo = async () => {
            if (type === "step-two") {
                // Ensure data from localStorage is loaded before proceeding
                if (!data.firstName || !data.lastName) {
                    console.warn("User data not fully loaded for step two");
                    return;
                }

                if (token === null) {
                    console.warn("Authentication token not available. Redirecting.");
                    return;
                }

                try {
                    // --- Step 1: Generate Username ---
                    setLoadingUsername(true);
                    setSubStep(1); // Set current step for stepper visual

                    // Simulate username generation delay (e.g., fetching totalUsers, some computation)
                    await new Promise(resolve => setTimeout(resolve, 2000)); // Delay for "Generating username..."

                    const decodeToken = jwtDecode<JWTDecode>(token);
                    setId(decodeToken.userId)
                    // Ensure this API route exists and returns an object with a 'length' property
                    const totalUsersResponse = await axios.get("/api/v1/auth/total-users");
                    const generated = generateUsername({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        id: decodeToken.userId as string,
                        totalUsers: totalUsersResponse.data.length
                    });
                    setUsername(generated);

                    // Pause briefly after username is generated to show it
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Short pause to show generated username

                    setLoadingUsername(false); // Username generated, hide its loader

                    // --- Step 2: Sync Data (IP & UA fetching) ---
                    if (generated) { // Ensure username is truly generated before syncing
                        setLoadingSync(true); // Start syncing loader
                        setSubStep(2); // Move to next step (Sync Data)

                        // Fetch User Agent data (client-side)
                        const ua = navigator.userAgent;
                        const parsedUaData = UAParser(ua);
                        setUaData(parsedUaData);

                        // Fetch Public IP Address
                        const ipAddressResponse = await axios.get("https://api.ipify.org/");
                        const publicIp = ipAddressResponse.data;

                        // Fetch IP Geolocation data
                        const ipapiResponse = await axios.get(`https://ipapi.co/${publicIp}/json/`);
                        setIpData(ipapiResponse.data);

                        // Simulate processing/syncing delay after fetching IP/UA
                        await new Promise(resolve => setTimeout(resolve, 3000)); // Delay for "Syncing profile data..."

                        setLoadingSync(false); // Syncing done, hide its loader
                        setSubStep(3); // Move to final step (Done)
                        toast.success("Profile data synced successfully!");

                        // Log final collected data (for debugging/verification)
                        console.log("Profile setup process complete!");
                        console.log("Generated Username:", generated);
                        console.log("User First Name:", data.firstName);
                        console.log("User Last Name:", data.lastName);
                        console.log("User Agent Data:", parsedUaData);
                        console.log("IP Geolocation Data:", ipapiResponse.data);
                    }

                } catch (err) {
                    console.error("Step two failed:", err);
                    toast.error("Failed to process step two. Please try again.");
                    // Reset states on error to allow retry or show appropriate message
                    setLoadingUsername(false);
                    setLoadingSync(false);
                    setUsername(""); // Clear username on error
                    setSubStep(1); // Reset to first step
                }
            }
        };

        // This ensures the effect only runs if 'type' is 'step-two' and 'data' (first/last name) is available
        // and 'token' is available. The effect cleans up if component unmounts.
        if (type === "step-two" && data.firstName && data.lastName && token) {
            initiateStepTwo();
        } else if (type === "step-two" && (!data.firstName || !data.lastName)) {
            // Redirect immediately if data isn't there for step two
        } else if (type === "step-two" && !token) {
            // Redirect immediately if token isn't there
            return
        }

    }, [type, data, router, token]); // Dependencies for useEffect

    const handleFinish = async () => {
        try {
            // Send all collected data to your backend for final profile setup
            await axios.post(`/api/v1/auth/profile-setup/${id}`, {
                visitorId: visitorId,
                username: username,
                firstName: data.firstName,
                lastName: data.lastName,
                uaData: uaData, // User Agent data
                ipData: ipData, // IP Geolocation data
            });
            toast.success("Profile setup complete! Welcome!");
            router.push("/auth/login"); // Redirect to login or dashboard
        } catch (err) {
            console.error("Profile setup finalization failed:", err);
            toast.error("Failed to complete profile setup.");
        }
    };

    return (
        <Fragment>
            {type === "step-one" && (
                <form
                    onSubmit={handleStepOne}
                    className="flex flex-col items-center justify-around size-full space-y-4"
                >
                    <h1 className="text-xl md:text-2xl font-medium">Complete Profile - Step One</h1>
                    <div className="w-full space-y-3">
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
                    </div>
                    <div className="md:hidden w-full h-28">
                        <AdPlaceholder />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Next Step
                    </button>
                    <div className="md:hidden w-full h-28">
                        <AdPlaceholder />
                    </div>
                </form>
            )}
            {type === "step-two" && (
                <div className="flex flex-col items-center gap-10">
                    <ul className="steps w-full max-w-sm mb-4">
                        <li className={`step ${subStep >= 1 ? "step-primary" : ""}`}></li>
                        <li className={`step ${subStep >= 2 ? "step-primary" : ""}`}></li>
                        <li className={`step ${subStep >= 3 ? "step-primary" : ""}`}></li>
                    </ul>
                    <div className="w-full max-w-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Generated Username</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="input w-full p-2 border border-gray-600 rounded pr-10"
                                    value={username}
                                    readOnly
                                    disabled={loadingUsername || loadingSync}
                                    placeholder={loadingUsername ? "Generating username..." : loadingSync ? "Syncing data..." : ""}
                                />
                                {loadingUsername || loadingSync ? (
                                    <span className="loading loading-spinner loading-xs absolute top-1/2 right-3 transform -translate-y-1/2"></span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleCopy(username)}
                                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        title="Copy Username"
                                        disabled={!username}
                                    >
                                        <FiCopy size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="md:hidden w-full h-28">
                            <AdPlaceholder />
                        </div>
                        <div className="text-center">
                            {loadingSync ? (
                                <button className="btn btn-outline w-full p-2" disabled>
                                    Syncing profile data...
                                </button>
                            ) : subStep === 3 ? (
                                <button className="btn w-full btn-primary" onClick={handleFinish}>
                                    Finish
                                </button>
                            ) : (
                                <button className="btn btn-outline w-full p-2" disabled>
                                    {loadingUsername ? "Generating username..." : "Username generated."}
                                </button>
                            )}
                        </div>
                        <div className="md:hidden w-full h-28">
                            <AdPlaceholder />
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}