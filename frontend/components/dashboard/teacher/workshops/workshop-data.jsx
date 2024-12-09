"use client";

import apiClient from "lib/api-client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import { Button } from "@/components/ui/button";
import WorkshopColumns from "./workshop-column";
import { WorkshopDataTable } from "./workshop-data-table";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const { RangePicker } = DatePicker;

export const WorkShopData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authToken } = useUserAccessToken();
  const [dates, setDates] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchContactData = async (startDate, endDate) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const url =
        startDate && endDate
          ? `/workshop/get-details?startDate=${startDate}&endDate=${endDate}`
          : "/workshop/get-details";
      const { data } = await apiClient.get(url, config);
      setData(data?.workshops);
    } catch (error) {
      // toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      fetchContactData();
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLoad]);

  const handleShowButtonClick = () => {
    fetchContactData(dates[0], dates[1]);
  };

  const handleDateChange = (values) => {
    setDates(values);
  };

  const handleClearButtonClick = () => {
    setDates([]);
    fetchContactData();
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
          <h1 className="text-2xl font-medium">Worshop Details</h1>
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

      <WorkshopDataTable columns={WorkshopColumns} data={data} />
    </section>
  );
};
