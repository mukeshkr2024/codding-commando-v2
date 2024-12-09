"use client";

export const FormInput = ({ label, type, placeholder, register, error }) => {
  const inputProps =
    type === "number" ? { inputMode: "numeric", pattern: "\\d*" } : {};

  return (
    <div className="mb-4">
      <input
        {...register}
        {...inputProps}
        className={`w-full appearance-none border-b border-white bg-transparent px-3 py-2 leading-tight text-white placeholder:text-gray-500 focus:shadow-none focus:outline-none ${
          error ? "border-red-500" : ""
        }`}
        type={type}
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};
