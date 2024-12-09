import { create } from "zustand";

export const useCourseLessonData = create((set) => ({
  totalLessons: 0,
  setTotalLessons: (total) => set({ totalLessons: total }),
  completedLessons: 0,
  setCompletedLessons: (completed) => set({ completedLessons: completed }),
}));
