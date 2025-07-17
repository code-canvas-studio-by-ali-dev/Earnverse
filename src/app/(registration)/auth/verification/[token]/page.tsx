import { InputOTPForm } from "@/components/layouts/otpVerification";
import AdPlaceholder from "@/components/ui/AdPlaceholder";
import Logo from "@/components/ui/Logo";

export default async function Page(
    { params }: { params: Promise<{ token: string }> }
) {
    const { token } = await params;
    return (
        <section className="flex flex-col items-center h-screen w-full p-4 sm:p-6 md:p-8 overflow-auto">
            <header className="w-full max-w-2xl flex justify-start py-4">
                <Logo text={true} className="[&>*]:first:text-xl sm:[&>*]:first:text-2xl text-base gap-2" />
            </header>
            <div className="h-24 w-full max-w-2xl my-10">
                <AdPlaceholder />
            </div>
            <main className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl gap-6 my-10">
                <div className="w-full md:w-2/3">
                    <InputOTPForm token={token} />
                </div>
                <div className="hidden md:flex flex-1 flex-col gap-5 h-full w-1/3">
                    <div className="flex-1 size-full">
                        <AdPlaceholder />
                    </div>
                    <div className="flex-1 size-full">
                        <AdPlaceholder />
                    </div>
                </div>
            </main>
            <footer className="w-full max-w-2xl flex justify-center my-4">
                <div className="h-24 w-full">
                    <AdPlaceholder />
                </div>
            </footer>
        </section>
    );
}