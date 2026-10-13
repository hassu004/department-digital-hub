import { useEffect, useState } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch events
  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/events"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();

      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Unable to load events");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete event
  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Event deleted successfully!");
        fetchEvents();
      } else {
        alert(
          data.message || "Failed to delete event"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server");
    }
  };

  // Edit event
  const editEvent = async (event) => {
    const title = window.prompt(
      "Enter new title:",
      event.title
    );

    if (title === null) return;

    const description = window.prompt(
      "Enter new description:",
      event.description
    );

    if (description === null) return;

    const date = window.prompt(
      "Enter new date and time:",
      event.date
    );

    if (date === null) return;

    const venue = window.prompt(
      "Enter new venue:",
      event.venue
    );

    if (venue === null) return;

    const organizedBy = window.prompt(
      "Enter organized by:",
      event.organizedBy
    );

    if (organizedBy === null) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${event._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            description,
            date,
            venue,
            organizedBy
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Event updated successfully!");
        fetchEvents();
      } else {
        alert(
          data.message || "Failed to update event"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server");
    }
  };

  if (loading) {
    return (
      <section className="events">
        <h2>Loading events...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="events">
        <h2>{error}</h2>
      </section>
    );
  }

  return (
    <section className="events">

      <h2>📅 Upcoming Events</h2>

      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="event-container">

          {events.map((event) => (

            <div
              className="event-card"
              key={event._id}
            >

              <div className="event-icon">
                📅
              </div>

              <h3>{event.title}</h3>

              <p className="event-description">
                {event.description}
              </p>

              <p>
                <strong>📅 Date:</strong>{" "}
                {new Date(event.date).toLocaleString()}
              </p>

              <p>
                <strong>📍 Venue:</strong>{" "}
                {event.venue}
              </p>

              <p>
                <strong>👤 Organized By:</strong>{" "}
                {event.organizedBy}
              </p>

              {/* Faculty and Admin controls */}

              {user &&
                (user.role === "faculty" ||
                  user.role === "admin") && (

                <div className="event-actions">

                  <button
                    onClick={() =>
                      editEvent(event)
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteEvent(event._id)
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

export default Events;


