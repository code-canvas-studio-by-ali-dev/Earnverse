import Logo from "@/components/ui/Logo";

export default function Footer() {
    return (
        <footer className="flex flex-col justify-center items-center gap-14 bg-base-300 p-14">
            <main className="footer sm:footer-horizontal text-base-content">
                <aside className="flex flex-col justify-start items-start gap-5">
                    <Logo text={true} className="text-5xl gap-5 [&>span]:pb-1" />
                    <p>Hello User! Thanks for using EarnVerse. Please share your experience with us.</p>
                    <button className="btn btn-sm btn-primary">Feedback</button>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </main>
            <p>Copyright © {new Date().getFullYear()} - All right reserved by AliKodex.Log</p>
        </footer>
    )
}