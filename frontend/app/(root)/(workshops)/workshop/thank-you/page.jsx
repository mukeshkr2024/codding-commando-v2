import React from "react";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

const ThankyouPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="mb-6">
          <CheckCircleIcon className="mx-auto mb-2 h-12 w-12 text-green-500" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Thank you</h2>
        <p className="mb-4 text-gray-600">
          You have successfully completed the registration process
        </p>
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          3-Day Career Mapping Workshop{" "}
        </h2>
        <p className="mb-4 text-gray-600">
          Ensure you join our WhatsApp community
        </p>
        <Link href="https://whatsapp.com/channel/0029VaMXf42GufJ0djguBA0j">
          <button className="rounded-lg bg-green-500 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-green-600">
            Join WhatsApp Community
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankyouPage;
