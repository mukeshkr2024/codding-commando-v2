import { ProtectDashboardLayout } from "@/components/dashboard/dashboard-protected-layout";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const DashboardLayout = ({ children }) => {
  return (
    <ProtectDashboardLayout>
      <main className={(`h-full`, inter.className)}>{children}</main>
    </ProtectDashboardLayout>
  );
};

export default DashboardLayout;
