import { useEffect, useState } from "react";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch resources
  const fetchResources = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/resources"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }

      const data = await response.json();

      setResources(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Unable to load resources");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Delete resource
  const deleteResource = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resource?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/resources/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Resource deleted successfully!");
        fetchResources();
      } else {
        alert(
          data.message || "Failed to delete resource"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server");
    }
  };

  // Edit resource
  const editResource = async (resource) => {
    const title = window.prompt(
      "Enter new title:",
      resource.title
    );

    if (title === null) return;

    const description = window.prompt(
      "Enter new description:",
      resource.description
    );

    if (description === null) return;

    const category = window.prompt(
      "Enter new category:",
      resource.category
    );

    if (category === null) return;

    const link = window.prompt(
      "Enter new link:",
      resource.link
    );

    if (link === null) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/resources/${resource._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            description,
            category,
            link,
            uploadedBy: resource.uploadedBy
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Resource updated successfully!");
        fetchResources();
      } else {
        alert(
          data.message || "Failed to update resource"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Cannot connect to server");
    }
  };

  if (loading) {
    return (
      <section className="resources">
        <h2>Loading resources...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="resources">
        <h2>{error}</h2>
      </section>
    );
  }

  return (
    <section className="resources">

      <h2>📚 Learning Resources</h2>

      {resources.length === 0 ? (
        <p>No resources available.</p>
      ) : (
        <div className="resource-container">

          {resources.map((resource) => (

            <div
              className="resource-card"
              key={resource._id}
            >

              <div className="resource-icon">
                📚
              </div>

              <h3>{resource.title}</h3>

              <p className="resource-description">
                {resource.description}
              </p>

              <p>
                <strong>📂 Category:</strong>{" "}
                {resource.category}
              </p>

              <p>
                <strong>👤 Uploaded By:</strong>{" "}
                {resource.uploadedBy}
              </p>

              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="view-resource-button"
              >
                View Resource →
              </a>

              {/* Faculty and Admin controls */}

              {user &&
                (user.role === "faculty" ||
                  user.role === "admin") && (

                <div className="resource-actions">

                  <button
                    onClick={() =>
                      editResource(resource)
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteResource(resource._id)
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

export default Resources;

