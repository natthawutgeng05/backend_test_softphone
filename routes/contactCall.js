const express = require("express");
const router = express.Router();
const Contact = require("../models/contactCall");

// POST: Create a new contact
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: Retrieve all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve a specific contact by ID
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update a specific contact by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { id: req.params.id }, // ค้นหาตาม id ที่เป็น custom field
      req.body, // ข้อมูลที่ต้องการอัปเดต
      { new: true } // ส่งคืนข้อมูลหลังจากอัปเดต
    );
    
    if (!updatedContact) return res.status(404).json({ message: "Contact not found" });
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a specific contact by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve a specific contact by custom ID (not MongoDB _id)
router.get('/by-id/:id', async (req, res) => {
  try {
      const contact = await Contact.findOne({ id: req.params.id });
      if (!contact) return res.status(404).json({ message: "Contact not found" });
      res.json(contact);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// DELETE: Delete a specific contact by custom ID (not MongoDB _id)
router.delete("/by-id/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({ id: req.params.id });
    
    if (!deletedContact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
