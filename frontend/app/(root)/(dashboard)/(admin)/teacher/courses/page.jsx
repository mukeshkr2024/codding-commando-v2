/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { columns } from "@/components/dashboard/courses/columns";
import { DataTable } from "@/components/dashboard/courses/data-tables";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const CoursesPage = () => {
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
      const response = await apiClient.get("/courses", config);
      setData(response.data?.courses);
    } catch (error) {
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

export default CoursesPage;
