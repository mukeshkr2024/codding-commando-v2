"use client";

export const FormTextarea = ({ placeholder, register, error }) => (
  <div className="mb-4">
    <textarea
      {...register}
      className={`w-full appearance-none border-b border-white bg-transparent px-3 py-2 leading-tight text-white placeholder:text-gray-500 focus:shadow-none focus:outline-none ${
        error ? "border-red-500" : ""
      }`}
      placeholder={placeholder}
    />
    {error && <p className="text-sm text-red-500">{error.message}</p>}
  </div>
);
