require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const User = require("../models/user.model");
const saltRounds = 10;

async function seedDatabase() {
  const students = [];

  for (let i = 0; i < 50; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email(firstName, lastName);
    const phone = faker.phone.number("##########"); // Generates a 10-digit number
    const password = await bcrypt.hash(faker.internet.password(), saltRounds);

    // Randomly assign createdAt date (current or past)
    const createdAt = faker.date.past(Math.random() * 5); // Up to 5 years in the past

    students.push({
      firstName,
      lastName,
      email,
      phone,
      password,
      createdAt,
      updatedAt: createdAt, // Set updatedAt to the same as createdAt for initial insert
      role: "student",
      isVerified: true,
      isBlocked: false,
    });
  }

  try {
    await User.insertMany(students);
    console.log("Seeded 50 students successfully!");
  } catch (error) {
    console.error("Error seeding students:", error);
  } finally {
    mongoose.connection.close(); // Close the connection
  }
}

module.exports = seedDatabase;
