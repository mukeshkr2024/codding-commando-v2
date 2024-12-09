import React from "react";

const sections = [
  {
    title: "Course Access",
    content: [
      "Access to coding courses is granted upon enrollment and payment of the specified fees.",
      "Courses are for personal use only and may not be shared, resold, or distributed.",
    ],
  },
  {
    title: "User Responsibilities",
    content: [
      "You are responsible for providing accurate and current information during the registration process.",
      "Maintaining the confidentiality of your account credentials is your responsibility.",
    ],
  },
  {
    title: "Code of Conduct",
    content: [
      "Respectful and courteous behavior is expected in all interactions within the Coding Commando community.",
      "Any form of harassment or misuse of the platform is strictly prohibited.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "All course content, including videos, materials, and assessments, is the intellectual property of Coding Commando.",
      "Unauthorized reproduction or distribution of course content is not permitted.",
    ],
  },
  {
    title: "Payment and Refunds",
    content: [
      "Payment for courses is due upon enrollment.",
      "Refund requests must be submitted within the specified timeframe and are subject to review.",
    ],
  },
  {
    title: "Technical Requirements",
    content: [
      "It is your responsibility to ensure that your device meets the necessary technical requirements for accessing our courses.",
    ],
  },
  {
    title: "Modifications to Courses",
    content: [
      "Coding Commando reserves the right to update or modify course content, structure, or materials as deemed necessary.",
    ],
  },
  {
    title: "Termination of Access",
    content: [
      "Coding Commando may terminate your access to courses if there is a violation of these terms or for any other reason.",
    ],
  },
  {
    title: "Privacy Policy",
    content: [
      "Information collected during the registration process is subject to our Privacy Policy, outlining how we collect, use, and store your data.",
    ],
  },
  {
    title: "Updates to Terms and Conditions",
    content: [
      "Coding Commando may update these terms and conditions at any time, and users are responsible for checking for updates regularly.",
    ],
  },
];

const Privacy = () => {
  return (
    <div className="min-h-screen w-full bg-dark-purple p-4 lg:p-12">
      <div className="mx-auto w-full rounded bg-dark-purple p-6 text-white shadow">
        <h1 className="mb-6 text-3xl font-bold">Terms and Conditions</h1>

        <h3 className="max-w-5xl">
          Welcome to Coding Commando, your go-to e-learning platform for coding
          courses. By using our website and enrolling in our coding courses, you
          agree to comply with the following terms and conditions:
        </h3>

        {sections.map((section, index) => (
          <section key={index}>
            <h2 className="mb-3 mt-2 text-xl font-semibold">{`${index + 1}. ${
              section.title
            }`}</h2>
            {section.content.map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </section>
        ))}

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
