"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

export const Buy = ({ makePayment }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="mt-[100px] flex flex-col items-center justify-center">
      <Button
        onClick={async () => {
          setIsLoading(true);
          await makePayment({ courseId: "658d6a162c386d54f4848d8f" });
          setIsLoading(false);
        }}
        disabled={isLoading}
        className={`mt-20 rounded bg-blue-500 px-4 py-2 font-semibold text-white ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {isLoading ? "Processing..." : "Buy Now"}
      </Button>
    </div>
  );
};
