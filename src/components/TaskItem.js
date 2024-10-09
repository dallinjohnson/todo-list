import locationIcon from "../assets/icons8-location-16.png";
import calendarIcon from "../assets/icons8-calendar-16.png";
import priorityIcon from "../assets/icons8-priority-16.png";
import noteIcon from "../assets/icons8-note-16.png";
import { DateUtil } from "../util/DateUtil";
import { Editable } from "./Editable";

export class TaskItem {
  constructor(task, handleSelect) {
    this.task = task;
    this.handleSelect = handleSelect;
    this.element = this.createElement();
    if (this.task) {
      this.element.dataset.taskId = task.id;
    }
  }

  createElement() {
    const title = Editable(
      "span",
      "title",
      this.task ? this.task.title : null,
      "No title",
      null
    );
    title.getElement().classList.add("title");

    const dueDate = document.createElement("span");
    const dueDateText = Editable(
      "span",
      "dueDate",
      this.task ? DateUtil.formatShort(this.task.dueDate) : null,
      "No due date",
      null
    );
    dueDate.className = "icon-group";
    const dueDateImg = document.createElement("img");
    dueDateImg.className = "icon";
    dueDateImg.src = calendarIcon;
    dueDate.append(dueDateImg, dueDateText.getElement());

    const previewRow = document.createElement("div");
    previewRow.classList.add("flex-row-space-between");
    previewRow.append(title.getElement(), dueDate);

    const location = document.createElement("span");
    const locationText = Editable(
      "span",
      "location",
      this.task ? this.task.location : null,
      "No location",
      null
    );
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

    const checkbox = document.createElement("div");
    checkbox.className = "checkbox";
    if (this.task && this.task.isCompleted) {
      checkbox.classList.add("checked");
    }

    const taskDetails = document.createElement("div");
    taskDetails.className = "task-details";
    taskDetails.append(previewRow, detailRow);

    const task = document.createElement("div");
    task.className = "task";
    task.addEventListener("click", (e) => {
      this.handleSelect(e, this.task);
    });
    task.append(checkbox, taskDetails);

    return task;
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
