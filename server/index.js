const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const MoodEntry = require('./models/MoodEntry');  // <-- Import the MoodEntry model

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = "mongodb+srv://esathwikkumar:hp6VwMluheTBu7Vv@cluster-s.mcbjj.mongodb.net/healio?retryWrites=true&w=majority&appName=Cluster-S";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Get mood entries from the database
app.get('/api/mood-entries', async (req, res) => {
  try {
    const entries = await MoodEntry.find();  // Fetch all mood entries
    res.json(entries);
  } catch (err) {
    console.error('Error fetching mood entries:', err);
    res.status(500).json({ message: 'Failed to fetch records' });
  }
});

// Create a new mood entry
app.post('/api/mood-entries', async (req, res) => {
    const { date, mood, sleep, anxiety, stress, activities, note } = req.body;
    try {
      const newEntry = new MoodEntry({ date, mood, sleep, anxiety, stress, activities, note });
      await newEntry.save();
      res.status(200).json(newEntry);
    } catch (error) {
      console.error('Error saving entry:', error); // Log the full error
      res.status(500).json({ message: 'Failed to save entry. Please try again later.' });
    }
  });
  


  const GratitudeEntry = require('./models/GratitudeEntry'); // Import the GratitudeEntry model

 // Get all gratitude entries
app.get("/api/gratitude-entries", async (req, res) => {
  try {
    const entries = await GratitudeEntry.find().sort({ date: -1 }); // Sort by date (latest first)
    console.log("Fetched entries:", entries); // Log the fetched entries
    res.json(entries);
  } catch (err) {
    console.error("Error fetching gratitude entries:", err);
    res.status(500).json({ message: "Failed to fetch records" });
  }
});

// Create a new gratitude entry
app.post("/api/gratitude-entries", async (req, res) => {
  const { gratitude } = req.body;

  if (!gratitude) {
    return res.status(400).json({ message: "Gratitude text is required" });
  }

  console.log("Received gratitude:", gratitude); // Log received gratitude

  try {
    const newEntry = new GratitudeEntry({ gratitude });
    await newEntry.save();
    console.log("Saved entry:", newEntry); // Log saved entry
    res.status(200).json(newEntry);
  } catch (err) {
    console.error("Error saving gratitude entry:", err);
    res.status(500).json({ message: "Failed to save entry" });
  }
});
  
  

app.listen(port, () => console.log(`Server running on port ${port}`));
