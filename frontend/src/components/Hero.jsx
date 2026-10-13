import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>Welcome to Department Digital Hub</h1>

        <p>
          A centralized platform connecting students, faculty,
          resources, events, and department activities.
        </p>

        <div className="hero-buttons">

          <Link to="/login" className="hero-button">
            Student Login
          </Link>

          <Link to="/login" className="hero-button faculty-button">
            Faculty Login
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Hero;