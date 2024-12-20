"use client";

import { columns } from "@/components/dashboard/enrollments/columns";
import { DataTable } from "@/components/dashboard/enrollments/data-tables";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import React, { useState, useEffect } from "react";

const Enrollments = () => {
  const [data, setData] = useState([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null);
  const { authToken } = useUserAccessToken();

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        const { data } = await apiClient.get("/enrollments", config);
        setData(data);
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <DataTable data={data || []} columns={columns} />
    </div>
  );
};

export default Enrollments;
