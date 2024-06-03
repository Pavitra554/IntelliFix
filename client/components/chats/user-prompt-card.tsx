'use client';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = {
  val: string;
};
export default function UserPrompt({ val }: Props) {
  const { data: session } = useSession();
  return (
    <div className="flex flex-row gap-3 justify-end">
      <div className="max-w-[75%] bg-zinc-200/40 dark:bg-zinc-800/40 border p-3 rounded-lg text-zinc-700 dark:text-zinc-300">
        {val}
      </div>
      <Avatar className="border">
        <AvatarImage src={session?.user?.image || ''} alt="user" />
        <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  );
}
