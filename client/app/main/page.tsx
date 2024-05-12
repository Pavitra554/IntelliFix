"use client"
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full p-4 flex justify-center items-center">
      <button onClick={()=>signOut({ callbackUrl: '/', redirect:true })}>Log Out</button>
    </main>
  );
}
 