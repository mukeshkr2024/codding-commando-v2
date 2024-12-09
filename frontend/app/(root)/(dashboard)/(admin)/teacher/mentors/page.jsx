/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import apiClient from "lib/api-client";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/dashboard/mentors/data-tables";
import { columns } from "@/components/dashboard/mentors/columns";
import { Loader2 } from "lucide-react";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const MentorPage = () => {
  const [data, setData] = useState([]);
  const { authToken } = useUserAccessToken();
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await apiClient.get("/teams", config);

      setData(response.data?.mentors);
    } catch (error) {
      // toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md">
        <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default MentorPage;
