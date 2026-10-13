
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">

      <h1>Welcome, {user.name}! 👋</h1>

      <p>
        Welcome to your Department Digital Hub.
      </p>


      {/* PROFILE */}
      <section className="profile-card" id="profile">

        <h2>My Profile</h2>

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Role:</strong> {user.role}
        </p>

      </section>


      {/* COMMON FEATURES */}
      <section className="dashboard-grid">

        <div className="dashboard-card">
          <h2>📚 Resources</h2>

          <p>
            Access study materials and department resources.
          </p>

          <button onClick={() => navigate("/resources")}>
            View Resources
          </button>
        </div>


        <div className="dashboard-card">
          <h2>📅 Events</h2>

          <p>
            View upcoming department events and activities.
          </p>

          <button onClick={() => navigate("/events")}>
            View Events
          </button>
        </div>


        <div className="dashboard-card">
          <h2>📢 Announcements</h2>

          <p>
            Stay updated with the latest department announcements.
          </p>

          <button onClick={() => navigate("/announcements")}>
            View Announcements
          </button>
        </div>


        <div className="dashboard-card">
          <h2>👤 My Profile</h2>

          <p>
            View your account information.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("profile")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Profile
          </button>
        </div>

      </section>


      {/* FACULTY + ADMIN */}
      {(user.role === "faculty" || user.role === "admin") && (
        <section className="management-section">

          <h2>Management</h2>

          <div className="dashboard-grid">

            <div className="dashboard-card">
              <h2>📚 Add Resource</h2>

              <p>
                Add study materials and useful resources.
              </p>

              <button
                onClick={() => navigate("/add-resource")}
              >
                Add Resource
              </button>
            </div>


            <div className="dashboard-card">
              <h2>📅 Add Event</h2>

              <p>
                Create upcoming department events.
              </p>

              <button
                onClick={() => navigate("/add-event")}
              >
                Add Event
              </button>
            </div>


            <div className="dashboard-card">
              <h2>📢 Add Announcement</h2>

              <p>
                Publish department announcements.
              </p>

              <button
                onClick={() => navigate("/add-announcement")}
              >
                Add Announcement
              </button>
            </div>

          </div>

        </section>
      )}


      {/* ADMIN ONLY */}
      {user.role === "admin" && (
        <section className="admin-section">

          <h2>⚙️ Admin Panel</h2>

          <p>
            Manage users, faculty and department settings.
          </p>

          <button
            onClick={() => navigate("/admin")}
          >
            Open Admin Panel
          </button>

        </section>
      )}


      <div className="dashboard-logout">
        <button onClick={logout}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Dashboard;






