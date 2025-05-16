const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Schema
const RequestSchema = new mongoose.Schema({
  type: String,
  fullname: String,
  address: String,
  phone: String,
  signature: String,
  createdAt: { type: Date, default: Date.now },
});

const RequestModel = mongoose.model("Request", RequestSchema);

// Middleware
app.use(cors({
  origin: "https://form-e-service.vercel.app",
  methods: ["GET", "POST"]
}));
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("✅ API server is running!");
});

app.post("/api/request", async (req, res) => {
  try {
    const { type, fullname, address, phone, signature } = req.body;
    const newRequest = new RequestModel({ type, fullname, address, phone, signature });
    await newRequest.save();
    res.status(201).json({ message: "✅ Request saved" });
  } catch (error) {
    res.status(500).json({ error: "❌ Error saving request" });
  }
});

app.get("/api/requests", async (req, res) => {
  try {
    const requests = await RequestModel.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "❌ Error fetching requests" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});