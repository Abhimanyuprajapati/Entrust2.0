import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

export const ProjectTrackerRecord = () => {
  const [projects, setProjects] = useState([]);
  const { getAllProjects } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getAllProjects();
        if (Array.isArray(projectData)) {
          setProjects(projectData);
        } else {
          console.error("API returned data that is not an array:", projectData);
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error.message);
        setProjects([]);
      }
    };

    fetchProjects();
  }, [getAllProjects]);

  return (
    <div className="col-xl-12">
      <div className="custom-card custom-card-flush h-md-100">
        <div className="custom-card-header pt-7">
          <h3 className="custom-card-title align-items-start flex-column">
            <span className="custom-card-label fw-bold text-gray-800">
              View Projects
            </span>
          </h3>
        </div>
        <div className="custom-card-body pt-6">
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr className="fs-7 fw-bold text-gray-500 border-bottom-0">
                  <th className="p-0 pb-3 text-start">Project ID</th>
                  <th className="p-0 pb-3 text-start">Title</th>
                  <th className="p-0 pb-3 text-start">Body</th>
                  <th className="p-0 pb-3 text-start">Created At</th>
                  <th className="p-0 pb-3 text-start">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project.project_id} className="custom-table-row">
                      <td>
                        <Link to={`/project/${project.project_id}`} className="text-decoration-none text-primary">
                          {project.project_id}
                        </Link>
                      </td>
                      <td>{project.title}</td>
                      <td>{project.body}</td>
                      <td>{new Date(project.created_at).toLocaleString()}</td>
                      <td>{new Date(project.updated_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No projects available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
