"use client"
import SideBar from "@/components/sidebar/sidebar";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-row">
      <SideBar/>

      <div className="bg-zinc-100 dark:bg-zinc-900 min-h-screen w-full flex justify-center items-center">
      </div>
    </main>
  );
}
 