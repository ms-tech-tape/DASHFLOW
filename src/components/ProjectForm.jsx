import { useState, useEffect } from "react";
import "./ProjectForm.css";
import "./ProjectsPage.css";

function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Planning",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        status: project.status || "Planning",
        priority: project.priority || "Medium",
        dueDate: project.dueDate || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        status: "Planning",
        priority: "Medium",
        dueDate: "",
      });
    }
  }, [project]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    onSave({
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
    });
  }

  return (
    <div className="project-form-overlay">
      <div className="project-form-modal">
        <div className="project-form-header">
          <div>
            <h2>{project ? "Edit Project" : "Create Project"}</h2>
            <p>
              {project
                ? "Update your project information."
                : "Add a new project to your workspace."}
            </p>
          </div>

          <button
            type="button"
            className="project-form-close"
            onClick={onCancel}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="project-form-field">
            <label htmlFor="project-name">Project Name *</label>

            <input
              id="project-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="project-form-field">
            <label htmlFor="project-description">Description</label>

            <textarea
              id="project-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your project..."
              rows="4"
            />
          </div>

          <div className="project-form-row">
            <div className="project-form-field">
              <label htmlFor="project-status">Status</label>

              <select
                id="project-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            <div className="project-form-field">
              <label htmlFor="project-priority">Priority</label>

              <select
                id="project-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="project-form-field">
            <label htmlFor="project-dueDate">Due Date</label>

            <input
              id="project-dueDate"
              name="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="project-form-actions">
            <button
              type="button"
              className="project-form-cancel"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="project-form-submit"
            >
              {project ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;