export const SignUpInput = ({
  type,
  placeholder,
  register,
  error,
  onFocus,
}) => (
  <div className="mb-4">
    <input
      {...register}
      onFocus={onFocus}
      className={`w-full appearance-none border-b bg-transparent p-2 leading-tight text-white outline-none placeholder:text-white focus:shadow-none focus:outline-none${
        error ? "border-red-500" : ""
      }`}
      type={type}
      placeholder={placeholder}
    />
  </div>
);
