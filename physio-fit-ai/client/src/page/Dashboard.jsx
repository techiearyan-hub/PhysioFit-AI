import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import PlanCard from "../components/PlanCard";
import Chart from "../components/Chart";

const LOADING_STEPS = [
  "Reading your profile",
  "Balancing macros to your goals",
  "Building your seven-day plan",
];

export default function Dashboard() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    country: "",
    weight: "",
    ailments: "",
    preference: "Veg",
    goals: "",
  });

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (loading) {
      setStepIndex(0);
      intervalRef.current = setInterval(() => {
        setStepIndex((i) => Math.min(i + 1, LOADING_STEPS.length - 1));
      }, 1100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setPreference = (value) => {
    setFormData((prev) => ({ ...prev, preference: value }));
  };

  const handleGeneratePlan = async () => {
    if (!formData.name || !formData.age || !formData.height || !formData.weight) {
      setError("Please fill in your name, age, height, and weight to continue.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "diet",
          prompt: `
            Name: ${formData.name}
            Age: ${formData.age}
            Height: ${formData.height} cm
            Country: ${formData.country}
            Weight: ${formData.weight} kg
            Ailments: ${formData.ailments}
            Preference: ${formData.preference}
            Health Goals: ${formData.goals}
          `,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPlan(data.plan);
      }
    } catch (err) {
      setError("Failed to connect to server. Make sure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <div className="container dash">
        <div className="dash-head">
          <span className="eyebrow">Weekly diet plan</span>
          <h1>Tell us about yourself</h1>
          <p>
            A few details is all it takes. We&rsquo;ll turn them into a full
            seven-day diet plan tailored to your body and goals.
          </p>
        </div>

        <div className="dash-grid">
          {/* Form */}
          <div className="card form-card">
            <h2>Your details</h2>

            <div className="field-group">
              <span className="field-group-label">Basics</span>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="e.g. Aditi Sharma"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="age">Age (years)</label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    placeholder="28"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    name="country"
                    placeholder="India"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="height">Height (cm)</label>
                  <input
                    id="height"
                    name="height"
                    type="number"
                    min="1"
                    placeholder="165"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    id="weight"
                    name="weight"
                    type="number"
                    min="1"
                    placeholder="60"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="field-group">
              <span className="field-group-label">Health</span>
              <div className="field">
                <label htmlFor="ailments">Ailments / allergies</label>
                <input
                  id="ailments"
                  name="ailments"
                  placeholder="e.g. diabetes, nut allergy"
                  value={formData.ailments}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label>Diet preference</label>
                <div className="segmented">
                  <button
                    type="button"
                    className={formData.preference === "Veg" ? "active" : ""}
                    onClick={() => setPreference("Veg")}
                  >
                    Veg
                  </button>
                  <button
                    type="button"
                    className={formData.preference === "Non-Veg" ? "active" : ""}
                    onClick={() => setPreference("Non-Veg")}
                  >
                    Non-Veg
                  </button>
                </div>
              </div>
            </div>

            <div className="field-group">
              <span className="field-group-label">Goals</span>
              <div className="field">
                <label htmlFor="goals">Health goals</label>
                <input
                  id="goals"
                  name="goals"
                  placeholder="e.g. lose weight, build muscle"
                  value={formData.goals}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={loading}
              className="btn btn-primary btn-block"
            >
              {loading ? "Generating your plan…" : "Get your plan"}
            </button>

            {error && (
              <div className="form-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: "1px" }}>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Results */}
          <div>
            {loading && (
              <div className="card loading-panel">
                <div className="loading-ring" />
                <div className="loading-steps">
                  {LOADING_STEPS.map((step, i) => (
                    <div
                      key={step}
                      className={`loading-step ${
                        i < stepIndex ? "done" : i === stepIndex ? "current" : ""
                      }`}
                    >
                      <span className="loading-step-dot" />
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && !plan && (
              <div className="card results-empty">
                <div className="results-empty-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M8 2v4M16 2v4M3 10h18" strokeLinecap="round" />
                  </svg>
                </div>
                <h3>Your plan will appear here</h3>
                <p>Fill in your details and generate your plan to see a full week of meals, laid out day by day.</p>
              </div>
            )}

            {!loading && plan && (
              <>
                <PlanCard plan={plan} name={formData.name} />
                <Chart plan={plan} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}