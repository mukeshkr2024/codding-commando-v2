const Contact = require("../models/contact.model");
const { isValidObjectId } = require("../utils");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");

const createContact = async (data) => {
  const { firstName, lastName, phone, email, message, type } = data;

  if (!firstName || !lastName || !phone || !email || !message || !type) {
    throw new ErrorHandler("Please provide all required fields", 400);
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
    throw new ErrorHandler("Invalid phone number", 400);
  }

  if (type === "Demo") {
    const existingEmailContact = await Contact.findOne({ email });
    if (existingEmailContact) {
      throw new Error("You have already registered for demo");
    }

    const existingPhoneContact = await Contact.findOne({ phone });
    if (existingPhoneContact) {
      throw new Error("You have already registered for demo");
    }
  }

  const contact = await Contact.create({
    firstName,
    lastName,
    phone,
    email,
    message,
    Type: type,
  });

  if (!contact) {
    throw new ErrorHandler("Failed to create a contact record", 500);
  }

  const mailData = { user: { name: firstName } };
  const template = type === "Contact" ? "contact-mail.ejs" : "demo-mail.ejs";

  try {
    await sendMail({
      email: contact.email,
      subject: "Contact Information",
      template,
      data: mailData,
    });

    return contact;
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};

const getAllContacts = async (req) => {
  try {
    const { startDate, endDate } = req.query;

    let results;

    if (startDate && endDate) {
      // Fetch results within the specified date range
      results = await Contact.find({
        createdAt: { $gte: startDate, $lte: endDate },
      })
        .sort({ createdAt: -1 })
        .exec();
    } else {
      // Fetch all results if no date range is specified
      results = await Contact.find({}).sort({ createdAt: -1 }).exec();
    }

    // const results = await Contact.find({}).sort({ createdAt: -1 }).exec();

    // Sort the results based on the 'seen' property
    results.sort((a, b) => (a.seen === b.seen ? 0 : a.seen ? 1 : -1));

    return results;
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};

const getContactById = async (id) => {
  try {
    if (!isValidObjectId(id)) {
      throw new ErrorHandler("Invalid contact ID", 400);
    }
    return await Contact.findByIdAndUpdate(id, {
      seen: true,
    });
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};

module.exports = { createContact, getAllContacts, getContactById };
