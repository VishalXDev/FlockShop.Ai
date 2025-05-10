// client/store/useUserStore.ts
import { create } from "zustand";

type UserStore = {
  email: string | null;
  uid?: string | null;
  setEmail: (email: string | null) => void;
  setUID?: (uid: string | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  email: null,
  setEmail: (email) => set({ email }),
}));
