"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "hooks/use-debounce";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, router, pathname]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
      <Input
        onChange={handleInputChange}
        value={value}
        className="w-full rounded-full bg-slate-100 pl-9 focus-visible:ring-slate-200 md:w-[300px]"
        placeholder="Search for a course"
      />
    </div>
  );
};
