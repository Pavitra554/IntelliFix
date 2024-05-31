import { Code } from 'lucide-react';

type Props = {
  icon: React.ReactNode;
  text: string;
};
export default function ExamplePromptCard({ text, icon }: Props) {
  return (
    <div className="bg-zinc-200/40 dark:bg-zinc-800/40 dark:hover:bg-zinc-800 hover:bg-zinc-200 border p-4 rounded-lg flex flex-col gap-3 cursor-pointer text-zinc-600 dark:text-zinc-400 ease-linear duration-100 select-none">
      {icon}
      <div className="text-sm">{text}</div>
    </div>
  );
}
