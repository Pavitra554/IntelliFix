'use client';
import Image from 'next/image';

import { PulseLoader } from 'react-spinners';
import Code from '../code-block/code';
import { TypeAnimation } from 'react-type-animation';
import React from 'react';

type Props = {
  message_response: string;
  code_response: string;
  loading: boolean;
};
export default function AiResponse({
  message_response,
  code_response,
  loading,
}: Props) {
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
        {loading && <PulseLoader size={12} color="rgba(113,113,122,0.7)" />}
        {!loading && (
          <TypeAnimation
            sequence={[message_response, () => setCompleted(!completed)]}
            wrapper="span"
            speed={80}
            style={{ display: 'inline-block' }}
            repeat={0}
            cursor={false}
          />
        )}
        {!loading && completed && code_response && (
          <Code code={code_response} />
        )}
      </div>
    </div>
  );
}
