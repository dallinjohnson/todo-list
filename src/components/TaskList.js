import { TaskItem } from "./TaskItem";

class TaskList {
  constructor(tasks, handleSelect) {
    this.tasks = tasks;
    this.handleSelect = handleSelect;
    this.element = this.createElement();
    this.selectedTaskId = null;
  }

  createElement() {
    const container = document.createElement("div");
    container.classList.add("task-list");
    this.tasks.map((t) => {
      const taskItem = new TaskItem(t, this.handleSelect);
      container.appendChild(taskItem.element);
    });
    return container;
  }

  update(tasks) {
    this.tasks = tasks;
    this.render();
  }

  render() {
    this.element.innerHTML = "";
    this.element.append(...this.createElement().childNodes);
    const selectedTaskItem = Array.from(this.element.childNodes).find(
      (item) => item.dataset.taskId == this.selectedTaskId
    );
    if (selectedTaskItem) {
      selectedTaskItem.classList.add("selected");
    }
  }

  setSelected(taskId) {
    this.selectedTaskId = taskId;
    this.render();
  }
}

export { TaskList };
