import Checkbox from "./Checkbox";
import TaskService from "../services/TaskService";
import { Editable } from "./Editable";
import IconGroup from "./IconGroup";
import { DateUtil } from "../util/DateUtil";
import pubsub from "../pubsub/PubSub";

import locationIcon from "../assets/icons8-location-16.png";
import calendarIcon from "../assets/icons8-calendar-16.png";
import priorityIcon from "../assets/icons8-priority-16.png";
import noteIcon from "../assets/icons8-note-16.png";

const TaskItem = (task) => {
  let element;
  let checkbox;
  let taskDetails;
  let title;
  let dueDate;
  let location;
  let priority;
  let description;

  const init = () => {
    element = createElement();
    pubsub.subscribe("taskSelected", handleNewTaskSelect);
    pubsub.subscribe("taskUpdated", handleNewTaskUpdate);
    render();
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.className = "task";

    checkbox = createCheckbox();
    title = createTitle();

    dueDate = createDueDate();
    const dueDateGroup = IconGroup(calendarIcon, dueDate.getElement());

    const titleRow = document.createElement("div");
    titleRow.classList.add("flex-row-space-between");
    titleRow.appendChild(title.getElement());
    titleRow.appendChild(dueDateGroup.getElement());

    location = createLocation();
    const locationGroup = IconGroup(locationIcon, location.getElement());

    priority = createPriority();

    const detailRow = document.createElement("div");
    detailRow.classList.add("flex-row-space-between");
    detailRow.appendChild(locationGroup.getElement());
    detailRow.appendChild(priority);

    description = createDescription();
    console.log(noteIcon);
    const descriptionGroup = IconGroup(noteIcon, description.getElement());

    const hiddenRow = document.createElement("div");
    hiddenRow.classList.add("hidden");
    hiddenRow.appendChild(descriptionGroup.getElement());

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
    const dueDate = Editable("dueDate", "No due date", handleEditableUpdate);
    dueDate.getElement().classList.add("due-date");
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
      "Add description",
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
    console.log(TaskService.findAll());
  };

  const setSelected = (isSelected) => {
    isSelected
      ? element.classList.add("selected")
      : element.classList.remove("selected");
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
    dueDate.setText(DateUtil.formatShort(task.dueDate));
    description.setText(task.description);
  };

  init();

  return {
    getElement: () => element,
  };
};

export default TaskItem;
