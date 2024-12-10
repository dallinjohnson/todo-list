import pubsub from "../pubsub/PubSub";
import ProjectService from "../services/ProjectService";
import TaskService from "../services/TaskService";
import ProjectItem from "./ProjectItem";
import ProjectListType from "../enums/ProjectListType";

const ProjectList = (listHeader, listType) => {
  let element;
  let projects;

  const init = () => {
    refreshProjects();
    element = createElement();
    pubsub.subscribe("newProjectAdded", () => {
      refreshProjects();
      console.log(`LIST TYPE: ${listType}; PROJECTS: ${projects}`);
      render();
    });
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.classList.add("project-list");
    if (listHeader) {
      container.appendChild(listHeader);
    }

    projects.map((project) => {
      const projectItem = ProjectItem(project);
      container.appendChild(projectItem.getElement());
    });
    return container;
  };

  const refreshProjects = () => {
    const allProjects = ProjectService.findAll();
    const filteredProjects = filterProjects(allProjects);
    projects = filteredProjects;
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
