require("dotenv").config();
const unirest = require("unirest");

const API_URL = process.env.FAST2SMS_API_URL;
const AUTH_TOKEN = process.env.FAST2SMS_API_KEY;

function sendSMS(phone, activationCode) {
  return new Promise((resolve, reject) => {
    const req = unirest
      .post(API_URL)
      .headers({
        authorization: AUTH_TOKEN,
      })
      .form({
        variables_values: activationCode,
        route: "otp",
        numbers: phone,
      })
      .end((res) => {
        if (res.error) {
          reject(new Error(res.error));
        } else {
          resolve(res.body);
        }
      });
  });
}

module.exports = sendSMS;
