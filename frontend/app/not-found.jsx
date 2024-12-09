import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-800">404</h1>
        <p className="mb-8 text-lg text-gray-600">Oops! Page not found.</p>
        <span role="img" aria-label="Crying face" className="mb-4 text-4xl">
          😢
        </span>
        <p className="text-gray-600">
          The page you are looking for might be in another galaxy.
        </p>
        <Link href={"/"}>
          <Button className="mt-8 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
