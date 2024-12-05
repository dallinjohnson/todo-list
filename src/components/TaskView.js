import { TaskList } from "./TaskList";
import { TaskListControls } from "./TaskListControls";

const TaskView = () => {
  let element;
  let taskList;
  let taskListCompleted;
  let taskListControls;

  const init = () => {
    taskList = TaskList();
    taskListCompleted = TaskList(false);
    taskListControls = new TaskListControls();
    element = createElement();
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.id = "task-view";
    container.appendChild(taskListControls.element);
    container.appendChild(taskList.getElement());
    container.appendChild(taskListCompleted.getElement());
    return container;
  };

  init();

  return {
    getElement: () => element,
  };
};

export default TaskView;
