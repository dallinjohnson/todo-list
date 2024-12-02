import TaskService from "../services/TaskService";
import ProjectService from "../services/ProjectService";
import pubsub from "../pubsub/PubSub";

const ProjectItem = (project) => {
  let element;
  let title;
  let numTasks;

  const init = () => {
    element = createElement();
    pubsub.subscribe("numberOfTasksChanged", render);
    render();
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

  const render = () => {
    numTasks.textContent = `${getNumTasks()} tasks`;
  };

  const getNumTasks = () => {
    return TaskService.findAllByProject(project.id).length;
  };

  init();

  return {
    getElement: () => element,
  };
};

export default ProjectItem;
