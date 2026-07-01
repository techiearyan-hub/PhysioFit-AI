import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Profile() {
  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <div className="card placeholder-card">
          <div className="placeholder-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
            </svg>
          </div>
          <h2>Your profile</h2>
          <p>
            This is where your saved details, past plans, and preferences will
            live. For now, head to the dashboard to generate a fresh weekly plan
            — profile saving and wearable sync are on the way.
          </p>
          <Link to="/dashboard" className="btn btn-primary">
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}