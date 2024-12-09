import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <header className="fixed inset-y-0 z-50 h-[75px] w-full md:h-[80px]">
        <DashboardNavbar />
      </header>
      <main className="h-full pt-[80px]">{children}</main>
    </>
  );
};

export default DashboardLayout;
