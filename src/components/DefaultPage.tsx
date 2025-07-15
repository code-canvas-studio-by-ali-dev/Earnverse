"use client"

import { Fragment } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import AdPlaceholder from "./ui/AdPlaceholder";
import PageStyle from "@/components/layouts/PageStyle";
import { useStore } from "@/store/dashboardStore";

export default function DefaultPage() {
    const { currentPage } = useStore()

    return (
        <Fragment>
            <header>
                <Navbar />
            </header>
            <section>
                <main className="space-y-10 p-8">
                    <div className="w-full h-28">
                        <AdPlaceholder />
                    </div>
                    <div>
                        <PageStyle page={currentPage} />
                    </div>
                    <div className="w-full h-28">
                        <AdPlaceholder />
                    </div>
                </main>
                <Footer />
            </section>
        </Fragment>
    )
}