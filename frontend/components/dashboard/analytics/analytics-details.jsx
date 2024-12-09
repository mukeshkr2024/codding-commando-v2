"use client";

import { DataCard } from "@/components/dashboard/analytics/data-card";
import { Button } from "@/components/ui/button";
import { DatePicker } from "antd";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Chart } from "./chart";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export const AnalyticsDetails = ({ start, end }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const router = useRouter();
  const { authToken } = useUserAccessToken();

  useEffect(() => {
    if (start && end) {
      setStartDate(start);
      setEndDate(end);
      setDates([dayjs(start), dayjs(end)]);
    }
  }, [start, end]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const url =
        startDate && endDate
          ? `/analytics?startDate=${startDate}&endDate=${endDate}`
          : "/analytics";

      const { data } = await apiClient(url, config);
      setData(data?.data);
    } catch (error) {
      console.error("Failed to fetch analytics data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const handleShowButtonClick = () => {
    if (dates.length === 2) {
      router.push(
        `/teacher/analytics?startDate=${dates[0]}&endDate=${dates[1]}`,
      );
    }
  };

  const handleDateChange = (values) => {
    setDates(values);
  };

  const handleClearButtonClick = () => {
    setDates([]);
    setStartDate(null);
    setEndDate(null);
    router.push("/teacher/analytics");
  };

  if (loading) {
    return (
      <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md">
        <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col justify-between md:flex-row ">
        <h1 className="pb-2 text-xl font-semibold md:text-3xl"> Analytics</h1>
        <div className="mb-4 flex gap-1 md:gap-2">
          <RangePicker onChange={handleDateChange} value={dates} />
          <Button
            onClick={handleShowButtonClick}
            className="bg-blue-500 hover:bg-blue-600"
            disabled={dates?.length !== 2}
          >
            Show
          </Button>
          <Button
            onClick={handleClearButtonClick}
            className="bg-gray-500 hover:bg-gray-600"
            disabled={dates?.length === 0}
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Link
          href={`/teacher/analytics/payments${startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : ""}`}
        >
          <DataCard
            label="Total Revenue"
            value={data?.totalPrice}
            shouldFormat
            color="bg-blue-500"
          />
        </Link>
        <Link
          href={`/teacher/analytics/payments${startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : ""}`}
        >
          <DataCard
            label="Total Sales"
            value={data?.totalSales}
            color="bg-red-500"
          />
        </Link>
        <Link
          href={`/teacher/students${startDate && endDate ? `?startDate=${startDate}&endDate=${endDate}` : ""}`}
        >
          <DataCard
            label="Total Students"
            value={data?.totalStudents}
            color="bg-green-500"
          />
        </Link>
      </div>
      <Chart data={data?.courseRevenue} />
    </div>
  );
};
