import AdPlaceholder from "@/components/ui/AdPlaceholder"
import Logo from "@/components/ui/Logo"
import { ReactNode } from "react"

export default function Layout(
    { children }: Readonly<{
        children: ReactNode
    }>
) {
    return (
        <div className="flex flex-col gap-10 h-screen w-screen overflow-hidden not-first:px-20">
            <header className="p-6">
                <Logo text={true} className="[&>*]:first:text-2xl text-xl gap-3" />
            </header>
            <div className="w-full h-[100px]">
                <AdPlaceholder />
            </div>
            <section className="flex flex-1 gap-10">
                <div className="flex flex-col flex-1 size-full gap-5 pb-10">
                    <AdPlaceholder />
                    <AdPlaceholder />
                </div>
                <main className="flex-1 size-full bg-base-100 rounded-t-2xl p-10">{children}</main>
                <div className="flex flex-col flex-1 size-full gap-5 pb-10">
                    <AdPlaceholder />
                    <AdPlaceholder />
                </div>
            </section>
        </div>
    )
}