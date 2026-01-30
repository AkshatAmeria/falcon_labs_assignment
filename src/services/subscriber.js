const mqtt = require("mqtt");
const SensorReading = require("../models/Schema");

const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on("connect", () => {
  console.log("MQTT connected");

  client.subscribe("iot/sensor/+/temperature", () => {
    console.log("Subscribed to iot/sensor/+/temperature");
  });
});

client.on("message", async (topic, message) => {
  try {
    // topic: iot/sensor/<deviceId>/temperature
    const deviceId = topic.split("/")[2];
    const temperature = parseFloat(message.toString());

    if (isNaN(temperature)) return;

    await SensorReading.create({
      deviceId,
      temperature,
      timestamp: Date.now()
    });

    console.log(`Saved MQTT data for ${deviceId}`);
  } catch (err) {
    console.error("MQTT Error:", err.message);
  }
});
