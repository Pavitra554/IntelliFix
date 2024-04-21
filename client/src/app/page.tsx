import Image from "next/image";
import ProductLogo from "@/components/logo/productLogo";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <main className='h-screen md:h-full flex flex-col items-center p-2'>
      <div className='max-w-full md:max-w-4xl w-full flex flex-col items-center mt-10 md:mt-20'>
        <div className='md:hidden'>
          <ProductLogo logosize={40} textSize='text-3xl' />
        </div>
        <div className='hidden md:flex'>
          <ProductLogo logosize={60} textSize='text-5xl' />
        </div>
        <div className='text-3xl md:text-5xl font-bold text-zinc-50 text-center mt-6 md:mt-8'>
          Debug and <span className='text-violet-800'>Fix</span> your code using
          <span className='text-violet-800'> Ai</span>
        </div>
        <div className='text-sm md:text-lg font-medium mt-2 md:mt-4 text-center text-zinc-500'>
          Welcome to IntelliFix, Harnessing the combined might of OpenAI and
          LangChain, we offer seamless error fixing, Ai powered code debugging
          and optimization. IntelliFix is a platform where every line of code
          finds perfection.
        </div>
        <Button
          radius='lg'
          className='w-52 bg-gradient-to-b from-violet-500 to-violet-950 text-zinc-50 font-bold text-lg shadow-lg mt-4'
        >
          Try Now
        </Button>
      </div>
      <div className='max-w-full md:max-w-6xl w-full'>
        <Image
          src={"/mac.png"}
          alt=''
          className='h-full w-full'
          width={700}
          height={700}
        />
      </div>
    </main>
  );
}
