import { InfoCard } from "@/components/dashboard/infoCard";
import { WelcomeCard } from "@/components/dashboard/welcome-card";

const infoItems = [
  {
    id: 1,
    label: "My Courses",
    description: "Explore, track and access your purchased courses here!",
    icon: "/assets/icons/course-icon.svg",
    href: "/my-courses",
  },
  {
    id: 2,
    label: "Profile Details",
    description:
      "View and update your personal information.Keep yourself updated!",
    icon: "/assets/icons/profile-icon.svg",
    href: "/profile",
  },
  {
    id: 3,
    label: "My Purchase and invoices",
    description: "Manage and view all your purchases.",
    icon: "/assets/icons/invoice-icon.svg",
    href: "/invoices",
  },
  {
    id: 4,
    label: "Download Certificate",
    description: "Access your verified certificate and download",
    icon: "/assets/icons/certificate-icon.svg",
    href: "/certificates",
  },
];

const DashboardPage = () => {
  return (
    <div className="px-6 md:px-12 lg:px-16">
      <div className="mt-4 flex flex-col gap-6 sm:flex-row">
        <div className="sm:mt-12">
          <WelcomeCard />
        </div>
        <div className="flex flex-col gap-6  sm:px-8 lg:gap-4 ">
          <h3 className="text-2xl font-semibold text-[#0F172A]">Dashboard</h3>
          <div className="mb-10 grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-2">
            {infoItems &&
              infoItems.map((item) => (
                <InfoCard
                  label={item.label}
                  key={item.id}
                  description={item.description}
                  icon={item.icon}
                  href={item.href}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
