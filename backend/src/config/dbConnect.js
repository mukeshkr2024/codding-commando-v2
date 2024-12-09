require("dotenv").config();
const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URL;

const dbConnect = async () => {
  console.log("dbUrl: " + dbUrl);

  try {
    // Await the connection to the database
    const data = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected with host: ${data.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);

    // Retry connection after 5 seconds if there's an error
    setTimeout(dbConnect, 5000);
  }
};

module.exports = dbConnect;
