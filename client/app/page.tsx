import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen  p-24">
      <ModeToggle/>  
      <div></div>
    </main>
  );
}
