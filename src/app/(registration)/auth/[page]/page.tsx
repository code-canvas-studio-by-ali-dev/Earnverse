import React from "react";
import Logo from "@/components/ui/Logo";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Advertisment from "@/components/advertisment";
import Form from "@/components/Form";
import { Metadata } from "next";
import Script from "next/script";

interface AuthProps {
    params: {
        page: "login" | "signup"
    }
}

// meta tags
export async function generateMetadata({ params }: Readonly<AuthProps>): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const { page } = await params;

    const isLogin = page === "login";

    return {
        title: isLogin ? "Login to EarnVerse" : "Join EarnVerse - Start Earning Today!",
        description: isLogin
            ? "Access your EarnVerse account and manage your earnings securely."
            : "Sign up to EarnVerse and begin your journey to earning online through trusted methods and smart strategies.",
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `${baseUrl}/auth/${page}`,
        },
        openGraph: {
            title: isLogin ? "EarnVerse Login" : "EarnVerse - Join and Start Earning",
            description: isLogin
                ? "Login to access your EarnVerse dashboard and earning opportunities."
                : "Create your EarnVerse account and get access to daily earning opportunities.",
            url: `${baseUrl}/auth/${page}`,
            type: "website",
        },
    };
}

const SignupPage = async (
    { params }: Readonly<AuthProps>
) => {
    const { page } = await params

    return (
        <main>
            <Script id="auth-schema" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": page === "login" ? "Login | EarnVerse" : "Sign Up | EarnVerse",
                    "url": `${process.env.NEXT_PUBLIC_BASE_URL}/auth/${page}`,
                    "description": page === "login"
                        ? "Login to EarnVerse to manage your earnings and access your dashboard."
                        : "Join EarnVerse and start earning money online easily. Safe, secure, and trusted.",
                    "potentialAction": {
                        "@type": page === "login" ? "LoginAction" : "RegisterAction",
                        "target": `${process.env.NEXT_PUBLIC_BASE_URL}/auth/${page}`,
                    },
                })}
            </Script>

            <div className="flex h-screen px-20 pt-20 pb-10 gap-20">
                <div className="flex flex-1 flex-col justify-start items-center w-full gap-5 max-w-lg px-10">
                    <div className="flex flex-col justify-start w-full">
                        <Logo text={true} className="[&>*]:first:text-3xl text-lg gap-3" />
                        <h1 className="text-2xl font-semibold">{page === "login" ? "Login" : "Create a new account"}</h1>
                    </div>
                    <Form type={page} />

                    <Link href={`/auth/${page === "login" ? "signup" : "login"}`} className="flex flex-col justify-end items-end mt-3 w-full border-2 border-accent p-5 bg-base-200 hover:bg-base-100 rounded-xl">
                        <div className=" space-y-1 w-full">
                            <p className="font-medium">{page === "login" ? "Need an account?" : "Already have an account?"}</p>
                            <p className="text-sm">{page === "login" ? "Sign up to start earning today" : "Log in instead"}</p>
                        </div>
                        <FaArrowRight className="text-end text-xl" />
                    </Link>

                </div>

                {/* hero section */}
                <div className="relative hidden md:flex flex-1 items-center justify-center bg-base-100 rounded-2xl w-[500px] h-full overflow-hidden">
                    <Image
                        src="/money.webp"
                        width={500}
                        height={650}
                        alt="Registration"
                        className="w-full h-full object-cover"
                        priority={false}
                    />

                    <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

                    <div className="absolute bottom-6 z-20 text-white text-center w-full px-4">
                        <h2 className="text-2xl font-bold">Earn Money Easily</h2>
                        <p className="text-sm">Join now and turn your time into rewards!</p>
                    </div>
                </div>
            </div>

            <Advertisment />
        </main>
    );
};

export default SignupPage;