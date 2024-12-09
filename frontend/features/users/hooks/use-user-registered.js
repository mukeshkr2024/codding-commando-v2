import { create } from "zustand";

export const useUserRegistered = create((set) => ({
  registered: null,
  setRegistered: (data) => set({ registered: data }),
  clearRegistered: () => set({ registered: null }),
}));
