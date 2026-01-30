const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  
  client.publish("iot/sensor/sensor-01/temperature", "33.5", () => {
    console.log("Message sent!");
    client.end();
  });
});
