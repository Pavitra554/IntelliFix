'use client';
import Image from 'next/image';

import { PulseLoader } from 'react-spinners';
import Code from '../code-block/code';
import { TypeAnimation } from 'react-type-animation';
import React from 'react';

export default function AiResponse() {
  const [completed, setCompleted] = React.useState(false);

  const demo_api_response = {
    status: 'success',
    message_response:
      ' The provided code defines a function ⁠ merge_sort ⁠ that implements the merge sort algorithm to sort a given list of numbers. It recursively divides the list into two halves, sorts them individually, and then merges the sorted halves back together. Finally, it sorts the input list in ascending order using the merge sort algorithm and prints the sorted array.\n\n',
    code_response:
      'python\ndef merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        left_half = arr[:mid]\n        right_half = arr[mid:]  \n        \n        merge_sort(left_half)\n        merge_sort(right_half)\n        \n        i = j = k = 0\n        \n        while i < len(left_half) and j < len(right_half):\n            if left_half[i] < right_half[j]:\n                arr[k] = left_half[i]\n                i += 1\n            else:\n                arr[k] = right_half[j]\n                j += 1\n            k += 1\n        \n        while i < len(left_half):\n            arr[k] = left_half[i]\n            i += 1\n            k += 1\n        \n        while j < len(right_half):\n            arr[k] = right_half[j]\n            j += 1\n            k += 1\n\n# Example usage:\narr = [12, 11, 13, 5, 6, 7]\nmerge_sort(arr)\nprint("Sorted array:", arr)\n',
    message: 'Operation executed succesfully',
  };

  return (
    <div className="flex flex-row gap-3 items-start">
      <Image
        src={'/logo.svg'}
        height={30}
        width={30}
        alt="Logo"
        className="drop-shadow-xl"
      />
      <div className="max-w-[75%] bg-zinc-200/40 dark:bg-zinc-800/40 border p-3 rounded-lg text-zinc-700 dark:text-zinc-300 flex flex-col gap-4">
        {/* <PulseLoader size={12} color="rgba(113,113,122,0.7)" /> */}
        <TypeAnimation
          sequence={[
            demo_api_response.message_response,
            () => setCompleted(!completed),
          ]}
          wrapper="span"
          speed={80}
          style={{ display: 'inline-block' }}
          repeat={0}
          cursor={false}
        />
        {completed && <Code code={demo_api_response.code_response} />}
      </div>
    </div>
  );
}
