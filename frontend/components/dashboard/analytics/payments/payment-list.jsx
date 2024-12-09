"use client";

// import { ErrorToast } from "@/components/error-toast";
import LoadingAnimation from "@/components/shared/loading-animation";
import apiClient from "lib/api-client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../../students/data-tables";
import { PaymentColumn } from "./payment-column";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export const PaymentList = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authToken } = useUserAccessToken();

  const fetchPayments = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const url =
        startDate && endDate
          ? `/purchases?startDate=${startDate}&endDate=${endDate}`
          : "/purchases";

      const { data } = await apiClient.get(url, config);
      setData(data?.results);
    } catch (error) {
      // ErrorToast(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="p-6">
      <Link
        href={`/teacher/analytics${startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : ""}`}
        className="mb-4 flex items-center gap-1 font-medium hover:text-slate-700"
      >
        <FaArrowLeft className="h-4 w-4" />
        Go Back
      </Link>{" "}
      <DataTable columns={PaymentColumn} data={data} />
    </div>
  );
};
