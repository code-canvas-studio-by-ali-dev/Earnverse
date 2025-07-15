import Sidebar from "@/components/layouts/Sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <section className="flex h-screen overflow-hidden">
            <aside>
                <Sidebar />
            </aside>
            <main className="flex-1 overflow-y-auto">
                <div>
                    {children}
                </div>
            </main>
        </section>
    );
}