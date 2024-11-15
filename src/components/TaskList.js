import TaskItem from "./TaskItem";
import TaskService from "../services/TaskService";
import pubsub from "../pubsub/PubSub";
import { sortByTitle } from "../util/SortUtil";
import { sortByDate } from "../util/SortUtil";

class TaskList {
  constructor() {
    this.tasks = TaskService.findAll();
    this.element = this.createElement();
    pubsub.subscribe("sortTasks", (sortingCriteria) =>
      this.handleSortTasks(sortingCriteria)
    );
  }

  createElement() {
    const container = document.createElement("div");
    container.classList.add("task-list");

    const taskItems = this.tasks.map((t) => TaskItem(t));
    taskItems.forEach((taskItem) =>
      container.appendChild(taskItem.getElement())
    );
    return container;
  }

  handleSortTasks(sortingCriteria) {
    this.tasks = TaskService.findAll();
    if (sortingCriteria === "title") {
      this.tasks.sort((a, b) => sortByTitle(a.title, b.title));
    } else if (sortingCriteria === "date") {
      this.tasks.sort((a, b) => sortByDate(a.dueDate, b.dueDate));
    }
    this.render();
  }

  render() {
    this.element.innerHTML = "";
    this.element.append(...this.createElement().childNodes);
  }
}

export { TaskList };
