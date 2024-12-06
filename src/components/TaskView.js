import { TaskList } from "./TaskList";
import ViewHeader from "./ViewHeader";
import ListHeader from "./ListHeader";
import pubsub from "../pubsub/PubSub";

const TaskView = () => {
  let element;
  let inProgressTaskList;
  let completedTaskList;
  let viewHeader;

  const init = () => {
    const inProgressTaskListHeader = ListHeader(
      "In Progress",
      "+ New Task",
      () => pubsub.publish("addNewTask")
    );
    inProgressTaskList = TaskList(inProgressTaskListHeader.getElement());

    const completedTaskListHeader = ListHeader("Completed");
    completedTaskList = TaskList(completedTaskListHeader.getElement(), false);

    viewHeader = new ViewHeader();
    element = createElement();
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.id = "task-view";
    container.appendChild(viewHeader.element);
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
