import { PaymentList } from "@/components/dashboard/analytics/payments/payment-list";
import React from "react";

const PaymentListPage = ({ searchParams }) => {
  return (
    <PaymentList
      startDate={searchParams?.startDate}
      endDate={searchParams?.endDate}
    />
  );
};

export default PaymentListPage;
