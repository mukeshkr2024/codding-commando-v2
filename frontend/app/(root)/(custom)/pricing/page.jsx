import React from "react";

export const metadata = {
  title: "Transparent Pricing Policy: Coding Commando",
  description:
    "Discover our transparent pricing policy at Coding Commando. Fairness and clarity guaranteed. Learn more.",
  alternates: {
    canonical: "https://codingcommando.in",
  },
  openGraph: {
    title: "Transparent Pricing Policy: Coding Commando",
    description:
      "Discover our transparent pricing policy at Coding Commando. Fairness and clarity guaranteed. Learn more.",
    url: "https://codingcommando.in",
    siteName: "Coding Commando",
    Locale: "en_IN",
    type: "website",
    images: "https://codingcommando.in/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transparent Pricing Policy: Coding Commando",
    description:
      "Discover our transparent pricing policy at Coding Commando. Fairness and clarity guaranteed. Learn more.",
  },
};

const sections = [
  {
    title: "Price Range",
    content: [
      "Coding Commando offers customized pricing based on the specific services provided. Details regarding pricing are communicated to you in advance, taking into consideration the effort, efficiency, and the anticipated outcomes of the service. Typically, the transaction range on our website varies from INR 2000/- to 50,000/-. ",
    ],
  },
  {
    title: "Schedule of Payment",
    content: [
      "Certain services provided by Coding Commando may have fixed durations, and these are explicitly stated in the service descriptions. The duration of usage for such services can range from 15 days to 1 year.",
    ],
  },
  {
    title: "Price Matching",
    content: [
      "At Coding Commando, we are committed to providing you with the most competitive prices in the industry. ",
    ],
  },
  {
    title: "Pricing Errors",
    content: [
      "While we make diligent efforts to ensure the accuracy of pricing information, errors may still occur. If the price of a course is higher than initially displayed, we will cancel the order for that item and promptly notify you of the cancellation. ",
    ],
  },
  {
    title: "Shopping Cart",
    content: [
      "The prices displayed in your Shopping Cart reflect the current price shown on the item's product details page. Please be aware that this price may differ from the initial price displayed when the item was first added to your Shopping Cart. ",
    ],
  },
];

export default function PricingPage() {
  return (
    <div>
      {" "}
      <div className="min-h-screen w-full bg-dark-purple p-4 lg:p-12">
        <div className="mx-auto w-full rounded bg-dark-purple p-6 text-white shadow">
          <h1 className="mb-6 text-3xl font-bold">Pricing & Refund Policy</h1>

          <h3 className="max-w-5xl">
            Thank you for choosing Coding Commando for your coding and
            programming course needs. We are dedicated to providing you with a
            rewarding experience as you explore, evaluate, and enroll in our
            courses, whether they are delivered online or in a classroom
            setting. Similar to any online purchase, there are terms and
            conditions that govern our Refund Policy. By purchasing a training
            course from Coding Commando, you agree to abide by our Privacy
            Policy, Terms of Use, and refund policy.
          </h3>

          {sections.map((section, index) => (
            <section key={index} className="max-w-5xl">
              <h2 className="mb-3 mt-2 text-xl font-semibold">
                {section.title}
              </h2>
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </section>
          ))}

          <h2 className="mt-6 max-w-5xl font-semibold">
            Important- Our services are offered for personal reference and are
            not intended for resale. Therefore, Coding Commando reserves the
            right to refuse sales to any individual believed to be purchasing
            for the purpose of resale.{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}
