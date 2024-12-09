"use client";

import React from "react";

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { CategoryItem } from "./category-items";

const iconMap = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
};

const categories = [
  { id: "1c5339ea-b7ef-4521-90e6-39441eadeafc", name: "Accounting" },
  {
    id: "b72a6e9a-c9c5-43d2-8902-129626391a61",
    name: "Computer Science",
  },
  { id: "5cfc5816-b251-4678-826c-ec6c25aeeb53", name: "Engineering" },
  { id: "47c8a3d2-6ce8-4a2e-8e26-2f5a4ccb5100", name: "Filming" },
  { id: "78cff42a-0848-4557-9df2-d8a5d5057932", name: "Fitness" },
  { id: "62f28e8f-1b1a-4d5c-a16d-e3796887a308", name: "Music" },
  { id: "b3d7eb7c-31a5-430b-8628-b5721aae8c9d", name: "Photography" },
];

export const Categories = () => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {categories.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
