require('dotenv').config();
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");


app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('Error: MONGO_URI is not defined in the .env file');
  process.exit(1); // Exit the application if MONGO_URI is missing
}
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
// const { MongoClient } = require('mongodb'); // MongoDB client for database access
// const express = require('express');
// const cors = require('cors');

// // Load environment variables locally (only for local testing)
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

// // Initialize Express app
// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// const mongoUri = process.env.MONGO_URI;
// if (!mongoUri) {
//   console.error('Error: MONGO_URI is not defined');
//   throw new Error('MONGO_URI is required in the environment variables');
// }

// const client = new MongoClient(mongoUri);


// Root Route
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// Define the Section schema and model
const sectionSchema = new mongoose.Schema({
  ipc_section: {
    type: String,
    required: true,
  },
  bns_section: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: [String],  // Array of strings
    required: true,
  },
  keywords: {
    type: [String],  // Array of strings
    required: true,
  },
});

const Section = mongoose.model("Section", sectionSchema);

// API Endpoint to Get All Sections
app.get('/allsections', async (req, res) => {
  try {
    let sections = await Section.find({});
    console.log("All Sections Fetched");
    res.status(200).json(sections);  // Send a JSON response
  } catch (error) {
    console.error("Error fetching sections:", error);
    res.status(500).json({ message: "Server Error", error });
  }
});

// Start the server
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});

module.exports = app;