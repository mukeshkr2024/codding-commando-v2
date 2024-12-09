export const LoginInput = ({ type, placeholder, register, error }) => (
  <div className="mb-4">
    <input
      {...register}
      className={`w-[200px] appearance-none bg-transparent px-3 leading-tight text-white placeholder:text-white focus:shadow-none focus:outline-none sm:w-[250px] md:w-[320px] ${
        error ? "border-red-500" : ""
      }`}
      type={type}
      placeholder={placeholder}
    />
  </div>
);
