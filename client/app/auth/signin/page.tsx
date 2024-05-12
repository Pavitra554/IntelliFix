"use client"
import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { ModeToggle } from '@/components/theme-toggle'

export default function Signin() {
  return (
    <div className=' min-h-screen flex justify-center items-center p-4'>
     <div className='relative'>
      <div className="absolute h-full opacity-30 w-full bg-gradient-to-r from-indigo-700 to-purple-700 blur-3xl animate-pulse duration-2000"></div>
      <div className='relative dark:bg-zinc-950/80 bg-zinc-100 max-w-md  w-full flex flex-col gap-2 items-center p-6 border rounded-lg shadow-lg'>
          <Image src={'/logo.svg'} height={80} width={80} alt="Logo" className="drop-shadow-xl mt-6" />
          <div className='text-lg md:text-4xl font-extrabold tracking-wide mt-4'>Welcome to IntelliFix</div>
          <div className='text-zinc-500 text-center text-xs md:text-base'>
            Where code meets precision effortlessly. Experience seamless debugging with AI-powered optimization. Join us and elevate your coding journey. Welcome to a new era of development
          </div>
          <div className='w-full h-1 border-b my-4 '></div>
          <div className='w-full flex flex-row gap-2'>
            <Button onClick={() => signIn("google", { redirect: true, callbackUrl: '/main' })} className='w-full flex flex-row gap-2 '>
              <FcGoogle size={25} /> Continue with Google
            </Button>
            <ModeToggle />
          </div>
        </div>
     </div>
    </div>
  )
}

