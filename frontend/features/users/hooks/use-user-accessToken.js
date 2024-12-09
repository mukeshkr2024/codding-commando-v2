"use client";

import { create } from "zustand";

const getInitialAuthToken = () => {
  try {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      return storedToken ? JSON.parse(storedToken) : null;
    }
  } catch (error) {
    console.error("Failed to parse authToken from localStorage:", error);
    return null;
  }
};

export const useUserAccessToken = create((set) => ({
  authToken: getInitialAuthToken(),
  setAuthToken: (token) => set({ authToken: token }),
  removeAuthToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
    set({ authToken: null });
  },
}));
