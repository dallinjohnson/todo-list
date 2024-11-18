import { TaskList, TL } from "./TaskList";
import { TaskListControls } from "./TaskListControls";
import { sortByDate } from "../util/SortUtil";
import { Task } from "../classes/Task";
import TaskService from "../services/TaskService";
import TaskItem from "./TaskItem";
import pubsub from "../pubsub/PubSub";

class App {
  constructor() {
    this.taskList = TaskList();
    this.taskListControls = new TaskListControls(
      this.handleNewTaskClick.bind(this)
    );

    this.render();
  }

  render() {
    const headerContainer = document.querySelector("#header");
    const taskListContainer = document.querySelector("#task-list-container");
    headerContainer.append(this.taskListControls.element);
    taskListContainer.append(this.taskList.getElement());
  }

  handleNewTaskClick() {
    const newTask = TaskService.insert(new Task());
    const taskItem = TaskItem(newTask);
    this.taskList.getElement().appendChild(taskItem.getElement());
    pubsub.publish("taskSelected", newTask);
  }
}

export { App };
