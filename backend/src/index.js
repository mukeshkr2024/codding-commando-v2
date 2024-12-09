require("dotenv").config();
const app = require("./app/app");
const checkEnvVariables = require("./config/checkEnv");
const dbConnect = require("./config/dbConnect");

checkEnvVariables();

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log("Server listening on port", PORT);
  dbConnect();
});
