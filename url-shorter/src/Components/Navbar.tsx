import { NavLink } from "react-router-dom";

export default function Navbar() {
  const base =
    "px-4 py-2 rounded font-semibold transition";

  return (
    <nav className="bg-white shadow flex gap-4 px-6 py-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${base} ${
            isActive
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${base} ${
            isActive
              ? "bg-purple-100 text-purple-600"
              : "text-gray-600"
          }`
        }
      >
        Dashboard
      </NavLink>
    </nav>
  );
}
