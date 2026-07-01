import { Link, useLocation } from "react-router-dom";

function LogoMark() {
  return (
    <svg
      className="nav-logo-mark"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="#2F6F5E" />
      <path
        d="M6 17h3.2l2-4.5 3 9 2.4-6.5 1.8 2h5.6"
        stroke="#F4FBF7"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/profile", label: "Profile" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">
          <LogoMark />
          PhysioFit AI
        </Link>
        <nav className="nav-links">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${pathname === link.to ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}