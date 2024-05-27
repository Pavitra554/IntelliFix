import { create } from 'zustand';

interface State {
  promptSize: number;
  toolMode: string;
  setPromptSize: (size: number) => void;
  setToolMode: (size: string) => void;
}

const useStore = create<State>((set) => ({
  promptSize: 1,
  toolMode: 'code_debugger',
  setPromptSize: (size: number) => {
    set(() => ({ promptSize: size }));
  },
  setToolMode: (mode: string) => {
    set(() => ({ toolMode: mode }));
  },
}));

export default useStore;
