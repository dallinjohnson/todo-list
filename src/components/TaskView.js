import { TaskList } from "./TaskList";
import { TaskListControls } from "./TaskListControls";

const TaskView = () => {
  let element;
  let taskList;
  let taskListControls;

  const init = () => {
    taskList = TaskList();
    taskListControls = new TaskListControls();
    element = createElement();
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.id = "task-view";
    container.appendChild(taskListControls.getElement());
    container.appendChild(taskList.getElement());
  };

  return {
    getElement: () => element,
  };
};
