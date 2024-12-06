import Checkbox from "./Checkbox";
import TaskService from "../services/TaskService";
import { Editable } from "./Editable";
import IconGroup from "./IconGroup";
import pubsub from "../pubsub/PubSub";

import locationIcon from "../assets/icons8-location-16.png";
import deleteIcon from "../assets/icons8-trash-30.png";

import { format, parse } from "date-fns";

const TaskItem = (task) => {
  let element;
  let checkbox;
  let taskDetails;
  let title;
  let dueDate;
  let location;
  let priority;
  let description;
  let selected;

  const init = () => {
    element = createElement();
    pubsub.subscribe("taskSelected", handleNewTaskSelect);
    pubsub.subscribe("taskUpdated", handleNewTaskUpdate);
    pubsub.subscribe("deleteTask", () => {
      if (selected) {
        TaskService.deleteById(task.id);
        element.remove();
      }
    });
    render();
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.className = "task";

    checkbox = createCheckbox();
    title = createTitle();

    dueDate = createDueDate();

    const titleRow = document.createElement("div");
    titleRow.classList.add("flex-row-space-between");
    titleRow.appendChild(title.getElement());
    titleRow.appendChild(dueDate);

    location = createLocation();
    const locationGroup = IconGroup(locationIcon, location.getElement());

    priority = createPriority();

    const detailRow = document.createElement("div");
    detailRow.classList.add("flex-row-space-between");
    detailRow.appendChild(locationGroup.getElement());
    detailRow.appendChild(priority);

    description = createDescription();

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
      if (confirm("Are you sure you want to delete this task?")) {
        pubsub.publish("deleteTask");
        pubsub.publish("numberOfTasksChanged");
      }
    });

    const hiddenRow = document.createElement("div");
    hiddenRow.classList.add("hidden");
    hiddenRow.classList.add("flex-row-space-between");
    hiddenRow.appendChild(description.getElement());
    hiddenRow.appendChild(deleteButton);

    taskDetails = document.createElement("div");
    taskDetails.className = "task-details";
    taskDetails.appendChild(titleRow);
    taskDetails.appendChild(detailRow);
    taskDetails.appendChild(hiddenRow);

    container.appendChild(checkbox.getElement());
    container.appendChild(taskDetails);
    container.addEventListener("click", (e) => {
      pubsub.publish("taskSelected", task);
    });
    return container;
  };

  const createCheckbox = () => {
    const checkbox = Checkbox(handleCheckboxClick);
    return checkbox;
  };

  const createTitle = () => {
    const title = Editable("title", "No title", handleEditableUpdate);
    title.getElement().classList.add("title");
    return title;
  };

  const createDueDate = () => {
    const dueDate = document.createElement("input");
    dueDate.type = "date";
    dueDate.addEventListener("change", () => {
      const newDate = parse(dueDate.value, "yyyy-MM-dd", new Date());
      TaskService.update({ ...task, dueDate: newDate });
    });
    return dueDate;
  };

  const createLocation = () => {
    const location = Editable("location", "No location", handleEditableUpdate);
    task?.location && location.setText(task.location);
    return location;
  };

  const createPriority = () => {
    const select = document.createElement("select");
    const options = [
      { value: "low", textContent: "Low" },
      { value: "medium", textContent: "Medium" },
      { value: "high", textContent: "High" },
    ];
    options.forEach((optionData) => {
      const option = document.createElement("option");
      option.value = optionData.value;
      option.textContent = optionData.textContent;
      select.appendChild(option);
    });
    select.addEventListener("change", () => {
      TaskService.update({ ...task, priority: select.value });
    });
    if (task && task.priority) {
      select.value = task.priority;
    }
    select.classList.add("priority");
    return select;
  };

  const createDescription = () => {
    const description = Editable(
      "description",
      "+ Add description",
      handleEditableUpdate
    );
    task?.description && description.setText(task.description);
    return description;
  };

  const handleCheckboxClick = () => {
    const newTask = { ...task, isCompleted: !task.isCompleted };
    TaskService.update(newTask);
    pubsub.publish("taskUpdated", newTask);
  };

  const handleEditableUpdate = (e) => {
    const dataValue = e.target.dataValue;
    const newContent = e.target.textContent;

    const newTask = { ...task, [dataValue]: newContent };
    TaskService.update(newTask);
    pubsub.publish("taskUpdated", newTask);
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

  const handleNewTaskSelect = (selectedTask) => {
    if (selectedTask === task) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  const handleNewTaskUpdate = (newTask) => {
    if (newTask.id !== task.id) {
      return;
    }
    task = newTask;
    render();
  };

  const render = () => {
    checkbox.setChecked(task.isCompleted);
    title.setText(task.title);
    if (task.dueDate) {
      dueDate.value = format(task.dueDate, "yyyy-MM-dd");
    }
    description.setText(task.description);
  };

  init();

  return {
    getElement: () => element,
  };
};

export default TaskItem;
