import ProductLogo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NavBar from "@/components/nav/nav";

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar/>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <ProductLogo size={60} />
              <div className="mx-auto max-w-4xl w-full text-gray-500 md:text-xl dark:text-gray-400">
                Welcome to IntelliFix, Harnessing the combined might of OpenAI and
                LangChain, we offer seamless error fixing, Ai powered code debugging
                and optimization. IntelliFix is a platform where every line of code
                finds perfection.
              </div>
            </div>
            <div className="flex flex-row items-center space-x-4">
              <Button asChild className="shadow-md">
                <Link href="/main">Start Debugging</Link>
              </Button>
              
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
