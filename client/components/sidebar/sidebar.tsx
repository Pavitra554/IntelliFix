"use client"
import Image from "next/image"
import { ModeToggle } from "../theme-toggle"
import { Button } from "../ui/button"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Bug, Mail, RefreshCcw, Terminal } from "lucide-react"
import React from "react"
export default function SideBar() {
    const[ mode ,setMode] = React.useState("debugger")
    const { data: session } = useSession()
    return (
        <section className="flex max-w-72 w-full flex-col justify-between border-r p-3">
            <div>
                <button className="flex flex-row items-center gap-3 w-full border rounded-lg p-3 hover:bg-zinc-950 hover:text-white dark:hover:bg-zinc-800 ease-linear duration-100 ">
                    <Image src={'/logo.svg'} height={25} width={25} alt="Logo" className="drop-shadow-xl" />
                    <div className="font-semibold ">New Prompt </div>
                </button>
                <div className="border-b my-3"></div>
                <div className="w-full flex flex-col gap-3">
                <Button onClick={()=>setMode("debugger")} className={`flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-950 hover:text-white ${mode==="debugger" && 'bg-zinc-950 text-white dark:bg-zinc-800'}`} variant="outline">
                    <Bug className="mr-2 h-4 w-4" /> Code Debugger
                </Button>
                <Button onClick={()=>setMode("optimizer")} className={`flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-950 hover:text-white ${mode==="optimizer" && 'bg-zinc-950 text-white dark:bg-zinc-800'}`} variant="outline">
                    <Terminal className="mr-2 h-4 w-4" /> Code Optimizer 
                </Button>
                <Button onClick={()=>setMode("converter")} className={`flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-950 hover:text-white ${mode==="converter" && 'bg-zinc-950 text-white dark:bg-zinc-800'}`} variant="outline">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Code Converter
                </Button> 
                

                </div>
            </div>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex flex-row gap-3 border rounded-lg p-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 ease-linear duration-100 truncate">
                    <Avatar className="border">
                        <AvatarImage src={session?.user?.image || ""} alt="user" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold">{session?.user?.name}</div>
                        <div className="text-xs leading-3 opacity-50" >{session?.user?.email}</div>
                    </div>
                </div>
                <div className="w-full flex flex-rows gap-3">
                    <Button onClick={() => signOut({ callbackUrl: '/', redirect: true })} className='w-full flex flex-row gap-3 '>
                        Log Out
                    </Button>
                    <div className="w-1/6"> <ModeToggle /> </div>
                </div>
            </div>
        </section>
    )
}