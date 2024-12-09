import { create } from "zustand";

const useCourseStore = create((set) => ({
  currentModuleId: null,
  setCurrentModuleId: (id) => set({ currentModuleId: id }),
  currentLessonId: null,
  setCurrentLessonId: (id) => set({ currentLessonId: id }),
  nextModuleId: null,
  setNextModuleId: (id) => set({ nextModuleId: id }),
  nextLessonId: null,
  setNextLessonId: (id) => set({ nextLessonId: id }),
  prevModuleId: null,
  setPrevModuleId: (id) => set({ prevModuleId: id }),
  prevLessonId: null,
  setPrevLessonId: (id) => set({ prevLessonId: id }),
  disablePrevBtn: true,
  setDisablePrevBtn: (status) => set({ disablePrevBtn: status }),
  disableNextBtn: true,
  setDisableNextBtn: (status) => set({ disableNextBtn: status }),
  currentMobileViewDetailId: 1,
  setCurrentMobileViewDetailId: (id) => set({ currentMobileViewDetailId: id }),
}));

export default useCourseStore;
