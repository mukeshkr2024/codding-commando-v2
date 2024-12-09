import { Button } from "@/components/ui/button";
import { useState } from "react";

export const SelectCorrectOption = ({ saveOption, question }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const correctOptionId =
    question?.options.find((option) => option.isCorrect)?._id || "";
  useState(() => {
    setSelectedOption(correctOptionId);
  }, [correctOptionId]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="relative mt-6 rounded-md border bg-slate-100 p-4">
      <h2 className="mb-4 text-lg font-medium">Select Correct Option</h2>
      <div className="">
        <select
          className="block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="">Select an option</option>
          {question.options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.text}
            </option>
          ))}
        </select>
        <Button
          onClick={() => saveOption(selectedOption)}
          className="mt-4"
          disabled={!selectedOption}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
