import { InputOTPForm } from "@/components/layouts/otpVerification";
import AdPlaceholder from "@/components/ui/AdPlaceholder";
import Logo from "@/components/ui/Logo";

export default function Page() {
    return (
        <section className="flex flex-col gap-10 h-screen w-screen overflow-hidden p-10">
            <header className="flex-none">
                <Logo text={true} className="[&>*]:first:text-2xl text-xl gap-3" />
            </header>
            <div className="flex-none w-full h-[120px]">
                <AdPlaceholder />
            </div>
            <main className="flex flex-1 size-full gap-10 [&>*]:bg-base-100 [&>*]:rounded-2xl [&>*]:p-10">
                <div className="flex flex-1 w-full gap-10">
                    <InputOTPForm />
                    <div className="w-5/12">
                        <AdPlaceholder />
                    </div>
                </div>
                <div className="flex-none w-4/11 h-full">
                    <AdPlaceholder />
                </div>
            </main>
            <div className="flex-none w-full h-[120px]">
                <AdPlaceholder />
            </div>
        </section>
    )
}