import { TaskList } from "./TaskList";
import ViewHeader from "./ViewHeader";
import ListHeader from "./ListHeader";
import pubsub from "../pubsub/PubSub";
import SortDropdown from "./SortDropdown";
import SortingCriteria from "../enums/SortingCriteria";

const TaskView = () => {
  let element;
  let sortDropdown;

  const init = () => {
    element = createElement();
    pubsub.publish("sortTasks", sortDropdown.getValue());
  };

  const createElement = () => {
    const viewHeader = createViewHeader();
    const inProgressTaskList = createInProgressTaskList();
    const completedTaskList = createCompletedTaskList();

    const container = document.createElement("div");
    container.classList.add("flex-column-10px-gap");
    container.appendChild(viewHeader.getElement());
    container.appendChild(inProgressTaskList.getElement());
    container.appendChild(completedTaskList.getElement());
    return container;
  };

  const createViewHeader = () => {
    sortDropdown = createSortDropdown();
    const viewHeader = ViewHeader("Tasks", sortDropdown.getElement());
    return viewHeader;
  };

  const createSortDropdown = () => {
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
    return sortDropdown;
  };

  const createInProgressTaskList = () => {
    const inProgressTaskListHeader = ListHeader(
      "In Progress",
      "+ New Task",
      () => pubsub.publish("addNewTask")
    );
    const inProgressTaskList = TaskList(inProgressTaskListHeader.getElement());
    return inProgressTaskList;
  };

  const createCompletedTaskList = () => {
    const completedTaskListHeader = ListHeader("Completed");
    const completedTaskList = TaskList(
      completedTaskListHeader.getElement(),
      false
    );
    return completedTaskList;
  };

  init();

  return {
    getElement: () => element,
  };
};

export default TaskView;
