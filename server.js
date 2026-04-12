const express = require("express");
const cors = require("cors");
const data = require("./data.json");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Ayurveda API is running");
});

// Get all diseases
app.get("/diseases", (req, res) => {
  res.json(data);
});

// Recommendation API
app.post("/recommend", (req, res) => {
  const userSymptoms = req.body.symptoms;

  let bestMatch = null;
  let maxScore = 0;

  data.forEach((item) => {
    let score = 0;

    item.symptoms.forEach((symptom) => {
      if (userSymptoms.includes(symptom)) {
        score++;
      }
    });

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  });

  res.json(bestMatch || { message: "No match found" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});