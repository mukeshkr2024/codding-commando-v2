require("dotenv").config(); // Load .env file if it exists

const requiredEnvVars = [
  "PORT",
  "MONGO_INITDB_ROOT_USERNAME",
  "MONGO_INITDB_ROOT_PASSWORD",
  "MONGO_INITDB_DATABASE",
  "ACTIVATION_SECRET",
  "JWT_KEY",
  "RAZORPAY_API_KEY_SECRET",
  "RAZORPAY_API_SECRET_KEY",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SERVICE",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "AWS_BUCKET_NAME",
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "FAST2SMS_API_URL",
  "FAST2SMS_API_KEY",
];

// Function to check and log environment variables
const checkEnvVariables = () => {
  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    console.error(
      "Error: Missing required environment variables:",
      missingVars.join(", ")
    );
    process.exit(1); // Exit if variables are missing
  } else {
    console.log("All required environment variables are set.");
  }

  // Log all environment variables (For debugging, avoid in production)
  console.log("Environment Variables:", process.env);
};

module.exports = checkEnvVariables;
