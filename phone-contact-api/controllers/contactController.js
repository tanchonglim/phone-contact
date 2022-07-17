const express = require("express");
const contactService = require("../services/contactService");

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    return res.json(contacts);
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

route.post("/", async (req, res) => {
  try {
    const { phone, name } = req.body;
    const newContact = await contactService.addContact({
      phone,
      name,
    });
    return res.status(201).json(newContact);
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;
    if (!id || !name || !phone) return res.status(400).json();
    const contact = await contactService.getContactById(+id);
    if (!contact) return res.status(404).json();
    await contactService.updateContact(+id, { name, phone });
    return res.json();
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json();
    const contact = await contactService.getContactById(+id);
    if (!contact) return res.status(404).json();
    await contactService.deleteContact(+id);
    return res.json();
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

module.exports = route;
