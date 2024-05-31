'use client';
import React from 'react';
import Image from 'next/image';

//Components
import SideBar from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import useStore from '@/lib/store';
import UserPrompt from '@/components/chats/user-prompt-card';
import AiResponse from '@/components/chats/ai-respone-card';

//Icons
import {
  ArrowUpFromDot,
  Bug,
  Code,
  Code2,
  FileText,
  Paperclip,
  RefreshCcw,
  Terminal,
} from 'lucide-react';

// NextAuth
import { useSession } from 'next-auth/react';
import ExamplePromptCard from '@/components/cards/example-prompt';

export default function Home() {
  const { data: session } = useSession();

  const {
    prompt,
    promptSize,
    toolMode,
    setPrompt,
    promptComponents,
    setPromptComponents,
  } = useStore();

  return (
    <main className="h-screen w-full flex flex-row">
      <SideBar />

      <div className="h-full w-full mx-auto bg-zinc-100 dark:bg-zinc-900 p-3 hover:">
        <div className="w-full h-full max-w-4xl mx-auto flex gap-3 flex-col justify-end">
          {/* Welcome screen */}
          {promptComponents.length === 0 && (
            <div className="h-full w-full flex items-center pb-16">
              <div className="flex flex-col gap-6 items-start">
                <Image
                  src={'/logo.svg'}
                  height={50}
                  width={50}
                  alt="Logo"
                  className="drop-shadow-xl"
                />
                <div className="flex flex-col">
                  <div className="text-6xl text-zinc-500 font-bold">
                    Hello, {session?.user?.name?.split(' ')[0]}
                  </div>
                  <div className="text-5xl text-zinc-400 dark:text-zinc-700 font-bold">
                    How can I help you today?
                  </div>
                </div>
                <div className="flex flex-row gap-6">
                  <ExamplePromptCard
                    icon={<Terminal />}
                    text="Optimize the given code in main.py file?"
                  />
                  <ExamplePromptCard
                    icon={<RefreshCcw />}
                    text="Convert the code in main.py to java?"
                  />
                  <ExamplePromptCard
                    icon={<Bug />}
                    text="Provided code in index.js is having some error fix it?"
                  />
                  <ExamplePromptCard
                    icon={<FileText />}
                    text="Write documentation for provided code in app.ts?"
                  />
                </div>
              </div>
            </div>
          )}
          {/*  Chat Area */}
          {promptComponents.length != 0 && (
            <div className="overflow-y-scroll h-full w-full flex flex-col justify-end gap-3">
              {promptComponents.map((e, i) => {
                return e;
              })}
            </div>
          )}
          {/* Prompt Area */}
          <div className="w-full flex flex-row items-end gap-3 bg-zinc-200/40 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 hover:bg-zinc-200 border rounded-lg p-3 pl-4">
            <textarea
              rows={promptSize}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter Prompt..."
              className=" my-auto w-full text-zinc-950 dark:text-white bg-transparent flex outline-none resize-none ease-linear duration-100 transition-all"
            ></textarea>

            <Button
              onClick={() => {
                setPromptComponents(<UserPrompt val={prompt} />);
                setPromptComponents(<AiResponse />);
                setPrompt('');
              }}
              size="icon"
            >
              <ArrowUpFromDot size={17} />
            </Button>
            <Button size="icon">
              <Paperclip size={17} />
            </Button>
          </div>
          <div className="text-center text-xs text-zinc-500 p-3">
            IntelliFix can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </main>
  );
}
