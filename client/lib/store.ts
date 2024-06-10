import { create } from 'zustand';

interface State {
  disable_btn: boolean;
  prompt: string;
  toolMode: string;
  promptComponents: any[];
  setDisableBtn: (val: boolean) => void;
  setPrompt: (message: string) => void;
  setToolMode: (size: string) => void;
  setPromptComponents: (prompt: any) => void;
}

const useStore = create<State>((set) => ({
  disable_btn: false,

  //Prompt
  prompt: '',
  promptComponents: [],
  toolMode: 'code_debugger',
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
  setDisableBtn: (val: boolean) => {
    set(() => ({ disable_btn: val }));
  },
}));

export default useStore;
