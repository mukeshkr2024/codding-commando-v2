/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "utfs.io",
      "coddingbucket.s3.ap-south-1.amazonaws.com",
      "awsfileexchange.s3.ap-south-1.amazonaws.com",
      "coding-commando-videos.s3.us-east-1.amazonaws.com",
      "codingcommando.in",
    ],
  },
};

module.exports = nextConfig;
