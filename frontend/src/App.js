import { useState } from "react";
import "./app.css";
import { Search } from "lucide-react";

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
    if (selectedSymptoms.includes(symptomLabel)) {
      setSelectedSymptoms(selectedSymptoms.filter((item) => item !== symptomLabel));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomLabel]);
    }
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

    try {
      const response = await fetch("https://ayurveda-app-5-dt9t.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: combinedSymptoms }),
      });

      const data = await response.json();

      // ✅ Safe formatting
      const formattedResult = {
        disease: data.disease || null,
        remedies: Array.isArray(data.remedies) ? data.remedies : [],
        herbs: Array.isArray(data.herbs) ? data.herbs : [],
        diet: Array.isArray(data.diet) ? data.diet : [],
      };

      setResult(formattedResult);

    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="google-container">

      {/* Header */}
      <header className="google-header">
        <h1 className="google-logo">
          <span>A</span><span>y</span><span>u</span><span>r</span><span>v</span><span>e</span><span>d</span><span>a</span>
        </h1>
        <p className="google-subtitle">
          Discover holistic remedies for your symptoms
        </p>
      </header>

      {/* Main Search Area */}
      <div className="search-area">

        {/* Search Bar */}
        <div className="search-bar-container">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="search-input"
            placeholder="Search symptoms (e.g. Cough, Fever)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
        </div>

        {/* Quick Suggestions */}
        <div style={{ marginBottom: '24px' }}>
          <h2 className="section-label">Quick Suggestions</h2>

          <div className="chips-container">
            {symptomsList.map((symptom, index) => {
              const isSelected = selectedSymptoms.includes(symptom.label);

              return (
                <label 
                  key={index} 
                  className={`filter-chip ${isSelected ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    className="hidden-checkbox"
                    onChange={() => handleCheckboxChange(symptom.label)}
                    checked={isSelected}
                  />
                  <span>{symptom.icon}</span>
                  {symptom.label}
                </label>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="action-container">
          <button
            className="google-btn"
            onClick={handleSubmit}
            disabled={loading || (!searchQuery.trim() && selectedSymptoms.length === 0)}
          >
            {loading ? (
              "Searching..."
            ) : (
              <>
                <Search size={16} />
                Search
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="results-card">

            <div className="result-header">
              <h2>{result.disease ? result.disease : "No results found"}</h2>
              {result.disease && <p>Holistic Ayurvedic approach</p>}
            </div>

            {/* No Result Message */}
            {!result.disease && (
              <p className="no-result">Try different symptoms</p>
            )}

            {result.disease && (
              <div className="result-grid">

                {/* Remedies */}
                <div className="result-section remedies">
                  <h3>Primary Remedies</h3>
                  <ul className="result-list">
                    {result.remedies.length > 0 ? (
                      result.remedies.map((item, i) => <li key={i}>{item}</li>)
                    ) : (
                      <li className="empty">No remedies found</li>
                    )}
                  </ul>
                </div>

                {/* Herbs */}
                <div className="result-section herbs">
                  <h3>Suggested Herbs</h3>
                  <ul className="result-list">
                    {result.herbs.length > 0 ? (
                      result.herbs.map((item, i) => <li key={i}>{item}</li>)
                    ) : (
                      <li className="empty">No herbs found</li>
                    )}
                  </ul>
                </div>

                {/* Diet */}
                <div className="result-section diet">
                  <h3>Dietary Advice</h3>
                  <ul className="result-list">
                    {result.diet.length > 0 ? (
                      result.diet.map((item, i) => <li key={i}>{item}</li>)
                    ) : (
                      <li className="empty">No diet suggestions</li>
                    )}
                  </ul>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
