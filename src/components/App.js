import { TaskList } from "./TaskList";
import { TaskListControls } from "./TaskListControls";
import { sortByDate } from "../util/SortUtil";
import { TaskCard } from "./TaskCard";

class App {
  constructor(data) {
    this.tasks = data;

    this.taskList = new TaskList(
      this.tasks,
      this.handleTaskListSelect.bind(this)
    );
    this.taskListControls = new TaskListControls(
      this.handleSortSelection.bind(this)
    );
    this.taskCard = TaskCard(
      null,
      this.handleTaskUpdate.bind(this),
      this.handleCheckbox.bind(this)
    );

    this.render();

    if (this.tasks.length > 0) {
      // this.taskCard.update(this.tasks[0]);
      this.taskList.setSelected(this.taskList.element.childNodes[0]);
    }
  }

  render() {
    const taskListContainer = document.querySelector("#task-list-container");
    taskListContainer.append(this.taskListControls.element);
    taskListContainer.append(this.taskList.element);

    const taskCardContainer = document.querySelector("#task-card-container");
    taskCardContainer.append(this.taskCard.getElement());
  }

  handleTaskListSelect(e, task) {
    this.taskCard.update(task);
    this.taskList.setSelected(task.id);
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
    this.taskCard.update(newTask);
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
