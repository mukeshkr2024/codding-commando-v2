import Link from "next/link";
import React from "react";

const Privacy = () => {
  const sections = [
    {
      title: "Information We Collect",
      content: [
        "During the registration process, we collect personal information such as your name, email address, and other relevant details.",
        "When you enroll in coding courses, we may collect payment information, including credit card details, to process transactions.",
        "We gather information about how you interact with our Website, including your IP address, browser type, pages visited, and other analytics data.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "Personal information is used to grant you access to our coding courses and provide you with a personalized learning experience.",
        "We may use your email address to send important updates, announcements, and information related to your courses.",
        "Payment information is used solely for processing transactions related to course enrollment.",
        "Usage data helps us analyze and improve our services, ensuring a better user experience for our community.",
        "We employ security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.",
      ],
    },
    {
      title: "Information Sharing",
      content: [
        "We may share your information with trusted third-party service providers who assist us in delivering and improving our services.",
        "We may disclose personal information to comply with legal obligations or respond to lawful requests and legal processes.",
      ],
    },
    {
      title: "Your Choices",
      content: [
        "You can access and update your personal information through your account settings on the Website.",
        "You can opt-out of receiving non-essential communications by following the instructions provided in the communication.",
      ],
    },
    {
      title: "Data Retention",
      content: [
        "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.",
      ],
    },
    {
      title: "Changes to the Privacy Policy",
      content: [
        "We may update this Privacy Policy periodically to reflect changes in our practices. We will notify you of any material changes by posting the updated policy on the Website.",
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full bg-dark-purple p-4 lg:p-12">
      <div className="mx-auto w-full rounded bg-dark-purple p-6 text-white shadow">
        <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

        <h3 className="max-w-5xl">
          Coding Commando (referred to as Owner) is committed to protecting the
          privacy of our users. This Privacy Policy outlines how we collect,
          use, disclose, and safeguard your personal information when you use
          our e-learning platform for coding courses, accessible at
          coddingcommando.in website. By accessing or using our services, you
          consent to the terms outlined in this Privacy Policy.
        </h3>

        {sections.map((section, index) => (
          <section key={index}>
            <h2 className="mb-3 mt-2 text-xl font-semibold">{section.title}</h2>
            {section.content.map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </section>
        ))}

        <h4 className="mb-3 mt-2 text-xl font-semibold">Contact Us</h4>
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy, please contact us at{" "}
          <Link href="mailto:join@codingcommando.in">
            join@codingcommando.in
          </Link>
          .
        </p>

        <p className="mt-6 max-w-5xl">
          By using Coding Commando&apos;s e-learning platform, you acknowledge
          that you have read, understood, and agree to abide by these terms and
          conditions. If you do not agree, please refrain from using our
          platform and services.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
