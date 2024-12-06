import { TaskList } from "./TaskList";
import { TaskListControls } from "./TaskListControls";
import ListHeader from "./ListHeader";
import pubsub from "../pubsub/PubSub";

const TaskView = () => {
  let element;
  let inProgressTaskList;
  let completedTaskList;
  let taskListControls;

  const init = () => {
    const inProgressTaskListHeader = ListHeader(
      "In Progress",
      "+ New Task",
      () => pubsub.publish("addNewTask")
    );
    inProgressTaskList = TaskList(inProgressTaskListHeader.getElement());

    const completedTaskListHeader = ListHeader("Completed");
    completedTaskList = TaskList(completedTaskListHeader.getElement(), false);

    taskListControls = new TaskListControls();
    element = createElement();
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.id = "task-view";
    container.appendChild(taskListControls.element);
    container.appendChild(inProgressTaskList.getElement());
    container.appendChild(completedTaskList.getElement());
    return container;
  };

  init();

  return {
    getElement: () => element,
  };
};

export default TaskView;
