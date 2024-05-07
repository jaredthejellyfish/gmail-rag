import { create } from 'zustand';

interface InboxModeState {
  status: string;
  toggle: () => void;
  set: (state: 'all' | 'unread') => void;
}

const inboxModeStore = create<InboxModeState>((set) => ({
  status: 'all',
  toggle: () =>
    set((state) => ({ status: state.status === 'unread' ? 'all' : 'unread' })),
  set: (state) => set({ status: state }),
}));

export default inboxModeStore;
