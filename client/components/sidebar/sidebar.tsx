'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ModeToggle } from '../theme-toggle';
import { Button } from '../ui/button';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Bug, Plus, RefreshCcw, Terminal } from 'lucide-react';
import useDebug from '@/lib/use-debug';

export default function SideBar() {
  const { reset } = useDebug();
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <section className="flex bg-white dark:bg-zinc-950 max-w-72 w-full flex-col justify-between border-r p-3 ">
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => {
            reset();
            router.push('/');
            setTimeout(() => {
              router.push('/debug');
            }, 1);
          }}
          className={`flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-200`}
          variant="outline"
        >
          <Plus className="mr-2 h-4 w-4" /> New Prompt
        </Button>
        <div className="text-xs text-zinc-500 font-bold tracking-wider">
          AI TOOLS
        </div>
        <div className="w-full flex flex-col gap-3">
          <Button
            onClick={() => {
              reset();
              router.push('/debug');
            }}
            className={`flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-200  ${
              pathname === '/debug' &&
              'bg-zinc-100 text-zinc-950 dark:text-white dark:bg-zinc-800/50'
            }`}
            variant="outline"
          >
            <Bug className="mr-2 h-4 w-4" /> Code Debugger
          </Button>
          <Button
            onClick={() => {
              reset();
              router.push('/optimize');
            }}
            className={`flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-200 ${
              pathname === '/optimize' &&
              'bg-zinc-100 text-zinc-950 dark:text-white dark:bg-zinc-800/50'
            }`}
            variant="outline"
          >
            <Terminal className="mr-2 h-4 w-4" /> Code Optimizer
          </Button>
          <Button
            onClick={() => {
              reset();
              router.push('/convert');
            }}
            className={`flex justify-start dark:hover:bg-zinc-800 hover:bg-zinc-200 ${
              pathname === '/convert' &&
              'bg-zinc-100 text-zinc-950 dark:text-white dark:bg-zinc-800/50'
            }`}
            variant="outline"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Code Converter
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
