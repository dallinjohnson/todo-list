import { TaskList } from "./TaskList";
import { TaskListControls } from "./TaskListControls";
import { sortByDate } from "../util/SortUtil";
import { TaskCard } from "./TaskCard";

class App {
  constructor(data) {
    this.tasks = data;

    this.taskList = new TaskList(this.tasks);
    this.taskListControls = new TaskListControls(
      this.handleSortSelection.bind(this)
    );

    this.render();
  }

  render() {
    const headerContainer = document.querySelector("#header");
    const taskListContainer = document.querySelector("#task-list-container");
    headerContainer.append(this.taskListControls.element);
    taskListContainer.append(this.taskList.element);
  }

  handleTaskUpdate(e, task) {
    const dataValue = e.target.dataValue;
    const newTask = { ...task, [dataValue]: e.target.textContent };
    this.updateTask(task, newTask);
    // handle the thing
  }

  handleCheckbox(e, task) {
    const newTask = { ...task, isCompleted: !task.isCompleted };
    this.updateTask(task, newTask);
  }

  updateTask(oldTask, newTask) {
    const index = this.tasks.indexOf(oldTask);
    this.tasks[index] = newTask;
    this.taskList.update(this.tasks);
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

  sortTasksByDate() {
    this.tasks.sort((a, b) => {
      const dateA = a.dueDate;
      const dateB = b.dueDate;
      return sortByDate(dateA, dateB);
    });
  }
}

export { App };
