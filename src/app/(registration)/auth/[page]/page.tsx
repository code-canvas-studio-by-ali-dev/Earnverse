import React from "react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import Form from "@/components/Form";
import { Metadata } from "next";
import Script from "next/script";
import AdPlaceholder from "@/components/ui/AdPlaceholder";

// meta tags
export async function generateMetadata({ params }: { params: Promise<{ page: "signup" | "login" }> }): Promise<Metadata> {
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

const page = async (
    { params }: { params: Promise<{ page: "signup" | "login" }> }
) => {
    const { page } = await params;

    return (
        <main>
            {/* scripting for SEO */}
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

            <div className="flex flex-col md:flex-row h-screen px-4 s m:px-8 md:px-12 lg:px-20 pt-10 md:pt-20 pb-5 md:pb-10 gap-4 md:gap-8 lg:gap-20 overflow-auto">
                <div className="flex-1 flex flex-col justify-start items-center w-full gap-5 max-w-lg px-4 sm:px-6 md:px-10 md:[&>*]:even:hidden">
                    <div className="flex flex-col justify-start w-full">
                        <Logo text={true} className="[&>*]:first:text-2xl md:[&>*]:first:text-3xl text-base md:text-lg gap-3" />
                        <h1 className="text-xl md:text-2xl font-semibold">{page === "login" ? "Login" : "Create a new account"}</h1>
                    </div>
                    <AdPlaceholder />

                    {/* signup login form */}
                    <Form type={page} />

                    <AdPlaceholder />

                    {/* signup login navigation link */}
                    <Link href={`/auth/${page === "login" ? "signup" : "login"}`} className="flex flex-col justify-end items-end mt-3 w-full border-2 border-accent p-5 bg-base-200 hover:bg-base-100 rounded-xl">
                        <div className="space-y-1 w-full">
                            <p className="font-medium">{page === "login" ? "Need an account?" : "Already have an account?"}</p>
                            <p className="text-sm">{page === "login" ? "Sign up to start earning today" : "Log in instead"}</p>
                        </div>
                        <FaArrowRight className="text-end text-xl" />
                    </Link>

                    <AdPlaceholder />

                </div>

                {/* hero section */}
                <div className="relative hidden flex-1 md:grid grid-cols-3 gap-3 bg-base-100 rounded-2xl h-full w-[500px] overflow-hidden p-5">
                    <AdPlaceholder />
                    <AdPlaceholder />
                    <AdPlaceholder />
                    <AdPlaceholder />
                    <AdPlaceholder />
                    <AdPlaceholder />
                    <AdPlaceholder />
                    <AdPlaceholder />
                    <AdPlaceholder />
                    <div className="absolute top-0 left-0 bg-radial-[at_25%_25%] from-transparent to-zinc-800 to-75% size-full"></div>
                </div>
            </div>
        </main>
    );
};

export default page;