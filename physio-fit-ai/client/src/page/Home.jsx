import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const sampleDays = [
  { day: "Mon", meal: "Grilled paneer bowl, quinoa, greens" },
  { day: "Tue", meal: "Lentil soup, multigrain toast" },
  { day: "Wed", meal: "Tofu stir-fry, brown rice" },
];

const features = [
  {
    title: "Built from your numbers",
    body: "Age, height, weight, and goals feed a plan tuned to you — not a generic 1,800-calorie template.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Respects your restrictions",
    body: "Allergies, ailments, and dietary preference are worked into every meal, every day of the week.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 2.5 5 6 5c2 0 3.5 1 4 2 0.5-1 2-2 4-2 3.5 0 5.5 3.5 3.5 7.5C19 16.65 12 21 12 21z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Ready in under a minute",
    body: "Fill in one form, and your full seven-day plan is laid out and ready to follow immediately.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="page">
      <Navbar />

      <section className="hero container">
        <div className="hero-grid">
          <div>
            <span className="hero-badge">AI diet planning</span>
            <h1 className="hero-title">
              A week of meals, <em>built around your body.</em>
            </h1>
            <p className="hero-sub">
              PhysioFit AI turns your age, height, weight, and health goals into a
              complete seven-day diet plan — personal, practical, and ready the
              moment you finish the form.
            </p>
            <div className="hero-actions">
              <Link to="/dashboard" className="btn btn-primary">
                Generate my plan
              </Link>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="hero-meta-num">7</span>
                <span className="hero-meta-label">days planned</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-num">2</span>
                <span className="hero-meta-label">diet preferences</span>
              </div>
              <div className="hero-meta-item">
                <span className="hero-meta-num">&lt;1min</span>
                <span className="hero-meta-label">to generate</span>
              </div>
            </div>
          </div>

          <div className="hero-panel">
            <div className="hero-panel-head">
              <span className="hero-panel-title">This week&rsquo;s preview</span>
            </div>
            {sampleDays.map((d) => (
              <div key={d.day} className="hero-panel-day">
                <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span className="hero-panel-dot" />
                  {d.meal}
                </span>
                <span style={{ color: "var(--text-faint)", fontWeight: 600 }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="feature-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}