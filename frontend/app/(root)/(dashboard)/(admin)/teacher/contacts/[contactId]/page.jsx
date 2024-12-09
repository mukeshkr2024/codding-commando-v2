"use client";

import LoadingAnimation from "@/components/shared/loading-animation";
import { Card } from "@/components/ui/card";
import apiClient from "lib/api-client";
import { formatCreatedAtDate } from "lib/format";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const ContactPage = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const start = searchParams.get("startDate");
  const end = searchParams.get("endDate");

  const { authToken } = useUserAccessToken();

  const fetchContactData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await apiClient.get(`/send/${params.contactId}`, config);
      setData(response.data.contact);
    } catch (error) {
      // ErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  if (!data) {
    redirect("/teacher/contacts");
  }

  return (
    <div className="flex flex-col p-6">
      <Link
        href={`/teacher/contacts/${start && end ? `?startDate=${start}&endDate=${end}` : ""}`}
        className={`flex items-center gap-2 text-slate-700 hover:text-slate-500 ${
          data ? "" : "hidden"
        }`}
      >
        <ArrowLeft className="h-5 w-5" />
        <p className="text-xl">Go Back</p>
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h1 className="text-2xl font-medium text-slate-700">User Detail</h1>
          <Card className="mt-4 flex flex-col gap-2 p-4 text-base text-slate-700 shadow-md">
            <div className="flex items-center gap-2">
              <FiUser className="text-blue-500" size={18} />
              <p>
                Name: {data?.firstName} {data?.lastName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FiMail className="text-blue-500" size={18} />
              <p>Email: {data?.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-blue-500" size={18} />
              <p>Phone: {data?.phone}</p>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-blue-500" size={18} />
              <p>Date: {formatCreatedAtDate(data?.createdAt)}</p>
            </div>
          </Card>
        </div>
        <div>
          <h1 className="text-2xl font-medium text-slate-700">Message</h1>
          <Card className="mt-4 flex min-h-[155px] flex-col gap-2 p-4 text-base text-slate-700 shadow-md">
            <div className="flex items-center gap-2">
              <FiMessageSquare className="text-blue-500" size={18} />
              <p>{data?.message}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
