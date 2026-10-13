import { useEffect, useState } from "react";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/announcements"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch announcements");
      }

      const data = await response.json();

      setAnnouncements(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Unable to load announcements");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Delete announcement
  const deleteAnnouncement = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/announcements/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Announcement deleted successfully!");
        fetchAnnouncements();
      } else {
        alert(
          data.message || "Failed to delete announcement"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server");
    }
  };

  // Edit announcement
  const editAnnouncement = async (announcement) => {
    const title = window.prompt(
      "Enter new title:",
      announcement.title
    );

    if (title === null) return;

    const message = window.prompt(
      "Enter new message:",
      announcement.message
    );

    if (message === null) return;

    const priority = window.prompt(
      "Enter priority (Normal, Important, Urgent):",
      announcement.priority
    );

    if (priority === null) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/announcements/${announcement._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            message,
            postedBy: announcement.postedBy,
            priority
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Announcement updated successfully!");
        fetchAnnouncements();
      } else {
        alert(
          data.message || "Failed to update announcement"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server");
    }
  };

  if (loading) {
    return (
      <section className="announcements">
        <h2>Loading announcements...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="announcements">
        <h2>{error}</h2>
      </section>
    );
  }

  return (
    <section className="announcements">

      <h2>📢 Latest Announcements</h2>

      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        <div className="announcement-container">

          {announcements.map((announcement) => (

            <div
              className="announcement-card"
              key={announcement._id}
            >

              <h3>{announcement.title}</h3>

              <p className="announcement-message">
                {announcement.message}
              </p>

              <p>
                <strong>Posted By:</strong>{" "}
                {announcement.postedBy}
              </p>

              <p>
                <strong>Priority:</strong>{" "}
                <span
                  className={`priority ${announcement.priority
                    ?.toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {announcement.priority}
                </span>
              </p>

              <small>
                Posted:{" "}
                {new Date(
                  announcement.createdAt
                ).toLocaleDateString()}
              </small>

              {/* Faculty and Admin controls */}

              {user &&
                (user.role === "faculty" ||
                  user.role === "admin") && (

                <div className="announcement-actions">

                  <button
                    onClick={() =>
                      editAnnouncement(announcement)
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteAnnouncement(
                        announcement._id
                      )
                    }
                  >
                    🗑️ Delete
                  </button>

                </div>

              )}

            </div>

          ))}

        </div>
      )}

    </section>
  );
}

export default Announcements;

