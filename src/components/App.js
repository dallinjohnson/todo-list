import { TaskList } from "./TaskList";
import { TaskListControls } from "./TaskListControls";
import { sortByDate } from "../util/SortUtil";
import { Task } from "../classes/Task";
import TaskService from "../services/TaskService";
import TaskItem from "./NewTaskItem";
import pubsub from "../pubsub/PubSub";

class App {
  constructor() {
    this.tasks = [
      new Task(1, "Walk the dog", null, "high", "Duck Pond", null),
      new Task(
        2,
        "Wash car",
        new Date(2024, 8, 11),
        "low",
        null,
        "Remember to vacuum"
      ),
      new Task(
        3,
        "Trail run",
        new Date(2024, 8, 15),
        "low",
        "Jordan River Trail",
        null
      ),
    ];

    TaskService.setTasks(this.tasks);

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
