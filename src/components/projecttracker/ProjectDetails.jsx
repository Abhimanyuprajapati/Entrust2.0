// src/components/projecttracker/ProjectDetails.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export const ProjectDetails = () => {  // Named export
  const { projectId } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const { getSingleProject } = useAuth(); // Ensure you have this function in your AuthContext

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectData = await getSingleProject(projectId);
        setProject(projectData);
      } catch (error) {
        console.error("Error fetching project details:", error.message);
      }
    };

    fetchProject();
  }, [projectId, getSingleProject]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="project-details">
      <h1>Project Details</h1>
      <p><strong>Project ID:</strong> {project.project_id}</p>
      <p><strong>Title:</strong> {project.title}</p>
      <p><strong>Body:</strong> {project.body}</p>
      <p><strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(project.updated_at).toLocaleString()}</p>
      {/* Add other project details as needed */}
    </div>
  );
}
