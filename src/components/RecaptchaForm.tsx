"use client";

import { useReCaptcha } from "next-recaptcha-v3";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { setCookie } from "cookies-next";

interface VerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  action?: string;
}

export default function MyForm() {
  const { executeRecaptcha } = useReCaptcha();
  const [message, setMessage] = useState<React.ReactNode>(
    "Preparing verification..."
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleVerification = useCallback(async () => {
    if (!executeRecaptcha) {
      setMessage(
        <>
          <RxCrossCircled className="inline-block mr-2 text-2xl mb-1" />
          Verification failed. Please try again.
        </>
      );
      setIsLoading(false);
      setTimeout(() => router.push("/access-denied"), 3000);
      return;
    }

    try {
      const token = await executeRecaptcha("auto_verify");

      setMessage("Verifying your identity...");

      const { data }: { data: VerifyResponse } = await axios.post(
        "/api/verify-human",
        { token }
      );

      if (data.success) {
        // ✅ Verified successfully
        setMessage(
          <>
            <FaRegCheckCircle className="inline-block mr-2 text-2xl mb-1" />
            You are verified as human!
          </>
        );
        setCookie("verify", "_human", {
          path: "/",
          priority: "high",
          expires: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
        });

        setTimeout(() => router.push("/"), 3000);
      } else {
        // ❌ Failed recaptcha test (bot)
        setMessage(
          <>
            <RxCrossCircled className="inline-block mr-2 text-2xl mb-1" />
            Verification failed. Please try again.
          </>
        );
        setCookie("verify", "_bot", {
          path: "/",
          priority: "high",
          expires: new Date(Date.now() + 2 * 60 * 1000),
        });

        setTimeout(() => router.push("/"), 3000);
      }
    } catch (error) {
      // ❌ API or network error
      setMessage(
        <>
          <RxCrossCircled className="inline-block mr-2 text-2xl mb-1" />
          An error occurred during verification.
        </>
      );
      setTimeout(() => router.push("/access-denied"), 3000);
    } finally {
      setIsLoading(false);
    }
  }, [executeRecaptcha, router]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      handleVerification();
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [handleVerification]);

  return (
    <div className="flex items-center gap-3 p-4">
      {isLoading && (
        <span className="loading loading-spinner loading-xl"></span>
      )}
      <p className="text-sm sm:text-base md:text-lg text-gray-300">{message}</p>
    </div>
  );
}
