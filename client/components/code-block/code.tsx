import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { TypeAnimation } from 'react-type-animation';

type Props = {
  code: string;
};

export default function Code({ code }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = (code: any) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  //Extract Language
  const languageMatch = code.match(/^\w+/);

  const language = languageMatch ? languageMatch[0] : null;
  const code_response = code.replace(/^\w+\n/, '');

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 border rounded-lg overflow-scroll">
      <div className="bg-zinc-200 dark:bg-zinc-900 p-1.5 px-2 pl-3 flex flex-row items-center justify-between">
        <div className="text-sm font-medium text-zinc-500 capitalize">
          {language}
        </div>
        <Button
          // className={`bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md p-2 transition-colors ${
          //   isCopied
          //     ? 'bg-green-500 hover:bg-green-600 text-white'
          //     : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          // }`}
          variant="secondary"
          size="icon"
          onClick={() => handleCopy(code_response)}
          className="text-zinc-500 border"
        >
          {isCopied ? <CheckIcon size={17} /> : <CopyIcon size={17} />}
        </Button>
      </div>
      <div className="p-4 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 relative">
        <pre className="text-zinc-700 dark:text-zinc-400 font-mono whitespace-pre-wrap">
          <code className="language-js">
            {' '}
            <TypeAnimation
              sequence={[code_response]}
              wrapper="span"
              speed={80}
              style={{ display: 'inline-block' }}
              repeat={0}
              cursor={false}
            />
          </code>
        </pre>
      </div>
    </div>
  );
}
