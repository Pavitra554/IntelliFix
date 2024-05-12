"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'

export default function Signin() {
  return (
    <div className=' min-h-screen flex justify-center items-center'>
      <Button onClick={() => signIn("google", { redirect: true, callbackUrl: '/main' })} className='flex flex-row gap-2'>
        <FcGoogle /> Sign in with Google
      </Button>
    </div>
  )
}

