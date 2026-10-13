
import { useState } from "react";

function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    organizedBy: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Event added successfully!");

        setFormData({
          title: "",
          description: "",
          date: "",
          venue: "",
          organizedBy: ""
        });
      } else {
        setMessage(data.message || "Failed to add event");
      }

    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">

        <h1>Add Event</h1>

        <form onSubmit={handleSubmit}>

          <label>Event Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title"
            required
          />


          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter event description"
            required
          />


          <label>Date</label>

          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />


          <label>Venue</label>

          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            placeholder="Example: Seminar Hall"
            required
          />


          <label>Organized By</label>

          <input
            type="text"
            name="organizedBy"
            value={formData.organizedBy}
            onChange={handleChange}
            placeholder="Example: CSE Department"
            required
          />


          <button type="submit">
            Add Event
          </button>

        </form>

        {message && <p>{message}</p>}

      </div>
    </section>
  );
}

export default AddEvent;

