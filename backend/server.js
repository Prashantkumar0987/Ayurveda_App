const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ✅ Health check route (important for Render)
app.get("/", (req, res) => {
  res.send("Ayurveda API is running 🚀");
});

// ✅ Main API route
app.post("/", (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({
        error: "Invalid input: symptoms must be an array"
      });
    }

    // 👉 Dummy logic (replace later with your real logic)
    let disease = "General Imbalance";

    if (symptoms.includes("Cough")) {
      disease = "Common Cold";
    } else if (symptoms.includes("Stomach Pain")) {
      disease = "Indigestion";
    } else if (symptoms.includes("Anxiety")) {
      disease = "Stress Disorder";
    }

    const response = {
      disease,
      remedies: ["Rest", "Stay hydrated", "Herbal tea"],
      herbs: ["Tulsi", "Ginger", "Ashwagandha"],
      diet: ["Warm foods", "Avoid junk", "Drink hot water"]
    };

    res.json(response);

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
});

// ✅ IMPORTANT: Use dynamic PORT (fixes Render crash)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
