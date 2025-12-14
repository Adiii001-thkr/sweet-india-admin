const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect("YOUR_MONGODB_ATLAS_URL")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Model
const Sweet = mongoose.model("Sweet", {
  name: String,
  price: Number
});

// Add sweet
app.post("/add", async (req, res) => {
  await Sweet.create(req.body);
  res.send("Sweet added");
});

// Get sweets
app.get("/all", async (req, res) => {
  const data = await Sweet.find();
  res.json(data);
});

app.listen(5000, () => console.log("Server running on 5000"));