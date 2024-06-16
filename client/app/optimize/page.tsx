'use client';
import React from 'react';
import Image from 'next/image';

//Components
import SideBar from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import UserPrompt from '@/components/chats/user-prompt-card';
import AiResponse from '@/components/chats/ai-respone-card';

//Icons
import {
  Bug,
  FileText,
  Paperclip,
  RefreshCcw,
  Send,
  Terminal,
} from 'lucide-react';

// NextAuth
import { useSession } from 'next-auth/react';
import ExamplePromptCard from '@/components/cards/example-prompt';

// global state
import useOptimize from '../../lib/use-optimize';

//React Hot Toast
import toast from 'react-hot-toast';
import LoadingChat from '@/components/chats/loading-chat';
import FileChat from '@/components/chats/file-chat';
import ErrorChat from '@/components/chats/error-chat';

export default function OptimizePage() {
  // for components
  const [isFollowUp, setIsFollowUp] = React.useState(false);
  const [promptComponents, setPromptComponents] = React.useState<
    React.ReactNode[]
  >([]);

  // input state
  const [file, setFile] = React.useState(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [prompt, setPrompt] = React.useState('');
  const [follow_up, setFollowUp] = React.useState('');

  // util
  const [textareaHeight, setTextareaHeight] = React.useState(30);

  // session
  const { data: session } = useSession();

  // global state
  const { data, loading, error, fetchData } = useOptimize();

  const handlePromptArea = (event: any) => {
    const { value } = event.target;
    if (!isFollowUp) {
      setPrompt(value);
    } else {
      setFollowUp(value);
    }

    const lineHeight = 24;
    const maxLines = 12;
    const newHeight = Math.min(
      value.split('\n').length * lineHeight,
      maxLines * lineHeight,
    );
    setTextareaHeight(newHeight);
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    toast.success('File Uploaded', {
      className:
        'bg-zinc-200/40 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border',
    });
    setPromptComponents((prevComponents) => [
      ...prevComponents,
      <FileChat val="File Added" />,
    ]);
  };

  const triggerFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const submitPrompt = () => {
    if (prompt === '' && file == null) {
      toast.error('Please provide prompt or file', {
        className:
          'bg-zinc-200/40 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border',
      });
      return;
    }

    setTextareaHeight(30);
    setIsFollowUp(!isFollowUp);
    if (prompt) {
      setPromptComponents((prevComponents) => [
        ...prevComponents,
        <UserPrompt key={prevComponents.length} val={prompt} />,
      ]);
    }
    setPromptComponents((prevComponents) => [
      ...prevComponents,
      <LoadingChat />,
    ]);

    fetchData(file, prompt, follow_up);
    setPrompt('');
    setFile(null);
  };

  const submitFollowUp = () => {
    if (prompt === '' && file == null) {
      toast.error('Please provide prompt or file', {
        className:
          'bg-zinc-200/40 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border',
      });
      return;
    }
    setTextareaHeight(30);
    if (prompt) {
      setPromptComponents((prevComponents) => [
        ...prevComponents,
        <UserPrompt key={prevComponents.length} val={follow_up} />,
      ]);
    }

    setPromptComponents((prevComponents) => [
      ...prevComponents,
      <LoadingChat />,
    ]);
    fetchData(file, prompt, follow_up);
    setFollowUp('');
    setFile(null);
  };

  React.useEffect(() => {
    if (data) {
      setPromptComponents((prevComponents) => {
        const newComponents = prevComponents.slice(
          0,
          prevComponents.length - 1,
        );
        return [
          ...newComponents,
          <AiResponse
            key={prevComponents.length + 1}
            loading={loading}
            code_response={data?.code_response}
            message_response={data?.message_response}
          />,
        ];
      });
    }
    if (error) {
      setPromptComponents((prevComponents) => {
        const newComponents = prevComponents.slice(
          0,
          prevComponents.length - 1,
        );
        return [
          ...newComponents,
          <ErrorChat
            message={error.mesage ? error.message : 'Something went wrong...'}
          />,
        ];
      });
    }
  }, [data, error]);
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
          <div className="overflow-y-scroll">
            {promptComponents.length != 0 && (
              <div className="h-full w-full flex flex-col gap-3 D">
                {promptComponents.map((e, i) => {
                  return e;
                })}
              </div>
            )}
          </div>
          {/* Prompt Area */}
          <div className="w-full flex flex-row items-end gap-3 bg-zinc-200/40 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 hover:bg-zinc-200 border rounded-lg p-3 pl-4">
            <textarea
              value={!isFollowUp ? prompt : follow_up}
              style={{ height: `${textareaHeight}px` }}
              onChange={(e) => handlePromptArea(e)}
              disabled={loading}
              placeholder={
                !isFollowUp ? `Let me optimize your code?` : 'Ask follow up..'
              }
              className=" my-auto w-full text-zinc-950 dark:text-white bg-transparent flex outline-none resize-none ease-linear duration-100 transition-all"
            ></textarea>

            {!isFollowUp ? (
              <Button
                onClick={() => submitPrompt()}
                size="sm"
                disabled={loading}
              >
                <Send size={17} />
              </Button>
            ) : (
              <Button
                onClick={() => submitFollowUp()}
                size="sm"
                disabled={loading}
              >
                <Send size={17} className="mr-1" /> Follow Up
              </Button>
            )}
            <Button
              disabled={loading}
              size="sm"
              onClick={triggerFileInputClick}
            >
              <Paperclip size={17} />{' '}
            </Button>
            <input
              type="file"
              id="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <div className="text-center text-xs text-zinc-500 p-2">
            IntelliFix can make mistakes. Check important info.{' '}
          </div>
        </div>
      </div>
    </main>
  );
}
