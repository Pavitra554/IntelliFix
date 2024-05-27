'use client';
import React from 'react';
import SideBar from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import useStore from '@/lib/store';
import { ArrowUpFromDot, Paperclip } from 'lucide-react';

export default function Home() {
  const { promptSize, toolMode } = useStore();
  const [prompt, setPrompt] = React.useState('');

  return (
    <main className="h-screen w-full flex flex-row">
      <SideBar />

      <div className="h-full w-full mx-auto bg-zinc-100 dark:bg-zinc-900 p-3">
        <div className="w-full h-full max-w-4xl mx-auto flex flex-col justify-end">
          {/*  Message Area */}

          <div>{toolMode}</div>
          <div className="w-full flex flex-row items-end gap-3 bg-zinc-200/40 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 hover:bg-zinc-200 border rounded-lg p-3 pl-4">
            <textarea
              rows={promptSize}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter Prompt..."
              className=" my-auto w-full text-zinc-950 d ark:text-white bg-transparent flex outline-none resize-none"
            ></textarea>
            <Button size="icon">
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
