@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --primary-accent: #10b981;
  --primary-accent-hover: #059669;
  --bg-gradient-start: #0f172a;
  --bg-gradient-end: #020617;
  --card-bg: rgba(30, 41, 59, 0.7);
  --card-border: rgba(255, 255, 255, 0.1);
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
}

body {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
  color: var(--text-main);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  background-image: 
    radial-gradient(circle at 15% 50%, rgba(16, 185, 129, 0.15), transparent 25%),
    radial-gradient(circle at 85% 30%, rgba(6, 182, 212, 0.15), transparent 25%);
}

.glass-card {
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #34d399, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  color: var(--text-main);
}

.symptoms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.hidden-checkbox {
  display: none;
}

.symptom-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.symptom-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.3);
}

.symptom-card.selected {
  background: rgba(16, 185, 129, 0.1);
  border-color: var(--primary-accent);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
}

.symptom-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
  transition: transform 0.3s ease;
}

.symptom-card:hover .symptom-icon {
  transform: scale(1.1);
}

.symptom-label {
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  color: var(--text-main);
}

.check-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--primary-accent);
  font-weight: bold;
  font-size: 1.2rem;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.action-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.submit-btn {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-muted);
  border: 1px solid var(--card-border);
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: inherit;
  cursor: not-allowed;
  transition: all 0.3s ease;
}

.submit-btn.active {
  background: linear-gradient(135deg, var(--primary-accent), var(--primary-accent-hover));
  color: white;
  border-color: transparent;
  cursor: pointer;
  box-shadow: 0 10px 20px -5px rgba(16, 185, 129, 0.4);
}

.submit-btn.active:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 25px -5px rgba(16, 185, 129, 0.5);
}

.submit-btn.active:active {
  transform: translateY(1px);
}

.selected-summary {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 12px;
  border-left: 4px solid var(--primary-accent);
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.selected-summary h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-muted);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.selected-summary p {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-main);
  line-height: 1.5;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .glass-card {
    padding: 2rem 1.5rem;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .symptoms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
