import ProjectService from "../services/ProjectService";

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
      const h1 = document.createElement("h1");
      h1.textContent = project.name;
      container.appendChild(h1);
    });
    return container;
  };

  init();

  return {
    getElement: () => element,
  };
};

export { ProjectList };
