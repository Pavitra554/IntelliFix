import { create } from 'zustand';

interface State {
  // data fetch
  data: any;
  loading: boolean;
  error: any;
  fetchData: (
    file: File | null,
    prompt: string | null,
    followup: string | null,
    language: string | '',
  ) => void;

  // reset
  reset: () => void;
}

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const useConvert = create<State>((set) => ({
  ...initialState,

  // data fetch
  fetchData: async (
    file: File | null,
    prompt: string | null,
    followup: string | null,
    language: string | '',
  ) => {
    set(() => ({ loading: true }));
    try {
      const formData = new FormData();
      if (prompt || file) {
        if (file) {
          formData.append('prompt_as_file', file);
        }
        if (prompt != '' && prompt != null) {
          formData.append('prompt_as_str', prompt);
        }
      } else if (followup) {
        formData.append('follow_up', followup);
      }
      formData.append('required_language', language);

      const response = await fetch(
        'https://intellifix-api.onrender.com/api/v1/Intellifix/translator',
        {
          method: 'POST',
          headers: {
            'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || '',
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const res = await response.json();
      set({ data: res, loading: false });
    } catch (error) {
      set({ error: error, loading: false });
    }
  },

  reset: () => set(initialState),
}));

export default useConvert;
