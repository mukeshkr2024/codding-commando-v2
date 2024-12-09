export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/teacher"],
      },
    ],
    sitemap: "",
  };
}
