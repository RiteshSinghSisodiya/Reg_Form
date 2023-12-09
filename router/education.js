const express = require("express");
const router = express.Router();
const {Education} = require("../model/education");

// GET all education records
router.get("/", async (req, res) => {
  try {
    const education = await Education.find();
    res.send(education);
  } catch (error) {
    console.error("Error fetching education records:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST a new education record
router.post("/", async (req, res) => {
  try {
    // Extract data from the request body
    const educationData = req.body;

    // Validate that educationData is an array
    if (!Array.isArray(educationData) || educationData.length === 0) {
      return res.status(400).send("Invalid data format");
    }

    // Create a new education record
    const newEducation = new Education({
      education: educationData,
    });

    // Save the new education record to the database
    const savedEducation = await newEducation.save();

    res.status(201).send(savedEducation);
  } catch (error) {
    console.error("Error creating education record:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
