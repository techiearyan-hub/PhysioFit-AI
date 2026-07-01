import { useState } from "react";

export default function PlanCard({ plan, name }) {
  const [expanded, setExpanded] = useState(false);

  if (!plan) return null;

  return (
    <div className="card plan-summary">
      <div className="plan-summary-left">
        <div className="plan-summary-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="plan-summary-title">
            {name ? `${name}'s weekly plan is ready` : "Your weekly plan is ready"}
          </div>
          <div className="plan-summary-sub">Scroll down for the day-by-day breakdown</div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "Hide raw text" : "View raw text"}
      </button>

      {expanded && (
        <div className="plan-raw">
          <pre>{plan}</pre>
        </div>
      )}
    </div>
  );
}