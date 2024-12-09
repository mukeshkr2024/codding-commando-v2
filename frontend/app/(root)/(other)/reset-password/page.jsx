import { ResePasswordForm } from "@/components/shared/form/reset-password-form";
import Image from "next/image";
import Link from "next/link";

const ResetPasswordPage = ({ searchParams }) => {
  return (
    <div className="flex h-screen min-h-[600px] w-full items-center justify-center bg-[#eeeeee]">
      <div className="flex max-w-lg flex-col gap-5 rounded-lg bg-white py-6">
        <Link href="/" className="flex w-full items-center justify-center ">
          <Image
            src="/dashboard-icon.svg"
            height={180}
            width={180}
            alt="Coding commando"
          />
        </Link>
        <div className="border-b border-[#E2E8F0]" />
        <div className="flex flex-col gap-5 px-12">
          <h3 className="text-center text-3xl font-semibold text-[#2C2C2C]">
            Reset Password
          </h3>
          <p className="text-center text-xl text-[#2C2C2C]">
            Enter your new password below to change your password
          </p>
          <ResePasswordForm token={searchParams?.token} />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
