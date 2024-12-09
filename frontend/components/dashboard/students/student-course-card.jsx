import { Card } from "@/components/ui/card";
import { formatCreatedAtDate } from "lib/format";
import { AiOutlineCalendar, AiFillCheckCircle } from "react-icons/ai";
import React from "react";

export const StudentCourseCard = ({ studentData }) => {
  return (
    <Card className="max-w-sm p-4 lg:max-w-md xl:max-w-lg">
      <h1 className="mb-4 text-2xl font-semibold text-indigo-700">
        Enrolled Courses
      </h1>
      {studentData?.enrollments?.length > 0 ? (
        <div className="space-y-4">
          {studentData?.enrollments.map((course) => (
            <div
              key={course?._id}
              className="flex items-center justify-between rounded-md bg-white p-4 shadow-md"
            >
              <div>
                <h3 className="mb-2 text-xl font-semibold text-indigo-800">
                  Course: {course?.courseId?.title}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="flex items-center">
                    <AiOutlineCalendar className="mr-1" />
                    Joined At: {formatCreatedAtDate(course?.enrolledAt)}
                  </span>
                </p>
              </div>
              <div className="text-green-500">
                <AiFillCheckCircle className="text-2xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex w-full justify-center">
          <h1 className="text-base text-gray-600">
            Haven&apos;t enrolled in any courses yet
          </h1>
        </div>
      )}
    </Card>
  );
};
