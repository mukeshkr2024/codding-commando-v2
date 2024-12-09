import { AnalyticsDetails } from "@/components/dashboard/analytics/analytics-details";

const AnalyticsPage = ({ searchParams }) => {
  return (
    <AnalyticsDetails
      start={searchParams?.startDate}
      end={searchParams?.endDate}
    />
  );
};

export default AnalyticsPage;
