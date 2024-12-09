import { Card } from "@/components/ui/card";
import { formatCreatedAtDate } from "lib/format";
import React from "react";
import { FaFileAlt } from "react-icons/fa";

export const CoursePaymentDetail = ({ studentData }) => {
  return (
    <Card className="max-w-sm p-4 lg:max-w-md xl:max-w-lg">
      <h1 className="mb-4 text-2xl font-semibold text-indigo-700">
        Payment History
      </h1>
      {studentData?.enrollments?.length > 0 ? (
        <div className="mt-4 space-y-4">
          {studentData?.paymentHistory.map((history) => (
            <div
              key={history._id}
              className="rounded-md border p-4 text-base text-indigo-700"
            >
              <div className="mb-2 flex items-center">
                <FaFileAlt className="mr-2 text-xl text-indigo-500" />
                <h3 className="font-semibold">
                  Course: {history?.courseId?.title}
                </h3>
              </div>
              <p>
                <span className="font-semibold">Payment Type:</span>{" "}
                {history?.paymentType}
              </p>
              <p>
                <span className="font-semibold">Amount: </span>₹
                {history?.amount}
              </p>
              <p>
                <span className="font-semibold">Payment ID:</span>{" "}
                {history?.payment_id}
              </p>
              <p>
                <span className="font-semibold">Order ID:</span>{" "}
                {history?.order_id}
              </p>
              <p>
                <span className="font-semibold">Purchase Date:</span>{" "}
                {formatCreatedAtDate(history?.purchasedAt)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex w-full justify-center">
          <h1 className="text-base text-gray-600">No Payment History Yet</h1>
        </div>
      )}
    </Card>
  );
};
