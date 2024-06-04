import { create } from 'zustand';

interface State {
  prompt: string;
  promptSize: number;
  toolMode: string;
  promptComponents: any[];
  setPrompt: (message: string) => void;
  setPromptSize: (size: number) => void;
  setToolMode: (size: string) => void;
  setPromptComponents: (prompt: any) => void;
}

const useStore = create<State>((set) => ({
  prompt: '',
  promptSize: 1,
  promptComponents: [],
  toolMode: 'code_debugger',
  setPromptSize: (size: number) => {
    set(() => ({ promptSize: size }));
  },
  setToolMode: (mode: string) => {
    set(() => ({ toolMode: mode }));
  },
  setPromptComponents: (promptComponent: any) => {
    set((state) => ({
      promptComponents: [...state.promptComponents, promptComponent],
    }));
  },
  setPrompt: (message: string) => {
    set(() => ({ prompt: message }));
  },
}));

export default useStore;
