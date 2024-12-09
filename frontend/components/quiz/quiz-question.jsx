export const QuizQuestion = ({
  question,
  selectedOption,
  handleOptionChange,
  title,
  index,
  options,
}) => {
  return (
    <div className="mb-4 flex flex-col gap-y-6 px-4 sm:px-6 lg:px-0">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-[#000000]">
          <span>{index + 1}. </span>
          {title}
        </h3>
        <div className="hidden rounded-[69px] bg-[#8F00FF] py-1 text-xs font-bold text-white md:flex md:px-6">
          <span>1 Pt</span>
        </div>
      </div>
      <div className="flex flex-col gap-y-1.5">
        {options.map((option, index) => (
          <div key={index} className="ml-4">
            <label className="flex items-center">
              <input
                type="radio"
                name={`question-${question._id}`}
                value={option._id} // Change this to the option ID
                checked={selectedOption === option._id} // Compare with the option ID
                onChange={() => handleOptionChange(question._id, option._id)} // Pass the option ID
              />

              <span className="ml-2 font-normal">{option.text}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
