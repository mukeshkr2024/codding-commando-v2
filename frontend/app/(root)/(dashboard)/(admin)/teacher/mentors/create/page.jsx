import { CreateMentorForm } from "@/components/dashboard/mentors/create-mentor-form";

const createMentorPage = () => {
  return (
    <div className="mx-auto flex h-full max-w-5xl p-6 md:items-center md:justify-center">
      <div>
        <h1 className="text-2xl"> Name your Team Member</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your member ? you can change this later.
        </p>
        <CreateMentorForm />
      </div>
    </div>
  );
};

export default createMentorPage;
