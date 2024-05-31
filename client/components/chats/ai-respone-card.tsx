'use client';
import Image from 'next/image';
import { PulseLoader } from 'react-spinners';

export default function AiResponse() {
  return (
    <div className="flex flex-row gap-3 items-start">
      <Image
        src={'/logo.svg'}
        height={30}
        width={30}
        alt="Logo"
        className="drop-shadow-xl"
      />
      <div className="max-w-[75%] bg-zinc-200/40 dark:bg-zinc-800/40 border p-3 rounded-lg text-zinc-700 dark:text-zinc-300">
        <PulseLoader size={12} color="rgba(113,113,122,0.7)" />
        {/* TypeScript is a statically typed superset of JavaScript developed and
        maintained by Microsoft. It wdas designed to address some of the
        shortcomings of JavaScript by adding static types, which help in
        catching errors during development rather than at runtime. Here are some
        key aspects of TypeScript: Static Typing: TypeScript allows developers
        to define types for variables, function parameters, and return values.
        This helps in early detection of type-related errors during the
        development process. Compiling to JavaScript: TypeScript code is
        compiled (or transpiled) into plain JavaScript, which means it can run
        on any environment that JavaScript runs on, including web browsers and
        Node.js. */}
      </div>
    </div>
  );
}
