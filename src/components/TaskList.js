import { TaskItem } from "./TaskItem";

class TaskList {
  constructor(tasks) {
    this.tasks = tasks;
    this.element = this.createElement();
    this.selectedTaskId = 0;
    this.handleTaskListSelect = this.handleTaskListSelect.bind(this);
  }

  createElement() {
    const container = document.createElement("div");
    container.classList.add("task-list");
    this.tasks.map((t) => {
      const taskItem = new TaskItem(t, this.handleTaskListSelect);
      container.appendChild(taskItem.element);
    });
    return container;
  }

  update(tasks) {
    this.tasks = tasks;

    this.tasks.forEach((task) => {
      const existingTaskElement = this.element.querySelector(
        `[data-task-id="${task.id}"]`
      );
      if (!existingTaskElement) {
        const taskItem = new TaskItem(task, this.handleTaskListSelect);
        this.element.appendChild(taskItem.element);
      } else {
        existingTaskElement.textContent = "task.name";
      }
    });
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

  handleTaskListSelect(e, task) {
    const allTaskItems = document.querySelectorAll(".task");
    allTaskItems.forEach((taskItem) => {
      taskItem.classList.remove("selected");
    });

    const selectedTaskItem = e.target.closest(".task");
    selectedTaskItem.classList.add("selected");

    this.selectedTaskId = task.id;
  }
}

export { TaskList };
