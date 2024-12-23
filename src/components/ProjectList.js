import pubsub from "../pubsub/PubSub";
import ProjectService from "../services/ProjectService";
import TaskService from "../services/TaskService";
import ProjectItem from "./ProjectItem";
import ProjectListType from "../enums/ProjectListType";
import { sortByTitle } from "../util/SortUtil";

const ProjectList = (listHeader, listType) => {
  let element;
  let projects;

  const init = () => {
    refreshProjects();
    element = createElement();
    pubsub.subscribe("newProjectAdded", (newProject) => {
      refreshProjects();
      render();
      pubsub.publish("projectSelected", newProject);
      pubsub.publish("focusProjectTitle", newProject);
    });
    pubsub.subscribe("deleteProject", () => {
      refreshProjects();
      render();
    });
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.classList.add("project-list");
    if (listHeader) {
      container.appendChild(listHeader);
    }

    if (projects.length > 0) {
      projects.map((project) => {
        const projectItem = ProjectItem(project);
        container.appendChild(projectItem.getElement());
      });
    } else {
      const message = document.createElement("span");
      message.textContent = "No projects to display";
      message.classList.add("faded-text");
      container.appendChild(message);
    }

    return container;
  };

  const refreshProjects = () => {
    const allProjects = ProjectService.findAll();
    const filteredProjects = filterProjects(allProjects);
    const sortedProjects = sortProjects(filteredProjects);
    projects = sortedProjects;
  };

  const filterProjects = (projects) => {
    if (listType === ProjectListType.DEFAULT) {
      return projects.filter((project) => project.id === 1);
    }

    if (listType === ProjectListType.ACTIVE) {
      return projects.filter(
        (project) => !projectIsCompleted(project) && project.id !== 1
      );
    }

    if (listType === ProjectListType.COMPLETED) {
      return projects.filter(
        (project) => projectIsCompleted(project) && project.id !== 1
      );
    }
  };

  const sortProjects = (projects) => {
    return projects.sort((a, b) => sortByTitle(a.title, b.title));
  };

  const render = () => {
    element.innerHTML = "";
    element.append(...createElement().childNodes);
  };

  const projectIsCompleted = (project) => {
    const projectTasks = TaskService.findAllByProject(project.id);
    if (projectTasks.length === 0) {
      return false;
    }

    const completedTasks = projectTasks.filter((task) => task.isCompleted);

    if (projectTasks.length === completedTasks.length) {
      return true;
    }
    return false;
  };

  init();

  return {
    getElement: () => element,
  };
};

export { ProjectList };
