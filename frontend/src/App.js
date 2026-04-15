import { useState } from "react";
import "./App.css";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

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
      const response = await fetch("https://ayurveda-app-5-dt9t.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ symptoms: combinedSymptoms })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      setTimeout(() => {
        setResult({
          disease: data?.disease || null,
          remedies: Array.isArray(data?.remedies) ? data.remedies : [],
          herbs: Array.isArray(data?.herbs) ? data.herbs : [],
          diet: Array.isArray(data?.diet) ? data.diet : []
        });
        setLoading(false);
      }, 700);

    } catch (err) {
      console.error(err);
      setError("⚠️ Backend is sleeping or unreachable.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-bold text-emerald-400">
          Ayurveda AI
        </h1>
        <p className="text-slate-400 mt-2">
          Smart wellness powered by ancient science 🌿
        </p>
      </motion.div>

      {/* Search */}
      <div className="w-full max-w-3xl bg-white/5 p-6 rounded-2xl">

        <div className="flex items-center gap-2 mb-4">
          <Search />
          <input
            type="text"
            placeholder="Search symptoms (comma separated)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 outline-none p-2"
          />
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-3 justify-center">
          {symptomsList.map((symptom, index) => {
            const active = selectedSymptoms.includes(symptom.label);
            return (
              <button
                key={index}
                onClick={() => handleCheckboxChange(symptom.label)}
                className={`px-4 py-2 rounded-full border ${
                  active
                    ? "bg-emerald-500 text-black"
                    : "bg-white/10"
                }`}
              >
                {symptom.icon} {symptom.label}
              </button>
            );
          })}
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full py-3 bg-emerald-500 text-black rounded-xl"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <Loader2 className="animate-spin" /> Processing...
            </span>
          ) : (
            "Analyze"
          )}
        </button>

        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-10 w-full max-w-4xl bg-white/5 p-8 rounded-2xl"
          >
            <div className="text-center mb-6">
              <Sparkles className="mx-auto text-emerald-400 mb-2" />
              <h2 className="text-3xl font-bold">
                {result.disease || "No results"}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

              {/* Remedies */}
              <div>
                <h3 className="text-emerald-400 mb-3">Remedies</h3>
                {result.remedies.map((r, i) => (
                  <p key={i} className="flex gap-2">
                    <CheckCircle2 size={16} /> {r}
                  </p>
                ))}
              </div>

              {/* Herbs */}
              <div>
                <h3 className="text-teal-400 mb-3">Herbs</h3>
                {result.herbs.map((h, i) => (
                  <p key={i} className="flex gap-2">
                    <CheckCircle2 size={16} /> {h}
                  </p>
                ))}
              </div>

              {/* Diet */}
              <div>
                <h3 className="text-lime-400 mb-3">Diet</h3>
                {result.diet.map((d, i) => (
                  <p key={i} className="flex gap-2">
                    <CheckCircle2 size={16} /> {d}
                  </p>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
