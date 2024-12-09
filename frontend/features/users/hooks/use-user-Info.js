import { create } from "zustand";

export const useUserInfo = create((set) => ({
  user: null,
  setUser: (userInfo) => set({ user: userInfo }),
  clearUser: () => set({ user: null }),
}));
