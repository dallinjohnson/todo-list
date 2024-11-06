import { TaskList } from "./TaskList";
import { TaskListControls } from "./TaskListControls";
import { sortByDate } from "../util/SortUtil";
import { Task } from "../classes/Task";
import TaskService from "../services/TaskService";
import TaskItem from "./NewTaskItem";
import pubsub from "../pubsub/PubSub";

class App {
  constructor() {
    this.taskList = new TaskList(TaskService.findAll());
    this.taskListControls = new TaskListControls(
      this.handleSortSelection.bind(this),
      this.handleNewTaskClick.bind(this)
    );

    this.render();
  }

  render() {
    const headerContainer = document.querySelector("#header");
    const taskListContainer = document.querySelector("#task-list-container");
    headerContainer.append(this.taskListControls.element);
    taskListContainer.append(this.taskList.element);
  }

  handleSortSelection(e) {
    const value = e.target.value;
    if (value === "name") {
      this.sortTasksByName();
    } else if (value === "date") {
      this.sortTasksByDate();
    }

    this.taskList.update(this.tasks);
  }

  sortTasksByName() {
    this.tasks.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
  }

  handleNewTaskClick() {
    const newTask = TaskService.insert(new Task());
    const taskItem = TaskItem(newTask);
    this.taskList.element.appendChild(taskItem.getElement());
    pubsub.publish("taskSelected", newTask);
  }

  sortTasksByDate() {
    this.tasks.sort((a, b) => {
      const dateA = a.dueDate;
      const dateB = b.dueDate;
      return sortByDate(dateA, dateB);
    });
  }
}

export { App };
