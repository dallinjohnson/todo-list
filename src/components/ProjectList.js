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

    const header = document.createElement("h3");
    header.textContent = "Active Projects";

    const newProjectBtn = document.createElement("button");
    newProjectBtn.textContent = "+ New Project";

    const controls = document.createElement("div");
    controls.classList.add("task-list-controls");
    controls.appendChild(header);
    controls.appendChild(newProjectBtn);

    container.appendChild(header);
    projects.map((project) => {
      const projectItem = ProjectItem(project);
      container.appendChild(projectItem.getElement());
    });
    container.appendChild(newProjectBtn);
    return container;
  };

  init();

  return {
    getElement: () => element,
  };
};

export { ProjectList };
