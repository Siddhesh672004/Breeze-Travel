// routes/hotel.js
const express = require("express");
const router = express.Router();
const Hotel = require("../model/hotel.model");
const { v4: uuid } = require("uuid");

// Your hotels data object here (paste it or import from a file)
const hotelsData = require("../data/hotels"); // or define inline

router.post("/add-hotels", async (req, res) => {
  try {
    // Optional: Generate fresh UUIDs
    const hotelsToInsert = hotelsData.data.map((hotel) => ({
      ...hotel,
      id: uuid(),
    }));

    await Hotel.insertMany(hotelsToInsert);
    res.status(201).json({ message: "Hotels inserted successfully" });
  } catch (error) {
    console.error("Error inserting hotels:", error);
    res.status(500).json({ error: "Server error while inserting hotels" });
  }
});

module.exports = router;
