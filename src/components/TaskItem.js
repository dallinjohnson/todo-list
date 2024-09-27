import locationIcon from "../assets/icons8-location-16.png";
import calendarIcon from "../assets/icons8-calendar-16.png";
import priorityIcon from "../assets/icons8-priority-16.png";
import noteIcon from "../assets/icons8-note-16.png";
import { DateUtil } from "../util/DateUtil";

export class TaskItem {
  constructor(task, handleSelect) {
    this.task = task;
    this.handleSelect = handleSelect;
    this.element = this.createElement();
    this.element.dataset.taskId = task.id;
  }

  createElement() {
    const title = document.createElement("span");
    title.textContent = this.task.title;
    title.classList.add("title");

    const dueDate = document.createElement("span");
    dueDate.className = "icon-group";
    const dueDateImg = document.createElement("img");
    dueDateImg.className = "icon";
    dueDateImg.src = calendarIcon;
    const dateString = DateUtil.formatShort(this.task.dueDate);
    dueDate.append(dueDateImg, dateString);

    const previewRow = document.createElement("div");
    previewRow.classList.add("flex-row-space-between");
    previewRow.append(title, dueDate);

    const location = document.createElement("span");
    location.className = "icon-group";
    location.classList.add("task-location");
    const locationImg = document.createElement("img");
    locationImg.className = "icon";
    locationImg.src = locationIcon;
    location.append(locationImg);
    if (!this.task.location) {
      location.append("No Location");
    } else {
      location.append(this.task.location);
    }

    const priority = document.createElement("span");
    const priorityImg = document.createElement("img");
    priorityImg.src = priorityIcon;
    priorityImg.className = "icon";
    priority.append(this.task.priority, " Priority");

    const detailRow = document.createElement("div");
    detailRow.classList.add("flex-row-space-between");
    detailRow.append(location, priority);

    const description = document.createElement("span");
    const descriptionImg = document.createElement("img");
    descriptionImg.src = noteIcon;
    descriptionImg.className = "icon";
    if (this.task.description) {
      description.append(descriptionImg);
    }
    description.append(this.task.description);

    const container = document.createElement("div");
    container.className = "task";
    container.append(previewRow, detailRow);

    container.addEventListener("click", (e) => {
      this.handleSelect(e, this.task);
    });

    return container;
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
