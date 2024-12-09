import QueryProvider from "Providers/query-providers";
import { Syne } from "next/font/google";
import Script from "next/script";
import ToastProvider from "../components/providers/toast-providers";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Coding commando",
  description: "A Learning management web app",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={syne.className}>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-5DZFG9SQ"
              height="0"
              width="0"
              style="display:none;visibility:hidden"
           / >`,
            }}
          />
          <Script id="google-tag-manager">
            {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5DZFG9SQ');
        `}
          </Script>
          <QueryProvider>
            <ToastProvider />
            <main>{children}</main>
          </QueryProvider>
        </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
