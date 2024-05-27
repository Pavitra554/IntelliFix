'use client';
import React from 'react';
import Image from 'next/image';
import useStore from '@/lib/store';
import { ModeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Bug, Mail, RefreshCcw, Terminal } from 'lucide-react';

export default function SideBar() {
  const { data: session } = useSession();
  const { promptSize, toolMode, setPromptSize, setToolMode } = useStore();

  return (
    <section className="flex bg-white dark:bg-zinc-950 max-w-72 w-full flex-col justify-between border-r p-3">
      <div className="flex flex-col gap-3">
        <button className="flex flex-row items-center gap-3 w-full border rounded-lg p-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 ease-linear duration-100 ">
          <Image
            src={'/logo.svg'}
            height={25}
            width={25}
            alt="Logo"
            className="drop-shadow-xl"
          />
          <div className="font-semibold ">New Prompt </div>
        </button>
        <div className="border-b"></div>
        <div className="text-xs text-zinc-500 font-bold tracking-wider">
          AI TOOLS
        </div>
        <div className="w-full flex flex-col gap-3">
          <Button
            onClick={() => setToolMode('code_debugger')}
            className={`flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-200  ${
              toolMode === 'code_debugger' &&
              'bg-zinc-100 text-zinc-950 dark:text-white dark:bg-zinc-800/50'
            }`}
            variant="outline"
          >
            <Bug className="mr-2 h-4 w-4" /> Code Debugger
          </Button>
          <Button
            onClick={() => setToolMode('code_optimizer')}
            className={`flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-200 ${
              toolMode === 'code_optimizer' &&
              'bg-zinc-100 text-zinc-950 dark:text-white dark:bg-zinc-800/50'
            }`}
            variant="outline"
          >
            <Terminal className="mr-2 h-4 w-4" /> Code Optimizer
          </Button>
          <Button
            onClick={() => setToolMode('code_converter')}
            className={`flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-200 ${
              toolMode === 'code_converter' &&
              'bg-zinc-100 text-zinc-950 dark:text-white dark:bg-zinc-800/50'
            }`}
            variant="outline"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Code Converter
          </Button>
        </div>
        <div className="text-xs text-zinc-500 font-bold tracking-wider">
          PROMPT SIZE
        </div>
        <div className="flex flex-row gap-3">
          <Button
            onClick={() => setPromptSize(1)}
            className={`w-full flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-200  ${
              promptSize === 1 &&
              'bg-zinc-100 text-zinc-950 dark:text-white dark:bg-zinc-800/50'
            }`}
            variant="outline"
          >
            Small
          </Button>
          <Button
            onClick={() => setPromptSize(7)}
            className={`w-full flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-200 ${
              promptSize === 7 &&
              'bg-zinc-100 text-zinc-950 dark:text-white dark:bg-zinc-800/50'
            }`}
            variant="outline"
          >
            Medium
          </Button>
          <Button
            onClick={() => setPromptSize(14)}
            className={`w-full flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-200 ${
              promptSize === 14 &&
              'bg-zinc-100 text-zinc-950 dark:text-white dark:bg-zinc-800/50'
            }`}
            variant="outline"
          >
            Large
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-row gap-3 border rounded-lg p-3 hover:bg-zinc-200 dark:hover:bg-zinc-900 ease-linear duration-100 truncate">
          <Avatar className="border">
            <AvatarImage src={session?.user?.image || ''} alt="user" />
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{session?.user?.name}</div>
            <div className="text-xs leading-3 opacity-50">
              {session?.user?.email}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-rows gap-3">
          <Button
            onClick={() => signOut({ callbackUrl: '/', redirect: true })}
            className="w-full flex flex-row gap-3 "
          >
            Log Out
          </Button>
          <div className="w-1/6">
            {' '}
            <ModeToggle />{' '}
          </div>
        </div>
      </div>
    </section>
  );
}
