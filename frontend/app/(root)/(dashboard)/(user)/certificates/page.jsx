import { WelcomeCard } from "@/components/dashboard/welcome-card";

const Certficates = () => {
  return (
    <div className="w-full px-6 md:px-12">
      <div className="mt-4 flex w-full flex-col gap-8 sm:flex-row">
        <div className="sm:mt-12">
          <WelcomeCard />
        </div>
        <div className="flex w-full flex-col gap-5">
          <h3 className="text-xl font-semibold text-[#0f1A72A] sm:text-2xl">
            Your Certificates
          </h3>
          <div>
            <p className="text-slate-500">
              You haven&apos;t completed any course yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certficates;
