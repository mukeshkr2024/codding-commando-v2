"use client";

import { columns } from "@/components/dashboard/students/columns";
import { DataTable } from "@/components/dashboard/students/data-tables";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";
import apiClient from "lib/api-client";
import { Download, Loader2 } from "lucide-react";
import { use, useEffect, useState } from "react";

const StudentsClient = ({ startDate, endDate }) => {
  const [data, setData] = useState([]);
  const { authToken } = useUserAccessToken();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  // Fetch data function
  const fetchData = async (url) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await apiClient.get(url, config);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally show a toast notification here
    }
  };

  // Fetch students data
  const loadStudentsData = async () => {
    setLoading(true);
    const url =
      startDate && endDate
        ? `/users/students?startDate=${startDate}&endDate=${endDate}&page=${currentPage}&limit=10&search=${searchQuery}`
        : `/users/students?page=${currentPage}&limit=10&search=${searchQuery}`;

    const result = await fetchData(url);
    if (result) {
      setData(result.students || []);
      setTotalPages(result.totalPages || 0);
    }
    setLoading(false);
  };

  // Use effect to load data initially
  useEffect(() => {
    loadStudentsData();
  }, [startDate, endDate, currentPage]); // Load initial data without search

  // Handle search action with delay
  const handleSearch = () => {
    setLoading(true); // Show loading indicator
    setTimeout(() => {
      loadStudentsData(); // Call the load function after delay
    }, 2000); // Delay of 2 seconds
  };

  // Download data function
  const fetchDownloadData = async () => {
    const url =
      startDate && endDate
        ? `/users/students/data-download?startDate=${startDate}&endDate=${endDate}`
        : `/users/students/data-download`;

    setIsDownloading(true);
    const results = await fetchData(url);
    setIsDownloading(false);
    return results;
  };

  // Handle download action
  const handleDownload = async () => {
    const downloadData = await fetchDownloadData();
    if (!downloadData) return;

    const csvRows = [
      ["Serial No", "Name", "Email", "Phone"].join(","),
      ...downloadData.map((student, index) =>
        [
          index + 1,
          `${student.firstName} ${student.lastName}`,
          student.email,
          student.phone,
        ].join(","),
      ),
    ];

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `students_data_${Date.now()}.csv`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
      <div className="flex flex-col justify-between space-y-4 pb-4 md:flex-row md:items-center">
        <div className="flex gap-2">
          <Input
            placeholder="Find Students...."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-96"
          />
          <Button
            onClick={handleSearch}
            disabled={!searchQuery}
            className="w-24"
          >
            Search
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
      <DataTable
        columns={columns}
        data={data}
        inputEnabled={true}
        handleDownload={handleDownload}
        isDownloading={isDownloading}
      />
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

export default StudentsClient;
