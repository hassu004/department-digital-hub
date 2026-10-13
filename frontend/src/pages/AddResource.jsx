
import { useState } from "react";

function AddResource() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
    uploadedBy: ""
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
        "http://localhost:5000/api/resources",
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
        setMessage("Resource added successfully!");

        setFormData({
          title: "",
          description: "",
          category: "",
          link: "",
          uploadedBy: ""
        });
      } else {
        setMessage(data.message || "Failed to add resource");
      }

    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server");
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">

        <h1>Add Resource</h1>

        <form onSubmit={handleSubmit}>

          <label>Resource Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter resource title"
            required
          />


          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter resource description"
            required
          />


          <label>Category</label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Example: Study Material"
            required
          />


          <label>Resource Link</label>

          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com"
            required
          />


          <label>Uploaded By</label>

          <input
            type="text"
            name="uploadedBy"
            value={formData.uploadedBy}
            onChange={handleChange}
            placeholder="Enter faculty name"
            required
          />


          <button type="submit">
            Add Resource
          </button>

        </form>

        {message && <p>{message}</p>}

      </div>
    </section>
  );
}

export default AddResource;

