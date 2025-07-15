import clsx from "clsx";
import { Revalia } from "next/font/google";
import { BiSolidBadgeDollar } from "react-icons/bi";

const RevaliaFont = Revalia({
    subsets: ["latin"],
    weight: "400",
});

interface LogoProps {
    className?: string;
    text: boolean
}

const Logo = ({ className, text = false }: LogoProps) => {
    return (
        <div className={`flex justify-start items-center h-14 text-base-content ${RevaliaFont.className} antialiased ${className}`}>
            <BiSolidBadgeDollar className="text-inherit" />
            <span className={clsx("font-['Revalia'] text-inherit", { "block": text, "hidden": !text })}>Earnverse</span>
        </div>
    );
};

export default Logo;
