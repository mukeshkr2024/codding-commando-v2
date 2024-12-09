"use client";

import apiClient from "lib/api-client";
import { BellRing, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ContactDataTable } from "./contact-data-tables";
import ContactColumns from "./contact-columns";
import { DatePicker } from "antd";
import { Button } from "@/components/ui/button";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";

const { RangePicker } = DatePicker;

export const ContactDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useUserAccessToken();
  const [dates, setDates] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const start = searchParams.get("startDate");
  const end = searchParams.get("endDate");

  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  useEffect(() => {
    if (start && end) {
      setStartDate(start);
      setEndDate(end);
      setDates([dayjs(start), dayjs(end)]);
    }
  }, [start, end]);

  const fetchContactData = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const url =
        startDate && endDate
          ? `/send/get-all?startDate=${startDate}&endDate=${endDate}`
          : "/send/get-all";
      const { data } = await apiClient.get(url, config);
      setData(data?.contacts || []);
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const unSeenItems = data?.filter((item) => !item.seen);

  const handleShowButtonClick = () => {
    if (dates.length === 2) {
      const [start, end] = dates;
      router.push(
        `/teacher/contacts?startDate=${start.format("YYYY-MM-DD")}&endDate=${end.format("YYYY-MM-DD")}`,
      );
      setStartDate(start.format("YYYY-MM-DD"));
      setEndDate(end.format("YYYY-MM-DD"));
    }
  };

  const handleDateChange = (values) => {
    setDates(values);
  };

  const handleClearButtonClick = () => {
    setDates([]);
    setStartDate(null);
    setEndDate(null);
    router.push("/teacher/contacts");
  };

  if (loading) {
    return (
      <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md">
        <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-4">
          <div className="relative">
            <BellRing className="h-9 w-9" />
            {unSeenItems?.length > 0 && (
              <div className="absolute -right-2 -top-1 rounded-full bg-red-500 px-2 text-white">
                {unSeenItems.length}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-medium">Notifications</h1>
        </div>
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
      <ContactDataTable
        columns={ContactColumns}
        data={data}
        startDate={startDate}
        endDate={endDate}
      />
    </section>
  );
};
