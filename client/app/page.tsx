import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SiGithub } from 'react-icons/si';
import NavBar from '@/components/nav/nav';

export default function Home() {
  return (
    <main className="min-h-screen p-4 pt-0">
      <NavBar />
      <section className="w-full py-20">
        <div className="max-w-3xl mx-auto w-full flex flex-col items-start space-y-8">
          <Image
            src={'/logo.svg'}
            height={80}
            width={80}
            alt="Logo"
            className="drop-shadow-xl"
          />
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-1">
              <div className="text-xl md:text-4xl font-extrabold">
                Where Precision Meets Code.
              </div>
              <div className=" md:text-2xl font-bold text-zinc-950/40 dark:text-white/40">
                IntelliFix, an Ai Powered Debugging and Optimization Tool.
              </div>
              <div className="md:text-2xl font-bold text-zinc-950/40 dark:text-white/40">
                Experience Seamless Debugging Today!
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Button asChild className="shadow-md font-semibold">
                <Link href="/main">Start Debugging</Link>
              </Button>
              <button className="flex flex-row gap-2 items-center p-2 border rounded-lg dark:hover:bg-zinc-800 hover:bg-zinc-100 ease-linear duration-100">
                <SiGithub className="h-6 w-6" />
                <div>Open Source</div>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto relative my-10">
        <div className="absolute h-full opacity-30 w-full bg-gradient-to-r from-indigo-700 to-purple-700 blur-3xl animate-pulse duration-2000"></div>
        <div className="relative dark:bg-black bg-white w-full h-[70vh] border flex justify-center items-center rounded-lg text-xl font-bold">
          Platform image / demo video will be added here 🚀
        </div>
      </section>
      <section>
        <div className="text-center pt-16 dark:text-zinc-700 text-zinc-400">
          Copyright © 2024 IntelliFix Inc. All rights reserved.
        </div>
      </section>
    </main>
  );
}
