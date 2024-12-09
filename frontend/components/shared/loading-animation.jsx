import { Loader2 } from "lucide-react";
import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md">
      <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
    </div>
  );
};

export default LoadingAnimation;
