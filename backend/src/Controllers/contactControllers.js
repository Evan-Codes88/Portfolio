import Contact from "../models/ContactModel.js";
import nodemailer from "nodemailer";

// Get all contact submissions
export const getAllContacts = async (request, response) => {
  try {
    const contacts = await Contact.find();
    response.json(contacts);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

// Get a single contact submission by ID
export const getContactById = async (request, response) => {
  try {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
      return response.status(404).json({ message: "Contact not found" });
    }
    response.json(contact);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

// Create a contact submission
export const createContact = async (request, response) => {
  const { name, email, message } = request.body;
  if (!name || !email || !message) {
    return response.status(400).json({ message: "All fields are required" });
  }

  const contact = new Contact({ name, email, message });
  try {
    const newContact = await contact.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    response.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

// Update a contact submission
export const updateContact = async (request, response) => {
  try {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
      return response.status(404).json({ message: "Contact not found" });
    }

    const { name, email, message } = request.body;
    if (name) contact.name = name;
    if (email) contact.email = email;
    if (message) contact.message = message;

    const updatedContact = await contact.save();
    response.json(updatedContact);
  } catch (err) {
    response.status(400).json({ message: err.message });
  }
};

// Delete a contact submission
export const deleteContact = async (request, response) => {
  try {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
      return response.status(404).json({ message: "Contact not found" });
    }

    await contact.deleteOne();
    response.json({ message: "Contact deleted" });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};