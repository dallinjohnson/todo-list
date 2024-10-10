import Checkbox from "./Checkbox";
import TaskService from "../services/TaskService";
import { Editable } from "./Editable";
import IconGroup from "./IconGroup";
import { DateUtil } from "../util/DateUtil";

import locationIcon from "../assets/icons8-location-16.png";
import calendarIcon from "../assets/icons8-calendar-16.png";
import priorityIcon from "../assets/icons8-priority-16.png";
import noteIcon from "../assets/icons8-note-16.png";

const TaskItem = (task, handleSelect) => {
  let element;
  let checkbox;
  let taskDetails;
  let title;
  let dueDate;
  let location;
  let priority;

  const init = () => {
    element = createElement();
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

    const detailRow = document.createElement("div");
    detailRow.classList.add("flex-row-space-between");
    detailRow.appendChild(locationGroup.getElement());

    taskDetails = document.createElement("div");
    taskDetails.className = "task-details";
    taskDetails.appendChild(titleRow);
    taskDetails.appendChild(detailRow);
    taskDetails.classList.add("disabled");

    container.appendChild(checkbox.getElement());
    container.appendChild(taskDetails);
    container.addEventListener("click", (e) => {
      handleSelect(e, task);
    });
    return container;
  };

  const createCheckbox = () => {
    const checkbox = Checkbox(handleCheckboxClick);
    task?.isCompleted && checkbox.setChecked(task.isCompleted);
    return checkbox;
  };

  const createTitle = () => {
    const title = Editable("title", "No title", handleEditableUpdate);
    title.getElement().classList.add("title");
    task?.title && title.setText(task.title);
    return title;
  };

  const createDueDate = () => {
    const dueDate = Editable("dueDate", "No due date", handleEditableUpdate);
    task?.dueDate && dueDate.setText(DateUtil.formatShort(task.dueDate));
    return dueDate;
  };

  const createLocation = () => {
    const location = Editable("location", "No location", handleEditableUpdate);
    task?.location && location.setText(task.location);
    return location;
  };

  const createPriority = () => {};

  const handleCheckboxClick = () => {
    const newTask = { ...task, isCompleted: !task.isCompleted };
    TaskService.update(newTask);
    checkbox.setChecked(newTask.isCompleted);
  };

  const handleEditableUpdate = (e) => {
    const dataValue = e.target.dataValue;
    const newContent = e.target.textContent;

    const newTask = { ...task, [dataValue]: newContent };
    TaskService.update(newTask);
  };

  init();

  return { getElement: () => element };
};

export default TaskItem;
