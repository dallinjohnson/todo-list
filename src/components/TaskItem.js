import locationIcon from "../assets/icons8-location-16.png";
import calendarIcon from "../assets/icons8-calendar-16.png";
import priorityIcon from "../assets/icons8-priority-16.png";
import noteIcon from "../assets/icons8-note-16.png";
import { DateUtil } from "../util/DateUtil";
import { Editable } from "./Editable";
import TaskService from "../services/TaskService";
import Checkbox from "./Checkbox.js";

export class TaskItem {
  constructor(task, handleSelect) {
    this.task = task;
    this.handleSelect = handleSelect;
    this.handleUpdate = this.handleUpdate.bind(this);
    this.element = this.createElement();
    if (this.task) {
      this.element.dataset.taskId = task.id;
    }
  }

  createElement() {
    const title = Editable("title", "No title", this.handleUpdate);
    title.getElement().classList.add("title");
    if (this.task) {
      title.setText(this.task.title);
    }

    const dueDate = document.createElement("span");
    const dueDateText = Editable("dueDate", "No due date", this.handleUpdate);
    if (this.task) {
      dueDateText.setText(DateUtil.formatShort(this.task.dueDate));
    }
    dueDate.className = "icon-group";
    const dueDateImg = document.createElement("img");
    dueDateImg.className = "icon";
    dueDateImg.src = calendarIcon;
    dueDate.append(dueDateImg, dueDateText.getElement());

    const previewRow = document.createElement("div");
    previewRow.classList.add("flex-row-space-between");
    previewRow.append(title.getElement(), dueDate);

    const location = document.createElement("span");
    const locationText = Editable("location", "No location", this.handleUpdate);
    location.className = "icon-group";
    location.classList.add("task-location");
    const locationImg = document.createElement("img");
    locationImg.className = "icon";
    locationImg.src = locationIcon;
    location.append(locationImg, locationText.getElement());

    const priority = document.createElement("span");
    const priorityImg = document.createElement("img");
    priorityImg.src = priorityIcon;
    priorityImg.className = "icon";
    priority.append(this.task ? this.task.priority : "No", " Priority");

    const detailRow = document.createElement("div");
    detailRow.classList.add("flex-row-space-between");
    detailRow.append(location, priority);

    // const description = document.createElement("span");
    // const descriptionImg = document.createElement("img");
    // descriptionImg.src = noteIcon;
    // descriptionImg.className = "icon";
    // if (this.task.description) {
    //   description.append(descriptionImg);
    // }
    // description.append(this.task.description);

    let checkbox;
    const handleCheckbox = () => {
      const newTask = { ...this.task, isCompleted: !this.task.isCompleted };
      TaskService.update(newTask);
      checkbox.setChecked(newTask.isCompleted);
    };
    checkbox = Checkbox(handleCheckbox);
    if (this.task) {
      checkbox.setChecked(this.task.isCompleted);
    }

    const taskDetails = document.createElement("div");
    taskDetails.className = "task-details";
    taskDetails.append(previewRow, detailRow);

    const task = document.createElement("div");
    task.className = "task";
    task.addEventListener("click", (e) => {
      this.handleSelect(e, this.task);
    });
    task.append(checkbox.getElement(), taskDetails);

    return task;
  }

  handleUpdate(e) {
    const dataValue = e.target.dataValue;
    const newContent = e.target.textContent;

    const newTask = { ...this.task, [dataValue]: newContent };

    TaskService.update(newTask);
  }

  update(task) {
    this.task = task;
    this.render();
  }

  render() {
    this.element.innerHTML = "";
    this.element.append(...this.createElement().childNodes);
  }
}
