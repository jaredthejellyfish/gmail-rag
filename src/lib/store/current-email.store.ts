import { create } from 'zustand';

interface CurrentEmailState {
  id: string;
  set: (state: string) => void;
}

const currentEmailStore = create<CurrentEmailState>((set) => ({
  id: '',
  set: (state) =>
    set(() => {
      return {
        id: state,
      };
    }),
}));

export default currentEmailStore;
