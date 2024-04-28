import Image from "next/image";

type Props = {
    size:number
}
export default function ProductLogo ({size}:Props) {
    return (
        <div className="flex flex-row items-center justify-center gap-2">
            <Image src={'/logo.svg'} height={size} width={size} alt="Logo"/>
            <div className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                IntelliFix
            </div>
        </div>
    )
}