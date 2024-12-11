import { Project } from "../classes/Project";
import TaskService from "./TaskService";

const ProjectService = () => {
  let projects = [];

  const loadProjects = () => {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      // Load projects from localStorage if data exists
      projects = JSON.parse(savedProjects);
    } else {
      // Initialize with default projects and save to localStorage
      projects = [new Project(1, "Default")];
      saveProjects(); // Save defaults to localStorage
    }
  };

  const saveProjects = () => {
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  const generateId = () => {
    const ids = projects.map((project) => project.id);
    return projects.length ? Math.max(...ids) + 1 : 1;
  };

  const findAll = () => [...projects];

  const findById = (projectId) =>
    projects.find((project) => project.id === projectId);

  const deleteById = (projectId) => {
    if (projectId === 1) {
      return false;
    }

    const indexToDelete = projects.findIndex(
      (project) => project.id === projectId
    );
    if (indexToDelete !== -1) {
      projects = projects.filter((_, i) => i !== indexToDelete);
      const projectTasks = TaskService.findAllByProject(projectId);
      projectTasks.forEach((task) => {
        TaskService.deleteById(task.id);
      });
      saveProjects();
      return true;
    }
    return false;
  };

  const update = (updatedProject) => {
    const index = projects.findIndex((p) => p.id === updatedProject.id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updatedProject };
      saveProjects();
      return true;
    }
    return false;
  };

  const insert = (project) => {
    const newProject = { ...project, id: generateId() };
    projects.push(newProject);
    saveProjects();
    return newProject;
  };

  loadProjects();

  return { findAll, findById, deleteById, update, insert };
};

const instance = ProjectService();
export default instance;
