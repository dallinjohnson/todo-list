import TaskItem from "./NewTaskItem";

class TaskList {
  constructor(tasks) {
    this.tasks = tasks;
    this.element = this.createElement();
    this.selectedTaskId = 0;
    this.handleTaskItemSelect = this.handleTaskItemSelect.bind(this);
  }

  createElement() {
    const container = document.createElement("div");
    container.classList.add("task-list");
    this.tasks.map((t) => {
      const taskItem = TaskItem(t, (e) => this.handleTaskItemSelect(e, t));
      container.appendChild(taskItem.getElement());
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
    const selectedTaskItem = Array.from(this.element.childNodes).find(
      (item) => item.dataset.taskId == this.selectedTaskId
    );
    if (selectedTaskItem) {
      selectedTaskItem.classList.add("selected");
    }
  }

  handleTaskItemSelect(e, task) {
    const allTaskItems = document.querySelectorAll(".task");
    allTaskItems.forEach((taskItem) => {
      taskItem.classList.remove("selected");
    });
    const selectedTaskItem = e.target.closest(".task");
    console.log(selectedTaskItem);
    selectedTaskItem.classList.add("selected");

    console.log(this.selectedTaskId);
    this.selectedTaskId = task.id;
  }
}

export { TaskList };
