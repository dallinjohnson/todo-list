import ProjectService from "../services/ProjectService";
import ProjectItem from "./ProjectItem";

const ProjectList = () => {
  let element;
  let projects;

  const init = () => {
    projects = ProjectService.findAll();
    element = createElement();
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.classList.add("project-list");

    projects.map((project) => {
      const projectItem = ProjectItem(project);
      container.appendChild(projectItem.getElement());
    });
    return container;
  };

  init();

  return {
    getElement: () => element,
  };
};

export { ProjectList };
