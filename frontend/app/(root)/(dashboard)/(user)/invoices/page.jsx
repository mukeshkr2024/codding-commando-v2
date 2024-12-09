"use client";

import { useEffect, useState } from "react";
import apiClient from "lib/api-client";
import { WelcomeCard } from "@/components/dashboard/welcome-card";
import { InvoicesDataTable } from "@/components/dashboard/invoices/data-table";
import { ErrorToast } from "@/components/error-toast";
import { Invoicecolumns } from "@/components/dashboard/invoices/columns";
import { Loader2 } from "lucide-react";
import { useUserAccessToken } from "features/users/hooks/use-user-accessToken";

const InvoicePage = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const { authToken } = useUserAccessToken();
  const [loading, setLoading] = useState(true);

  const fetchInvoiceData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const response = await apiClient.get("/users/invoices", config);
      setInvoiceData(response.data?.details);
      setLoading(false);
    } catch (error) {
      ErrorToast(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchInvoiceData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  return (
    <div className="w-full px-6 md:px-12">
      <div className="mt-4 flex w-full flex-col gap-8 sm:flex-row">
        <div className="sm:mt-12">
          <WelcomeCard />
        </div>
        <div className="flex w-full flex-col gap-5">
          <h3 className="text-xl font-semibold text-[#0F172A] sm:text-2xl">
            My Purchases and invoices
          </h3>
          <div>
            {loading ? (
              <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center rounded-md">
                <Loader2 className="h-16 w-16 animate-spin text-sky-700" />
              </div>
            ) : (
              <InvoicesDataTable
                columns={Invoicecolumns}
                data={invoiceData?.paymentHistory}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
