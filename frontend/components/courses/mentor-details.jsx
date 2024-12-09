import { MentorCard } from "../shared/card/mentor-card";

export const MentorDetails = ({ mentors }) => {
  return (
    // <div className="mt-10 grid grid-cols-1 sm:mt-20 sm:grid-cols-2 sm:gap-10  ">
    <div className="mt-10 flex flex-wrap items-center justify-center sm:mt-20 sm:gap-10 ">
      {mentors &&
        mentors.map((mentor) => <MentorCard key={mentor._id} {...mentor} />)}
    </div>
  );
};
