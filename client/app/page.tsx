import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/nav/nav";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <NavBar />
      <section className="w-full py-20">
        <div className="max-w-3xl mx-auto w-full flex flex-col items-start space-y-12">
          <Image src={'/logo.svg'} height={80} width={80} alt="Logo" className="drop-shadow-xl" />
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-1">
              <div className="text-xl md:text-4xl font-bold">Where Precision Meets Code.</div>
              <div className=" md:text-2xl font-bold text-zinc-950/40 dark:text-white/40">IntelliFix, an Ai Powered Debugging and Optimization Tool.</div>
              <div className="md:text-2xl font-bold text-zinc-950/40 dark:text-white/40">Experience Seamless Debugging Today!</div>
            </div>
            <div>
              <Button asChild className="shadow-md">
                <Link href="/main">Start Debugging</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto">
        <div className="w-full h-96 border flex justify-center items-center rounded-lg">platform image</div>
      </section>
    </main>
  );
}
