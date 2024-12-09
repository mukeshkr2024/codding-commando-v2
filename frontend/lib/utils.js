import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { compareDesc, parseISO } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const sortBlogs = (blogs) => {
  return blogs
    .slice()
    .sort((a, b) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt))
    );
};
