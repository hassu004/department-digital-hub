function Faculty() {
  return (
    <section className="faculty">

      <h2>Our Faculty</h2>

      <p className="faculty-subtitle">
        Meet our experienced and dedicated faculty members
      </p>

      <div className="faculty-container">

        <div className="faculty-card">
          <div className="faculty-icon">👨‍🏫</div>

          <h3>Dr. Ramesh Kumar</h3>

          <p className="faculty-role">
            Head of the Department
          </p>

          <p className="faculty-specialization">
            Data Science
          </p>
        </div>


        <div className="faculty-card">
          <div className="faculty-icon">👩‍🏫</div>

          <h3>Dr. Priya Sharma</h3>

          <p className="faculty-role">
            Associate Professor
          </p>

          <p className="faculty-specialization">
            Computer Science
          </p>
        </div>


        <div className="faculty-card">
          <div className="faculty-icon">👨‍🏫</div>

          <h3>Mr. Arun Kumar</h3>

          <p className="faculty-role">
            Assistant Professor
          </p>

          <p className="faculty-specialization">
            Web Technologies
          </p>
        </div>

      </div>

    </section>
  );
}

export default Faculty;