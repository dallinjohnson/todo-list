import TaskService from "../services/TaskService";
import ProjectService from "../services/ProjectService";
import pubsub from "../pubsub/PubSub";

const ProjectItem = (project) => {
  let element;
  let title;
  let numTasks;

  const init = () => {
    element = createElement();
    pubsub.subscribe("addNewTask", render);
  };

  const createElement = () => {
    const container = document.createElement("div");

    title = document.createElement("span");
    title.textContent = project.name;
    title.classList.add("title");
    container.appendChild(title);

    numTasks = document.createElement("span");
    numTasks.textContent = `${
      TaskService.findAllByProject(project.id).length
    } tasks`;
    container.appendChild(numTasks);

    container.classList.add("project");
    container.addEventListener("click", () => {
      pubsub.publish("projectSelected", project);
    });

    return container;
  };

  const handleTitleUpdate = (e) => {
    const dataValue = e.target.dataValue;
    const newContent = e.target.textContent;

    const newProject = { ...project, [dataValue]: newContent };
    ProjectService.update(newProject);
  };

  const render = () => {
    numTasks.textContent = `${
      TaskService.findAllByProject(project.id).length
    } tasks`;
  };

  init();

  return {
    getElement: () => element,
  };
};

export default ProjectItem;
