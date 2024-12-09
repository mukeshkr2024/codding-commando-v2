import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { formatCreatedAtDate } from "lib/format";
import React from "react";
import { FaUser } from "react-icons/fa";

export const StudentDetailCard = ({ studentData }) => {
  return (
    <Card className=" max-w-sm lg:max-w-md lg:p-4 xl:max-w-lg">
      {studentData && (
        <div className="flex justify-between gap-4 p-4 md:justify-normal md:gap-10">
          <Avatar>
            <AvatarImage
              src={studentData?.avatar}
              className="h-16 w-16 rounded-full"
            />

            <AvatarFallback>
              <FaUser className="h-20 w-20 text-gray-500" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-indigo-700">
              {studentData?.firstName} {studentData?.lastName}
            </h1>
            <h2 className="text-sm text-gray-600">{studentData?.email}</h2>
            <h3 className="text-sm text-gray-600">{studentData?.phone}</h3>
            <h3 className="text-sm text-gray-600">
              <span className="font-medium">Joined At:</span>{" "}
              {formatCreatedAtDate(studentData?.createdAt)}
            </h3>
          </div>
        </div>
      )}
    </Card>
  );
};
