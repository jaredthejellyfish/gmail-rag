import { create } from 'zustand';

interface CurrentEmailState {
  status: string;
  toggle: (state: string) => void;
}

const currentEmailStore = create<CurrentEmailState>((set) => ({
  status: 'all',
  toggle: (state) =>
    set(() => {
      return state === 'unread' ? 'all' : 'unread';
    }),
}));

export default currentEmailStore;
