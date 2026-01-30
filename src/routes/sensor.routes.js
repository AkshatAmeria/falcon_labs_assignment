const express = require("express");
const SensorReading = require("../models/Schema");

const router = express.Router();



router.get("/health" , async (req,res) => {
  res.send("OK");
})

router.post("/ingest", async (req, res) => {
  try {
    const { deviceId, temperature, timestamp } = req.body;

    if (!deviceId || temperature === undefined) {
      return res.status(400).json({
        error: "deviceId and temperature are required"
      });
    }

    const reading = await SensorReading.create({
      deviceId,
      temperature,
      timestamp: timestamp || Date.now()
    });

    res.status(201).json(reading);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:deviceId/latest", async (req, res) => {
  try {
    const { deviceId } = req.params;

    const latestReading = await SensorReading
      .findOne({ deviceId })
      .sort({ timestamp: -1 });

    if (!latestReading) {
      return res.status(404).json({
        error: "No readings found for this device"
      });
    }

    res.json(latestReading);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
