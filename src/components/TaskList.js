import TaskItem from "./NewTaskItem";

class TaskList {
  constructor(tasks) {
    this.tasks = tasks;
    this.taskItems = tasks.map((t) => TaskItem(t));
    this.element = this.createElement();
  }

  createElement() {
    const container = document.createElement("div");
    container.classList.add("task-list");

    this.taskItems.forEach((taskItem) =>
      container.appendChild(taskItem.getElement())
    );
    return container;
  }

  update(tasks) {
    this.tasks = tasks;

    this.tasks.forEach((task) => {
      const existingTaskElement = this.element.querySelector(
        `[data-task-id="${task.id}"]`
      );
      if (!existingTaskElement) {
        const taskItem = TaskItem(task, this.handleTaskItemSelect);
        this.element.appendChild(taskItem.getElement());
      } else {
        existingTaskElement.textContent = task.name;
      }
    });
    this.render();
  }

  render() {
    this.element.innerHTML = "";
    this.element.append(...this.createElement().childNodes);
  }
}

export { TaskList };
