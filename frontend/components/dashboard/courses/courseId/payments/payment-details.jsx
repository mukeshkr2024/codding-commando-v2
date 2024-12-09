import { IconBadge } from "@/components/icon-bagde";
import { CircleDollarSign } from "lucide-react";
import FullPriceForm from "./full-price-form";
import InstallMentPriceForm from "./installment-price-form";
import { PaymentCourseImage } from "./couse-payment-imageForm";
import { PaymentDescriptionForm } from "./payment-description-form";
import InstallmentSwitch from "./installment-switch";

export const PaymentDetails = ({ initialData, courseId, onUpdateSucess }) => {
  const handleInstallmentModeSuccess = () => {
    onUpdateSucess();
  };

  return (
    <div>
      <div className=" flex items-center gap-x-2">
        <IconBadge icon={CircleDollarSign} />
        <h2 className="text-xl">Sell your course</h2>
      </div>
      <FullPriceForm
        initialData={initialData}
        courseId={courseId}
        onSuccess={handleInstallmentModeSuccess}
      />
      <InstallmentSwitch
        initialData={initialData}
        courseId={courseId}
        onSuccess={handleInstallmentModeSuccess}
      />
      {initialData?.enabledInstallement && (
        <InstallMentPriceForm
          initialData={initialData}
          courseId={courseId}
          onSuccess={handleInstallmentModeSuccess}
        />
      )}
      <PaymentDescriptionForm
        initialData={initialData}
        courseId={courseId}
        onSuccess={handleInstallmentModeSuccess}
      />
      <PaymentCourseImage
        initialData={initialData}
        courseId={courseId}
        onSuccess={handleInstallmentModeSuccess}
      />
    </div>
  );
};
