import { useState } from "react";
import ProjectForm from "./ProjectForm";
import "./ProjectsPage.css";

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website with a modern interface.",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-12-15",
  },
  {
    id: 2,
    name: "Mobile Application",
    description: "Develop a mobile application for customers.",
    status: "Planning",
    priority: "Medium",
    dueDate: "2027-01-20",
  },
];

function getProjects() {
  try {
    const saved = localStorage.getItem("dashflow-projects");

    return saved !== null ? JSON.parse(saved) : initialProjects;
  } catch {
    return initialProjects;
  }
}

function ProjectsPage() {
  const [projects, setProjects] = useState(getProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  function saveProjects(updatedProjects) {
    setProjects(updatedProjects);
    localStorage.setItem(
      "dashflow-projects",
      JSON.stringify(updatedProjects)
    );
  }

  function handleCreate() {
    setEditingProject(null);
    setShowForm(true);
  }

  function handleEdit(project) {
    setEditingProject(project);
    setShowForm(true);
  }

  function handleSave(projectData) {
    if (editingProject) {
      const updatedProjects = projects.map((project) =>
        project.id === editingProject.id
          ? { ...project, ...projectData }
          : project
      );

      saveProjects(updatedProjects);
    } else {
      const newProject = {
        id: Date.now(),
        ...projectData,
      };

      saveProjects([...projects, newProject]);
    }

    setShowForm(false);
    setEditingProject(null);
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    const updatedProjects = projects.filter(
      (project) => project.id !== id
    );

    saveProjects(updatedProjects);
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || project.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="projects-page">
      <div className="projects-page-header">
        <div>
          <h1>Projects</h1>
          <p>Manage, track and organize all your projects.</p>
        </div>

        <button className="projects-create-btn" onClick={handleCreate}>
          + Create Project
        </button>
      </div>

      <div className="projects-toolbar">
        <input
          type="search"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="projects-search"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="projects-filter"
        >
          <option value="All">All Statuses</option>
          <option value="Planning">Planning</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>

      <div className="projects-count">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      {filteredProjects.length === 0 ? (
        <div className="projects-empty">
          <div className="projects-empty-icon">📁</div>
          <h3>No projects found</h3>
          <p>
            {projects.length === 0
              ? "Create your first project to get started."
              : "Try changing your search or filter."}
          </p>

          {projects.length === 0 && (
            <button className="projects-create-btn" onClick={handleCreate}>
              + Create Project
            </button>
          )}
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-card-top">
                <div className="project-card-icon">📂</div>

                <div className="project-card-actions">
                  <button
                    className="project-edit-btn"
                    onClick={() => handleEdit(project)}
                    title="Edit project"
                    aria-label={`Edit ${project.name}`}
                  >
                    ✎
                  </button>

                  <button
                    className="project-delete-btn"
                    onClick={() => handleDelete(project.id)}
                    title="Delete project"
                    aria-label={`Delete ${project.name}`}
                  >
                    ×
                  </button>
                </div>
              </div>

              <h3>{project.name}</h3>

              <p className="project-description">
                {project.description || "No description provided."}
              </p>

              <div className="project-badges">
                <span
                  className={`project-status status-${project.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {project.status}
                </span>

                <span
                  className={`project-priority priority-${project.priority.toLowerCase()}`}
                >
                  {project.priority} Priority
                </span>
              </div>

              <div className="project-card-footer">
                <span>Due date</span>
                <strong>
                  {project.dueDate
                    ? new Date(project.dueDate + "T00:00:00").toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "Not set"}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
        />
      )}
    </div>
  );
}

export default ProjectsPage;