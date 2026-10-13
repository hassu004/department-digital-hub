
import { useState } from "react";

function AddAnnouncement() {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    postedBy: "",
    priority: "Normal"
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("");

    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/announcements",
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
        setStatus("Announcement added successfully!");

        setFormData({
          title: "",
          message: "",
          postedBy: "",
          priority: "Normal"
        });
      } else {
        setStatus(
          data.message || "Failed to add announcement"
        );
      }

    } catch (error) {
      console.error(error);
      setStatus("Cannot connect to server");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">

        <h1>Add Announcement</h1>

        <form onSubmit={handleSubmit}>

          <label>Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter announcement title"
            required
          />


          <label>Message</label>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter announcement message"
            rows="5"
            required
          />


          <label>Posted By</label>

          <input
            type="text"
            name="postedBy"
            value={formData.postedBy}
            onChange={handleChange}
            placeholder="Example: CSE Department"
            required
          />


          <label>Priority</label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Normal">Normal</option>
            <option value="Important">Important</option>
            <option value="Urgent">Urgent</option>
          </select>


          <button type="submit">
            Add Announcement
          </button>

        </form>

        {status && <p>{status}</p>}

      </div>
    </section>
  );
}

export default AddAnnouncement;

