import { ContactForm } from "@/components/shared/form/contact-form";

export const metadata = {
  title: "Get in Touch: Contact Us at Coding Commando",
  description:
    "Reach out to us at Coding Commando for inquiries or any assistance. We're here to support you on your coding journey.Contact us now",
  alternates: {
    canonical: "https://codingcommando.in/contact-us",
  },
  openGraph: {
    title: "Get in Touch: Contact Us at Coding Commando",
    description:
      "Reach out to us at Coding Commando for inquiries or any assistance. We're here to support you on your coding journey.Contact us now",
    url: "https://codingcommando.in/contact-us",
    siteName: "Coding Commando",
    Locale: "en_IN",
    type: "website",
    images: "https://codingcommando.in/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get in Touch: Contact Us at Coding Commando",
    description:
      "Reach out to us at Coding Commando for inquiries or any assistance. We're here to support you on your coding journey.Contact us now",
  },
};


const ContactPage = () => {
  const backgroundStyles = {
    backgroundImage: "url(/making-sense.svg)",
    backgroundPosition: "bottom",
    objectFit: "cover",
  };

  const gridStyles = {
    backgroundImage: 'url("/assets/images/grid.png")',
  };

  return (
    <div
      className="relative max-h-[700px] w-full bg-dark-purple bg-center bg-no-repeat px-4 pb-16 pt-8 transition-all"
      style={backgroundStyles}
    >
      <div
        className="absolute right-0 h-full w-1/2 bg-contain"
        style={gridStyles}
      />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
