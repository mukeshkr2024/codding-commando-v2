"use client";

import { columns } from "@/components/dashboard/enrollments/columns";
import { DataTable } from "@/components/dashboard/enrollments/data-tables";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { Download, Loader2 } from "lucide-react";
import React, { useState, useEffect, use } from "react";

const Enrollments = ({ searchParams }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useUserAccessToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const { startDate, endDate } = use(searchParams);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };

        const url =
          startDate && endDate
            ? `/enrollments?startDate=${startDate}&endDate=${endDate}&page=${currentPage}&limit=10`
            : `/enrollments?page=${currentPage}&limit=10`;

        const { data } = await apiClient.get(url, config);
        setData(data?.enrollments || []);
        setTotalPages(data?.totalPages || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, currentPage]);

  if (loading) {
    return (
      <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md">
        <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  const handleSearch = () => {};

  const handleDownload = () => {};

  return (
    <div className="p-6">
      <div className="flex w-full items-center justify-between pb-4">
        <div className="flex h-full gap-2">
          <Input
            placeholder="Find Enrollments...."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-96 cursor-pointer"
          />
          <Button
            onClick={handleSearch}
            disabled={!searchQuery}
            className="w-24 cursor-pointer"
          >
            Search
          </Button>
          <Button disabled={!searchQuery} className="w-24">
            Clear Filters
          </Button>
        </div>
        <Button
          className="flex items-center gap-2.5"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? "Downloading..." : "Download"} <Download />
        </Button>
      </div>
      <DataTable data={data || []} columns={columns} />
      <div className="mt-4 flex w-full justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous Page
        </Button>
        <span className="text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Enrollments;
