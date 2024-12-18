const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
require("dotenv").config();

if (
  !process.env.AWS_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY
) {
  throw new Error(
    "AWS configuration is missing. Please check your environment variables."
  );
}

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Send an email using AWS SES
 * @param {string[]} toAddresses - Array of recipient email addresses
 * @param {string} subject - Email subject
 * @param {string} body - Email body text
 * @returns {Promise<void>}
 */
const sendMail = async (toAddresses, subject, body) => {
  if (!toAddresses || toAddresses.length === 0) {
    throw new Error("Recipient email addresses are required.");
  }

  const params = {
    Destination: {
      ToAddresses: toAddresses,
    },
    Message: {
      Body: {
        Text: {
          Data: body || "Hello there! Test...",
        },
      },
      Subject: {
        Data: subject || "Test Email",
      },
    },
    Source: "no-reply@codingcommando.in", // Replace with your verified SES email
  };

  try {
    const sendEmailCommand = new SendEmailCommand(params);
    const data = await ses.send(sendEmailCommand);
    console.log("Email sent successfully:", data.MessageId);
  } catch (error) {
    console.error("Failed to send email:", error.message);
    throw error; // Propagate the error for better debugging
  }
};

module.exports = sendMail;
