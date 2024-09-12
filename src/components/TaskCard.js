import calendarIcon from "../assets/icons8-calendar-16.png";
import { DateUtil } from "../util/DateUtil";
import { Editable } from "./Editable";

class TaskCard {
  constructor(task, handleUpdateTaskInfo, handleCheckbox) {
    this.task = task;

    this.handleUpdateTaskInfo = handleUpdateTaskInfo;
    this.handleCheckbox = handleCheckbox;
    this.handleEditableUpdate = this.handleEditableUpdate.bind(this);

    this.checkBox = document.createElement("div");
    this.element = this.createElement();
  }

  createElement() {
    const container = document.createElement("div");
    container.className = "task-card";

    if (!this.task) {
      container.append("No task selected");
      return container;
    }

    const title = new Editable(
      "h2",
      "title",
      this.task ? this.task.title : "No task selected",
      "New Task",
      this.handleEditableUpdate
    );
    title.element.addEventListener("keydown", this.handleKeyDown);

    const checkBox = document.createElement("div");
    checkBox.className = "checkbox";
    if (!this.task.isCompleted) {
      checkBox.classList.add("unchecked");
    }
    checkBox.addEventListener("click", (e) => {
      this.handleCheckbox(e, this.task);
    });

    const headerRow = document.createElement("div");
    headerRow.className = "flex-row-space-between";
    headerRow.append(title.element, checkBox);

    const dueDateContainer = document.createElement("div");
    const dueDateImg = document.createElement("img");
    dueDateImg.className = "icon";
    dueDateImg.src = calendarIcon;
    if (!this.task.dueDate) {
      dueDateContainer.append(dueDateImg);
    }
    const dateString = DateUtil.formatLong(this.task.dueDate);
    dueDateContainer.append(dueDateImg, dateString);

    const location = new Editable(
      "p",
      "location",
      this.task.location,
      "+ Add Location",
      this.handleEditableUpdate
    );

    const description = new Editable(
      "p",
      "description",
      this.task.description,
      "+ Add Description",
      this.handleEditableUpdate
    );

    container.append(
      headerRow,
      dueDateContainer,
      location.element,
      description.element
    );

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

  handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  }

  handleEditableUpdate(e) {
    this.handleUpdateTaskInfo(e, this.task);
  }
}

export { TaskCard };
