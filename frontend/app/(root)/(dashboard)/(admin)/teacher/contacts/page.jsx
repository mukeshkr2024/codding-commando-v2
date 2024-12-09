import { ContactDetails } from "@/components/dashboard/teacher/contacts/request-demo";
import { Suspense } from "react";

const contactDetailsPage = () => {
  return (
    <div className="p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <ContactDetails />
      </Suspense>
    </div>
  );
};

export default contactDetailsPage;
