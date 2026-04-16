import { useState } from "react";
import "./App.css";
import { Search } from "lucide-react";

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const symptomsList = [
    { label: "Cough", icon: "🤧" },
    { label: "Sneezing", icon: "🤧" },
    { label: "Runny Nose", icon: "💧" },
    { label: "Stomach Pain", icon: "😫" },
    { label: "Bloating", icon: "🎈" },
    { label: "Gas", icon: "💨" },
    { label: "Anxiety", icon: "😰" },
    { label: "Fatigue", icon: "🥱" },
    { label: "Headache", icon: "🤕" }
  ];

  const handleCheckboxChange = (symptomLabel) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomLabel)
        ? prev.filter((item) => item !== symptomLabel)
        : [...prev, symptomLabel]
    );
  };

  const handleSubmit = async () => {
    const textSymptoms = searchQuery
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);

    const combinedSymptoms = [...new Set([...selectedSymptoms, ...textSymptoms])];

    if (combinedSymptoms.length === 0) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const response = await fetch(
        "https://your-app-name.onrender.com/recommend"
      );

      const data = await fetch(
        "https://ayurveda-app-7.onrender.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ symptoms: combinedSymptoms })
        }
      );

      if (!data.ok) throw new Error("Server error");

      const json = await data.json();

      setResult({
        disease: json?.disease || null,
        remedies: json?.remedies || [],
        herbs: json?.herbs || [],
        diet: json?.diet || []
      });

    } catch (err) {
      setError("⚠️ Server is waking up... try again in few seconds");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">

      {/* Header */}
      <header className="header">
        <h1 className="logo">🌿 Ayurveda AI</h1>
        <p className="subtitle">Holistic healing powered by nature</p>
      </header>

      {/* Search */}
      <div className="search-box">
        <Search size={20} />
        <input
          type="text"
          placeholder="Enter symptoms (e.g. cough, headache)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>

      {/* Chips */}
      <div className="chips">
        {symptomsList.map((symptom, index) => {
          const isSelected = selectedSymptoms.includes(symptom.label);
          return (
            <div
              key={index}
              className={`chip ${isSelected ? "active" : ""}`}
              onClick={() => handleCheckboxChange(symptom.label)}
            >
              {symptom.icon} {symptom.label}
            </div>
          );
        })}
      </div>

      {/* Button */}
      <button
        className="search-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Searching..." : "🔍 Get Remedies"}
      </button>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Results */}
      {result && (
        <div className="result-container">

          <h2 className="disease">
            {result.disease || "No match found"}
          </h2>

          <div className="cards">

            <div className="card">
              <h3>🩺 Remedies</h3>
              <ul>
                {result.remedies.length > 0
                  ? result.remedies.map((r, i) => <li key={i}>{r}</li>)
                  : <li>No remedies</li>}
              </ul>
            </div>

            <div className="card">
              <h3>🌿 Herbs</h3>
              <ul>
                {result.herbs.length > 0
                  ? result.herbs.map((h, i) => <li key={i}>{h}</li>)
                  : <li>No herbs</li>}
              </ul>
            </div>

            <div className="card">
              <h3>🥗 Diet</h3>
              <ul>
                {result.diet.length > 0
                  ? result.diet.map((d, i) => <li key={i}>{d}</li>)
                  : <li>No diet</li>}
              </ul>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
