import { TaskList } from "./TaskList";
import ViewHeader from "./ViewHeader";
import ListHeader from "./ListHeader";
import pubsub from "../pubsub/PubSub";
import SortDropdown from "./SortDropdown";
import SortingCriteria from "../enums/SortingCriteria";

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

    const sortDropdownOptions = [
      {
        value: SortingCriteria.DATE,
        textContent: "Date",
        selected: true,
      },
      {
        value: SortingCriteria.TITLE,
        textContent: "Title",
        selected: false,
      },
    ];
    const sortDropdown = SortDropdown(
      sortDropdownOptions,
      "task-sort-select",
      "sortTasks"
    );
    viewHeader = ViewHeader("Tasks", sortDropdown.getElement());
    element = createElement();
    pubsub.publish("sortTasks", sortDropdown.getValue());
  };

  const createElement = () => {
    const container = document.createElement("div");
    container.id = "task-view";
    container.appendChild(viewHeader.getElement());
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
