import Image from 'next/image';
import { ModeToggle } from '../theme-toggle';

export default function NavBar() {
  return (
    <nav className="max-w-3xl w-full mx-auto border-b flex flex-row justify-between items-center py-3">
      <div className="flex flex-row gap-1.5 text-2xl font-bold tracking-wide ">
        <div>IntelliFix</div>
      </div>
      <ModeToggle />
    </nav>
  );
}
