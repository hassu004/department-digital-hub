import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">

      <div className="navbar-brand">
        <h2>Department Digital Hub</h2>
      </div>

      <div className="navbar-links">

        <Link to="/">Home</Link>

        <Link to="/about">About</Link>

        <Link to="/resources">Resources</Link>

        <Link to="/events">Events</Link>

        <Link to="/announcements">Announcements</Link>

        {user ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;