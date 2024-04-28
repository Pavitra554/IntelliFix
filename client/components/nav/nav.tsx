import Image from "next/image";
import { ModeToggle } from "../theme-toggle";

export default function NavBar(){
    return(
        <nav className="max-w-4xl w-full mx-auto border-b flex flex-row justify-between items-center p-2 py-4">
            <div className="flex flex-row gap-1.5 md:text-xl font-bold tracking-wide ">
                <Image src={'/logo.svg'} height={25} width={25} alt="Logo"/>
                <div>IntelliFix</div>
            </div>
            <ModeToggle />
        </nav>
    )
}