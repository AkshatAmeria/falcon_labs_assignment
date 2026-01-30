# Falcon Labs Assignment

This repository contains a simple **Node.js application** demonstrating **GET and POST operations** along with a **publisher script**. The project is lightweight and runs directly using Node without additional frameworks.

---

## 📦 Prerequisites

Make sure you have the following installed on your system:

* **Node.js** (v16+ recommended)
* **npm** (comes with Node.js)

Check installation:

```bash
node -v
npm -v
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AkshatAmeria/falcon_labs_assignment.git
cd falcon_labs_assignment
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

This will install all required Node.js packages listed in `package.json`.

---

### 3️⃣ Run the Server

Navigate to the `src` directory and start the server:

```bash
cd src
node server.js
```

The server should now be running locally.

---

## 🔁 API Operations

### ▶️ GET Operation

* Used to **retrieve data** from the server
* Can be tested using:

  * Browser
  * Postman
  * cURL

Using Postman:

<img width="1837" height="898" alt="image" src="https://github.com/user-attachments/assets/2b677f5d-6039-49cf-8574-8bee96e96f6b" />


---

### ▶️ POST Operation

* Used to **send data** to the server
* Typically accepts a JSON payload

Using Postman:

<img width="1841" height="897" alt="image" src="https://github.com/user-attachments/assets/f04f46cf-5cfa-4d70-ac1e-de81bf6978a8" />
<img width="1897" height="866" alt="image" src="https://github.com/user-attachments/assets/2763b2e6-5c23-4403-9d9a-b4dd550daa56" />


---

📡 MQTT Publish & Subscribe

This project uses MQTT (HiveMQ public broker) for real-time IoT-style communication.

### MQTT Publisher

File: src/services/publish.js

Run publisher:
cd src/services
```bash
node publish.js
```
```bash
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", () => {
  console.log("Connected to MQTT broker");

  
  client.publish("iot/sensor/sensor-01/temperature", "101", () => {
    console.log("Message sent!");
    client.end();
  });
});

```
<img width="941" height="104" alt="image" src="https://github.com/user-attachments/assets/e46381b1-145e-4039-b7b0-b75b1eb24425" />

<img width="1495" height="450" alt="image" src="https://github.com/user-attachments/assets/5676875b-849d-4901-89c8-146c5c5b8985" />

## MQTT Subscriber

Listens to all sensor temperature topics and stores data in MongoDB.

File: src/services/subscriber.js

```bash
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

```
<img width="1115" height="300" alt="image" src="https://github.com/user-attachments/assets/1e9e1b8b-025b-4146-9e42-a3bbe121a8dd" />



---

## 📁 Project Structure

```
falcon_labs_assignment/
│── node_modules/
│── src/
│ ├── models/
│ │ └── Schema.js # Mongoose schema for sensor data
│ ├── routes/
│ │ └── sensor.routes.js # REST API routes
│ ├── services/
│ │ ├── publish.js # MQTT publisher
│ │ └── subscriber.js # MQTT subscriber
│ ├── app.js # Express app setup
│ ├── server.js # Server entry point
│ |── .env # Environment variables
│── .gitignore
│── package.json
│── package-lock.json
│── README.md

```

---

## 🧠 Notes

* Keep the server running before executing `publish.js`
* Ensure ports are free before starting the server
* This project is intended for **assignment/demo purposes**

---

## 👨‍💻 Author

**Akshat Ameria**
GitHub: [https://github.com/AkshatAmeria](https://github.com/AkshatAmeria)

---

## ✅ Quick Start (TL;DR)

```bash
git clone https://github.com/AkshatAmeria/falcon_labs_assignment.git
npm install
cd src
node server.js
```

In another terminal:

```bash
cd src
node publish.js
```

---

Happy coding 🚀
