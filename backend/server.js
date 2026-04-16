const express = require("express");
const cors = require("cors");
const data = require("./data.json");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Ayurveda API is running");
});

// Recommendation API
app.post("/recommend", (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms || symptoms.length === 0) {
    return res.status(400).json({ error: "No symptoms provided" });
  }

  // Normalize input
  const inputSymptoms = symptoms.map(s => s.toLowerCase());

  let bestMatch = null;
  let maxMatches = 0;

  data.forEach(disease => {
    const diseaseSymptoms = disease.symptoms.map(s => s.toLowerCase());

    const matches = diseaseSymptoms.filter(symptom =>
      inputSymptoms.includes(symptom)
    ).length;

    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = disease;
    }
  });

  if (!bestMatch) {
    return res.json({
      disease: null,
      remedies: [],
      herbs: [],
      diet: []
    });
  }

  res.json({
    disease: bestMatch.disease,
    remedies: bestMatch.remedies || [],
    herbs: bestMatch.herbs || [],
    diet: bestMatch.diet || []
  });
});

// PORT (Render uses this)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
