import React from "react";

const refundSections = [
  {
    title: "Timeframe for Refund Requests",
    content: [
      "100% refund is available if the refund request is submitted within 7 days of the course start date.",
      "After the initial 7 days of the batch start, fees are non-refundable under any circumstances.",
    ],
  },
  {
    title: "Procedure to Claim '7-Days No Question Asked' Refund",
    content: [
      "Send an email to join@codingcommando.in with the subject 'Online Course Refund | Registered Email ID' within seven days of the batch start date.",
      "Provide a valid reason for the refund (for internal purposes only).",
    ],
  },
  {
    title: "Refund Processing",
    content: [
      "Refunds will be processed within 25 working days of receiving the refund email.",
    ],
  },
  {
    title: "Batch Shifting",
    content: [
      "Batches can be transferred to the immediate next batch (Same Course) within 10 days of the batch starting date.",
    ],
  },
  {
    title: "Customer Service Assistance",
    content: [
      "Our Customer Service Specialists are available to assist you. Call (Rajnish No) between 11 am to 5 pm from Tuesday to Friday.",
    ],
  },
  {
    title: "Refunds for Duplicate Payment",
    content: [
      "Refund of duplicate payments will be processed via the same source (original method of payment) within 25 working days post intimation by the customer.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <div>
      {" "}
      <div className="min-h-screen w-full bg-dark-purple p-4 lg:p-12">
        <div className="mx-auto w-full rounded bg-dark-purple p-6 text-white shadow">
          <h1 className="mb-6 text-3xl font-bold">Refunds Policy</h1>

          <h3 className="max-w-5xl">
            We strive to ensure your satisfaction with our online courses at
            Coding Commando. Our refund policy is designed to be fair and
            transparent. Please review the following details regarding refunds:
          </h3>

          {refundSections.map((section, index) => (
            <section key={index} className="max-w-5xl">
              <h2 className="mb-3 mt-2 text-xl font-semibold">
                {section.title}
              </h2>
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </section>
          ))}

          <h3 className="mt-6 max-w-5xl">
            Please note that all refunds will be processed within 25 working
            days after the refund request is approved by Coding Commando. If you
            have any further questions or concerns, feel free to contact our
            customer support team.
          </h3>

          <h2 className="mt-6 max-w-5xl font-semibold">
            Thank you for choosing Coding Commando for your coding education. If
            you have any questions or concerns regarding our pricing or refund
            policies, please don&#39;t hesitate to contact our customer support
            team.
          </h2>
        </div>
      </div>
    </div>
  );
}
