'use client';
import Image from 'next/image';
import React from 'react';

type Props = {
  message: string;
};
export default function ErrorChat({ message }: Props) {
  const [completed, setCompleted] = React.useState(false);

  return (
    <div className="flex flex-row gap-3 items-start">
      <Image
        src={'/logo.svg'}
        height={30}
        width={30}
        alt="Logo"
        className="drop-shadow-xl"
      />
      <div className="max-w-[75%] bg-zinc-200/40 dark:bg-zinc-800/40 border p-3 rounded-lg text-zinc-700 dark:text-zinc-300 flex flex-col gap-4 overflow-auto">
        {message}
      </div>
    </div>
  );
}
