import TaskService from "../services/TaskService";
import ProjectService from "../services/ProjectService";
import pubsub from "../pubsub/PubSub";
import { Editable } from "./Editable";
import deleteIcon from "../assets/icons8-trash-30.png";

const ProjectItem = (project) => {
  let selected = false;
  let element;
  let title;
  let taskCompletionDetails;

  const init = () => {
    element = createElement();
    pubsub.subscribe("numberOfTasksChanged", render);
    pubsub.subscribe("taskCheckboxClicked", render);
    pubsub.subscribe("projectSelected", handleNewProjectSelect);
    pubsub.subscribe("focusProjectTitle", (p) => {
      if (p.id === project.id) {
        title.getElement().focus();
      }
    });
    render();
  };

  const createElement = () => {
    const titleRow = createTitleRow();

    const detailRow = createDetailRow();

    const details = document.createElement("div");
    details.append(titleRow);
    details.append(detailRow);
    details.classList.add("project-details");

    const container = document.createElement("div");
    container.classList.add("project");
    container.appendChild(details);
    container.addEventListener("click", () => {
      pubsub.publish("projectSelected", project);
    });

    return container;
  };

  const createTitleRow = () => {
    const div = document.createElement("div");
    div.classList.add("flex-row-space-between");

    title = Editable("title", "No Title", handleEditableUpdate);
    title.setText(project.title);
    title.getElement().classList.add("title");

    if (project.id === 1) {
      title.getElement().contentEditable = false;
    }

    div.appendChild(title.getElement());

    return div;
  };

  const createDetailRow = () => {
    taskCompletionDetails = document.createElement("span");
    taskCompletionDetails.textContent = getTaskCompletionDetails();

    const deleteButton = createDeleteButton();

    const div = document.createElement("div");
    div.classList.add("flex-row-space-between");
    div.classList.add("hidden");
    div.appendChild(taskCompletionDetails);
    if (project.id !== 1) {
      div.appendChild(deleteButton);
    }

    return div;
  };

  const createDeleteButton = () => {
    const deleteButton = document.createElement("div");
    const deleteButtonLabel = document.createElement("span");
    deleteButtonLabel.textContent = "Delete";
    const trashImage = document.createElement("img");
    trashImage.classList.add("task-delete-icon");
    trashImage.src = deleteIcon;
    deleteButton.classList.add("task-delete-btn");
    deleteButton.appendChild(deleteButtonLabel);
    deleteButton.appendChild(trashImage);
    deleteButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this project?")) {
        ProjectService.deleteById(project.id);
        pubsub.publish("deleteProject", project);
      }
    });
    return deleteButton;
  };

  const render = () => {
    taskCompletionDetails.textContent = getTaskCompletionDetails();
  };

  const getTaskCompletionDetails = () => {
    const allTasks = TaskService.findAllByProject(project.id);
    const completedTasks = allTasks.filter((task) => task.isCompleted);

    if (allTasks.length === 0) {
      return "No tasks";
    }

    return `${completedTasks.length}/${allTasks.length} completed`;
  };

  const handleNewProjectSelect = (selectedProject) => {
    if (!selectedProject) {
      return;
    }

    if (selectedProject.id === project.id) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  const setSelected = (isSelected) => {
    if (isSelected) {
      element.classList.add("selected");
      selected = true;
    } else {
      element.classList.remove("selected");
      selected = false;
    }
  };

  const handleEditableUpdate = (e) => {
    const dataValue = e.target.dataValue;
    const newContent = e.target.textContent;

    const newProject = { ...project, [dataValue]: newContent };
    ProjectService.update(newProject);
    project = newProject;
  };

  init();

  return {
    getElement: () => element,
  };
};

export default ProjectItem;
